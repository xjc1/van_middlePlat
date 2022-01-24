/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar } from '@/components/tis_ui';
import { message } from 'antd';
import moment from 'moment';
import commonDownload from '@/services/commonDownload';
import {
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { KNOWLEDGESTOREINTERFACES } from '@/services/api';
import { pageStatus as pageEnum } from '@/utils/constantEnum';
import CreateKnowledge from './compontents/createKnowledge';
import KnowledgeInterQueryBar from './KnowledgeInterQueryBar';
import KnowledgeInterList from './KnowledgeInterList';
import styles from './knowledgeInter.less';

const dateFormat = 'YYYY-MM-DD hh:mm:ss';

@connect(({ knowledgeInter }) => knowledgeInter)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    modalVisible: false,
    currentRecord: {},
    editVisible: false,
    pageStatus: pageEnum.new,
  };

  columns = [
    {
      title: '接口编号',
      dataIndex: 'interfaceNum',
    },
    {
      title: '接口名称',
      dataIndex: 'interfaceName',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      align: 'center',
      render: (text, record) => {
        const { interfaceFileName, interfaceFileDownloadUrl } = record;
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => this.onEdit(record.id, pageEnum.edit)}
                >
                  编辑
                </OperateBar.Button>
                {interfaceFileDownloadUrl && (
                  <OperateBar.Button
                    icon={<DownOutlined />}
                    // onClick={() => this.downloadTemplate(interfaceFileDownloadUrl, interfaceFileName)}
                  >
                    <a
                      style={{ textAlign: 'center', display: 'inlineBlock', padding: 6 }}
                      href={interfaceFileDownloadUrl}
                      download={interfaceFileName}
                      target="_blank"
                    >
                      下载
                    </a>
                  </OperateBar.Button>
                )}

                <OperateBar.Button
                  danger
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
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.onEdit(record.id, pageEnum.view)}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchKnowledgeInter({});
  }

  fetchKnowledgeInterWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledgeInter/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchKnowledgeInter = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledgeInter/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onCancel = () => {
    this.setState({ modalVisible: false, currentRecord: {} });
  };

  onEdit = async (id, pageStatus = pageEnum.view) => {
    const detail = await KNOWLEDGESTOREINTERFACES.queryKnowledgeStoreInterfaceDetailUsingGET(id);
    const { interfaceFileDownloadUrl, interfaceFileName, publishDate } = detail;

    const currentRecord = Object.assign({}, detail, {
      interfaceFileDownloadUrl: [interfaceFileDownloadUrl, interfaceFileName],
      publishDate: publishDate ? moment(publishDate, dateFormat) : publishDate,
    });
    this.setState({
      modalVisible: true,
      currentRecord,
      editVisible: pageStatus !== pageEnum.view,
      pageStatus,
    });
  };

  onDelete = async id => {
    await KNOWLEDGESTOREINTERFACES.deleteKnowledgeStoreInterfaceUsingPOST(id);
    message.success('操作成功');
    this.fetchKnowledgeInter({});
  };

  // 下载文件
  downloadTemplate = async (url, name) => {
    message.loading('下载中');
    await commonDownload({ url, name });
  };

  render() {
    return (
      <div>
        <KnowledgeInterQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() =>
                  this.setState({
                    modalVisible: true,
                    editVisible: true,
                    pageStatus: pageEnum.new,
                    currentRecord: {},
                  })
                }
              >
                新增接口
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchKnowledgeInterWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchKnowledgeInterWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <KnowledgeInterList
          columns={this.columns}
          className={styles.knowledgeInterList}
          onPageSizeChange={this.fetchKnowledgeInter}
        />
        {this.state.modalVisible && (
          <CreateKnowledge
            onCancel={this.onCancel}
            reload={() => this.fetchKnowledgeInter({})}
            initData={this.state.currentRecord}
            editVisible={this.state.editVisible}
            pageStatus={this.state.pageStatus}
          />
        )}
      </div>
    );
  }
}

export default Index;
