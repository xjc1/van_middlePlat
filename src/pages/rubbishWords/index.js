import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { TButton, OperateBar, DataImport } from '@/components/tis_ui';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { message, Dropdown, Menu } from 'antd';
import { rubbishImportlUrl, rubbishTemplateUrl } from '@/constants';
import DictAssistant from '@/utils/DictAssistant';
import router from '@/utils/tRouter';
import authEnum, { authCheck, Auth } from '@/utils/auth';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { BANNEDWORD } from '@/services/api';
import commonDownload from '@/services/commonDownload';

import CreateModal from './components/createModal';
import EditModal from './components/editModal';
import RubbishWordsQueryBar from './RubbishWordsQueryBar';
import RubbishWordsList from './RubbishWordsList';
import styles from './rubbishWords.less';

@connect(({ rubbishWords }) => rubbishWords)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    currentRecord: null,
    editAble: false,
    createModalVisible: false,
    typeList: [],
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '词条名',
      dataIndex: 'word',
    },
    {
      title: '词条类型',
      dataIndex: 'typeCode',
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `BWT1000.${text}`);
        return val;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: text => {
        return text ? moment(text).format('YYYY-MM-DD') : '';
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      align: 'center',
      render: (text, record) => {
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  disabled={!authCheck(authEnum.rubbishWords_edit_alias, true, false)}
                  icon={<EditOutlined />}
                  onClick={() => this.onEdit(record.id)}
                >
                  编辑
                </OperateBar.Button>

                <OperateBar.Button
                  danger
                  disabled={!authCheck(authEnum.rubbishWords_delete, true, false)}
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={() => this.onDelete(record.id)}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button icon={<FileSearchOutlined />} onClick={() => this.onView(record.id)}>
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchRubbishWords({});
    DictAssistant.fetchChildrenDictWithMemo('BWT1000').then(data => {
      this.setState({ typeList: data });
    });
  }

  fetchRubbishWordsWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rubbishWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchRubbishWords = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'rubbishWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onEdit = id => {
    BANNEDWORD.getBannedWordUsingGET(id).then(data => {
      this.setState({ currentRecord: data, editAble: true });
    });
  };

  onView = id => {
    BANNEDWORD.getBannedWordUsingGET(id).then(data => {
      this.setState({ currentRecord: data, editAble: false });
    });
  };

  onDelete = id => {
    BANNEDWORD.deleteBannedWordUsingPOST(id).then(() => {
      message.success('操作成功');
      this.fetchRubbishWords({});
    });
  };

  onDownLoad = async () => {
    message.loading('下载中');
    await commonDownload({ url: rubbishTemplateUrl, name: '词条导入模板.xlsx' });
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      BANNEDWORD.asyncExportBannedWordUsingPOST({
        body: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const { typeList } = this.state;
    return (
      <div>
        <RubbishWordsQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.rubbishWords_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    this.setState({ createModalVisible: true });
                  }}
                >
                  新增垃圾词
                </TButton.Create>
              </Auth>
              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.bannedWord}
                btnText="导出词条库"
                placement="bottom"
              />
              <TButton.Download onClick={this.onDownLoad}>模板下载</TButton.Download>

              <DataImport
                btnText="Excel导入"
                action={rubbishImportlUrl}
                refresh={this.fetchRubbishWords}
              />

              <Dropdown
                overlay={
                  <Menu>
                    {typeList.map(({ code, name }) => (
                      <Menu.Item key={code}>
                        <TButton.Button
                          type="link"
                          onClick={() => {
                            router.push({
                              name: 'rubbishWords_maintain',
                              query: { code },
                            });
                          }}
                        >
                          {name}
                        </TButton.Button>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <TButton.List>词条类型维护</TButton.List>
              </Dropdown>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchRubbishWordsWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchRubbishWordsWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        {this.state.createModalVisible && (
          <CreateModal
            handleCancel={() => {
              this.setState({ createModalVisible: false });
            }}
            reload={this.fetchRubbishWords}
          />
        )}
        {this.state.currentRecord && (
          <EditModal
            editAble={this.state.editAble}
            initialValues={this.state.currentRecord}
            handleCancel={() => {
              this.setState({ currentRecord: null });
            }}
            reload={this.fetchRubbishWords}
          />
        )}
        <RubbishWordsList
          columns={this.columns}
          className={styles.rubbishWordsList}
          onPageSizeChange={this.fetchRubbishWords}
        />
      </div>
    );
  }
}

export default Index;
