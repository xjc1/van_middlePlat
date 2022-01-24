import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DataImport } from '@/components/tis_ui';
import {
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  policyUpDownStatus,
  terminalType,
  asyncExportArguments,
  similarQuestionSimilarType,
} from '@/utils/constantEnum';
import { institutionImportUrl, institutionTemplateUrl } from '@/constants';
import _ from 'lodash';
import commonDownload from '@/services/commonDownload';
import { AsyncExportFile } from '@/components/bussinessComponents';
import router from '@/utils/tRouter';
import { KERNEL } from '@/services/api';
import { message } from 'antd';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import InstitutionManageQueryBar from './InstitutionManageQueryBar';
import InstitutionManageList from './InstitutionManageList';
import styles from './institutionManage.less';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';

@connect(({ institutionManage }) => institutionManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    relatedId: '',
    similarVisible: false,
  };

  columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '机构分类',
      dataIndex: 'category',
      width: '12%',
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `JGFL.${text}`);
        return val || text;
      },
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      width: '8%',
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `SH00XZQH.${text}`);
        return val;
      },
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      width: '20%',
      render: text => {
        return _.map(text, item => terminalType.$v_names[item]).join('；');
      },
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      width: '10%',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '操作',
      show: true,
      width: 200,
      align: 'center',
      render: record => {
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.institutionManage_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      router.push({ name: 'institutionManage_edit', params: { id: record.id } })
                    }
                  >
                    编辑
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.institutionManage_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="警告"
                    onClick={() => {
                      if (record.status === 1) {
                        this.downStatus(record.id);
                      } else {
                        this.upStatus(record.id);
                      }
                    }}
                    confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                  >
                    {record.status === 1 ? '下架' : '上架'}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.institutionManage_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    相似问
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.institutionManage_delete,
                  <OperateBar.Button
                    disabled={!authCheck(authEnum.institutionManage_delete, true, false)}
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除将不可能再恢复,确定删除吗?"
                    onClick={() => this.onDelete(record.id)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() =>
                router.push({ name: 'institutionManage_view', params: { id: record.id } })
              }
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchInstitutionManage({});
  }

  fetchInstitutionManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'institutionManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchInstitutionManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'institutionManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onDelete = id => {
    KERNEL.deleteInstitutionUsingPOST(id).then(() => {
      message.success('操作成功');
      this.reload();
    });
  };

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  reload = () => {
    const { pageSize, pageNum } = this.props;
    this.fetchInstitutionManage({ page: pageNum, size: pageSize });
  };

  downStatus = id => {
    KERNEL.downInstitutionUsingPOST(id).then(() => {
      message.success('下架成功');
      this.reload();
    });
  };

  upStatus = id => {
    KERNEL.upInstitutionUsingPOST(id).then(() => {
      message.success('上架成功');
      this.reload();
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    message.loading('下载中');
    await commonDownload({ url: institutionTemplateUrl, name: '机构导入模板.xlsx' });
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      KERNEL.asyncExportInstitutionUsingPOST({
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
    return (
      <div>
        <InstitutionManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.institutionManage_edit_alias}>
                <TButton.Create
                  onClick={() =>
                    router.push(`institutionManage_create`)
                  }
                >
                  新增机构
                </TButton.Create>
              </Auth>

              <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>

              <DataImport
                action={institutionImportUrl}
                refresh={() => this.fetchInstitutionManageWithQuery({})}
              />

              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.institution}
                btnText="机构导出"
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchInstitutionManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchInstitutionManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <InstitutionManageList
          columns={this.columns}
          className={styles.institutionManageList}
          onPageSizeChange={this.fetchInstitutionManage}
        />

        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={similarQuestionSimilarType.institutionManage}
          />
        )}
      </div>
    );
  }
}

export default Index;
