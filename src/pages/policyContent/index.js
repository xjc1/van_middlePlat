import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DataImport, DateTools } from '@/components/tis_ui';
import { AsyncExportFile } from '@/components/bussinessComponents';
import {
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Checkbox, message } from 'antd';
import _ from 'lodash';
import { POLICY } from '@/services/api';
import commonDownload from '@/services/commonDownload';
import globalStyles from '@/global.less';
import {
  similarQuestionSimilarType,
  policyUpDownStatus,
  asyncExportArguments,
  commonUpdateStatus,
} from '@/utils/constantEnum';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import { policyTagExcelUrl, policyTagImportUrl } from '@/constants';
import router from '@/utils/tRouter';
import PolicyContentQueryBar from './PolicyContentQueryBar';
import styles from './policyContent.less';
import PolicyContentList from './PolicyContentList';

import TrackTool from '@/utils/TrackTool';

@connect(({ policyContent, department, loading }) => ({
  ...policyContent,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['policyContent/fetchList'],
}))
class Index extends PureComponent {
  queryForm = null;

  state = {
    similarVisible: false,
    columns: [
      {
        title: '政策名称',
        dataIndex: 'name',
        show: true,
        sorter: true,
        width: 350,
        fixed: 'left',
        className: globalStyles.primaryColmn,
      },
      {
        title: '创建时间',
        width: 150,
        dataIndex: 'createTime',
        show: true,
        sorter: true,
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '更新状态',
        width: 100,
        dataIndex: 'updateStatus',
        show: true,
        render: text => {
          return commonUpdateStatus.$v_names[text];
        },
      },
      {
        title: '政策分类',
        dataIndex: 'category',
        width: 150,
        show: true,
        ellipsis: true,
        sorter: true,
        render: (text = []) => _.map(text, ({ name, code }) => name || code).join(' | '),
      },
      {
        title: '政策级别',
        dataIndex: 'level',
        show: true,
        width: 150,
        sorter: true,
        ellipsis: true,
        render: text => {
          const { dictNames } = this.props;
          const [val] = _.at(dictNames, `ZCJB0001.${text}`);
          return val;
        },
      },
      {
        title: '发布部门',
        dataIndex: 'publishDepartment',
        width: 150,
        ellipsis: true,
        sorter: true,
        show: true,
        render: text => {
          const { flatDeparts } = this.props;
          return flatDeparts[text] || text;
        },
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        width: 150,
        ellipsis: true,
        sorter: true,
        show: true,
        render: text => {
          const { dictNames } = this.props;
          const [val] = _.at(dictNames, `DXLX0001.${text}`);
          return val;
        },
      },
      {
        title: '采录部门',
        dataIndex: 'collectDepartment',
        width: 150,
        sorter: true,
        ellipsis: true,
        show: true,
        render: text => {
          const { flatDeparts } = this.props;
          return flatDeparts[text] || text;
        },
      },
      {
        title: '归属部门',
        dataIndex: 'attributionDepartment',
        show: true,
        width: 150,
        render: text => {
          const { dictNames } = this.props;
          return _.map(text, code => {
            const [val] = _.at(dictNames, `SHGSBMSH.${code}`);
            // 不正确的也显示
            return val || code;
          }).join(' | ');
        },
      },
      {
        title: '上下架',
        dataIndex: 'status',
        width: 100,
        fixed: 'right',
        show: true,
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '操作',
        dataIndex: 'operation',
        show: true,
        width: 200,
        fixed: 'right',
        align: 'center',
        render: (text, record) => {
          return (
            <OperateBar
              more={
                <>
                  {authCheck(
                    authEnum.policyContent_edit_alias,
                    <OperateBar.Button
                      disabled={!record.editable}
                      icon={<EditOutlined />}
                      onClick={() => this.onEdit(record)}
                    >
                      编辑
                    </OperateBar.Button>,
                  )}

                  {authCheck(
                    authEnum.policyContent_publish,
                    <OperateBar.Button
                      icon={<VerticalAlignMiddleOutlined />}
                      confirmText="警告"
                      onClick={() => this.changeStatus(record)}
                      confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                    >
                      {record.status === 1 ? '下架' : '上架'}
                    </OperateBar.Button>,
                  )}

                  {authCheck(
                    authEnum.policyContent_operate,
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                    >
                      相似问
                    </OperateBar.Button>,
                  )}

                  {authCheck(
                    authEnum.policyContent_delete,
                    <OperateBar.Button
                      danger
                      disabled={!record.editable}
                      icon={<RollbackOutlined />}
                      confirmText="警告"
                      confirmContent="删除将不可能再恢复,确定删除吗?"
                      onClick={() => this.onDelete(record)}
                    >
                      删除
                    </OperateBar.Button>,
                  )}
                </>
              }
            >
              <OperateBar.Button icon={<FileSearchOutlined />} onClick={() => this.onView(record)}>
                查看
              </OperateBar.Button>
            </OperateBar>
          );
        },
      },
    ],
    downloadVisible: false,
    importVisible: false,
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    const { columns } = this.state;
    const policyContentColumns = localStorage.getItem('policyContentColumns');
    if (policyContentColumns) {
      const policyContentColumnsArr = JSON.parse(policyContentColumns);
      this.setState({
        columns: columns.map(column => {
          return {
            ...column,
            show: _.indexOf(policyContentColumnsArr, column.dataIndex) >= 0,
          };
        }),
      });
    }
  }

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  onEdit = record => {
    router.push({ name: 'policyContent_edit', params: { policyId: record.id } });
  };

  onView = record => {
    router.push({ name: 'policyContent_view', params: { policyId: record.id } });
  };

  onDelete = async record => {
    const { page, pageSize, condition, total } = this.props;
    const nextPage = total - page * pageSize > 1 ? page : page - 1;
    await POLICY.deletePolicyUsingPOST(record.id);
    message.success('刪除成功！');
    this.fetchPolicyContent({ page: nextPage, pageSize, condition });
  };

  changeStatus = record => {
    const { page, pageSize, condition } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'policyContent/changeStatus',
      payload: record.id,
      status: record.status,
      callBack: () => {
        message.success('操作成功');
        this.fetchPolicyContent({ page, pageSize, condition });
      },
    });
  };

  toggleColumns = dataIndex => {
    const { columns } = this.state;
    const column = _.find(columns, { dataIndex });
    column.show = !column.show;
    const localColumns = _.chain(columns)
      .filter(({ show }) => show)
      .map(({ dataIndex: dataIndex2 }) => dataIndex2)
      .value();
    localStorage.setItem('policyContentColumns', JSON.stringify(localColumns));
    this.setState({
      columns: [...columns],
    });
  };

  // 数据查询
  fetchPolicyContent = ({ page = 0, pageSize = 10, condition }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyContent/fetchList',
      payload: {
        page,
        size: pageSize,
      },
      condition,
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/policy/export', name: '模板.xlsx' });
    onClose();
  };

  // 下载标签导入模板
  downloadTagExcel = async () => {
    message.loading('下载中');
    await commonDownload({ url: policyTagExcelUrl, name: '政策标签导入模板.xlsx' });
  };

  // 异步提交导出请求
  exportPolicyWithQuery = () => {
    return new Promise((resolve, reject) => {
      POLICY.asyncExportMatterUsingPOST({
        body: this.queryForm.getFieldsValue(),
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
    const { columns, columnsCheck, downloadVisible, importVisible } = this.state;
    const { pageSize, loading, condition } = this.props;

    return (
      <div className={styles.policyContentPage}>
        <PolicyContentQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.policyContent_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('policyContent_new');
                  }}
                >
                  新增政策
                </TButton.Create>
              </Auth>
              <Auth auth={authEnum.policyContent_edit_alias}>
                <Dropdown
                  onVisibleChange={visible => {
                    this.setState({ downloadVisible: visible });
                  }}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <TButton.Button type="link" onClick={this.downloadEmpty}>
                          政策上传模板
                        </TButton.Button>
                      </Menu.Item>

                      <Menu.Item>
                        <TButton.Button type="link" onClick={this.downloadTagExcel}>
                          标签上传模板
                        </TButton.Button>
                      </Menu.Item>
                    </Menu>
                  }
                  visible={downloadVisible}
                >
                  <TButton.Download>模板下载</TButton.Download>
                </Dropdown>
              </Auth>

              <Auth auth={authEnum.policyContent_edit_alias}>
                <Dropdown
                  onVisibleChange={visible => {
                    this.setState({ importVisible: visible });
                  }}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <DataImport
                          btnText="导入政策"
                          action="/policy/import"
                          refresh={this.fetchPolicyContent}
                          type="link"
                          ghost={false}
                          icon={null}
                        />
                      </Menu.Item>

                      <Menu.Item>
                        <DataImport
                          btnText="导入标签"
                          action={policyTagImportUrl}
                          refresh={this.fetchPolicyContent}
                          type="link"
                          ghost={false}
                          icon={null}
                        />
                      </Menu.Item>
                    </Menu>
                  }
                  visible={importVisible}
                >
                  <TButton.Input>Excel导入</TButton.Input>
                </Dropdown>
              </Auth>

              <Auth auth={authEnum.policyContent_edit_alias}>
                <AsyncExportFile
                  applyDerive={this.exportPolicyWithQuery}
                  type={asyncExportArguments.policy}
                  placement="bottom"
                />
              </Auth>

              <Auth auth={authEnum.policyContent_edit_alias}>
                <Dropdown
                  onVisibleChange={flag => {
                    this.setState({ columnsCheck: flag });
                  }}
                  overlay={
                    <Menu>
                      {_.map(columns, ({ title, dataIndex, show }, index) => (
                        <Menu.Item key={index}>
                          <Checkbox
                            onChange={() => this.toggleColumns(dataIndex)}
                            checked={show}
                            value={dataIndex}
                          >
                            {title}
                          </Checkbox>
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                  visible={columnsCheck}
                >
                  <TButton.Config>列配置</TButton.Config>
                </Dropdown>
              </Auth>

              <Auth auth={authEnum.policyContent_edit_alias}>
                <TButton.Edit
                  onClick={() => {
                    router.push({
                      name: 'policyContent_bulk',
                      query: _.reduce(
                        condition,
                        (result, v, k) => {
                          if (!_.isUndefined(v)) {
                            // eslint-disable-next-line no-param-reassign
                            result[k] = v;
                          }
                          return result;
                        },
                        {},
                      ),
                    });
                  }}
                >
                  批量操作
                </TButton.Edit>
              </Auth>

              {/* <TButton.Preview >政策显示效果</TButton.Preview> */}
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(vals => {
                    this.setState({ query: vals }, () => {
                      this.fetchPolicyContent({
                        page: 0,
                        pageSize,
                        condition: this.state.query,
                      });
                    });
                  });
                }}
              >
                查询
              </TButton.Search>

              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchPolicyContent({
                    page: 0,
                    pageSize,
                    condition: this.queryForm.getFieldsValue(),
                  });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <PolicyContentList
          scroll={{ x: '100%' }}
          columns={_.filter(columns, ({ show }) => show)}
          loading={loading}
          className={styles.policyContentList}
          query={this.state.query}
        />

        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            type={similarQuestionSimilarType.policy}
          />
        )}
      </div>
    );
  }
}

export default Index;
