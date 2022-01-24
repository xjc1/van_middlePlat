import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { notification, message } from 'antd';
import {
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import { TButton, OperateBar } from '@/components/tis_ui';
import {
  commonShelf,
  policyUpDownStatus,
  dimensionMarkType,
  similarQuestionSimilarType,
  asyncExportArguments,
  commonUpdateStatus,
} from '@/utils/constantEnum';
import TrackTool from '@/utils/TrackTool';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { CONVENIENCE } from '@/services/api';
import commonDownload from '@/services/commonDownload';
import globalStyles from '@/global.less';
import DimensionSignModal from '@/components/DimensionSign/dimensionSignModal';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import ServiceQueryBar from './ServiceQueryBar';
import ServiceList from './ServiceList';
import styles from './serviceList.less';

@connect(({ service, loading }) => ({
  ...service,
  loading: loading.effects['service/fetchList'],
}))
class Index extends PureComponent {
  state = {
    query: TrackTool.getQueryParamsCache(),
    similarVisible: false,
    columns: [
      {
        title: '服务名称',
        dataIndex: 'name',
        width: '25%',
        show: true,
        className: globalStyles.primaryColmn,
      },
      {
        title: '三级分类',
        dataIndex: 'threeType',
        width: '10%',
        show: true,
        ellipsis: true,
      },
      {
        title: '更新状态',
        dataIndex: 'updateStatus',
        render: text => commonUpdateStatus.$v_names[text],
      },
      {
        title: '服务类型',
        dataIndex: 'myServices',
        width: '10%',
        show: true,
        ellipsis: true,
      },
      {
        title: '申报对象',
        dataIndex: 'objectType',
        width: '10%',
        show: true,
        ellipsis: true,
      },
      {
        title: '图标',
        dataIndex: 'pictture',
        width: '10%',
        show: true,
        render: pic => {
          const currentpic = pic || '';
          const src = currentpic.slice(0, 10) === 'data:image' ? currentpic : atob(currentpic);
          return src && <img src={src} alt="" style={{ width: '30px', background: '#ccc' }} />;
        },
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        width: '10%',
        show: true,
        render: status => policyUpDownStatus.$v_names[status],
      },
      {
        title: '操作',
        align: 'center',
        width: 180,
        show: true,
        render: record => {
          return (
            <OperateBar
              more={
                <>
                  {authCheck(
                    authEnum.service_edit_alias,
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      onClick={() =>
                        router.push({ name: 'service_edit', params: { serviceid: record.id } })
                      }
                      disabled={!record.editable}
                    >
                      编辑
                    </OperateBar.Button>,
                  )}

                  {authCheck(
                    authEnum.service_publish,
                    <OperateBar.Button
                      icon={<VerticalAlignMiddleOutlined />}
                      confirmText="警告"
                      confirmContent={`确定需要${commonShelf.$v_names[record.status]}吗?`}
                      onClick={() => this.handleChangeStatus(record)}
                      disabled={!record.editable}
                    >
                      {commonShelf.$v_names[record.status]}
                    </OperateBar.Button>,
                  )}

                  {authCheck(
                    authEnum.service_operate,
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      disabled={!record.editable}
                      onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                    >
                      相似问
                    </OperateBar.Button>,
                  )}
                  {authCheck(
                    authEnum.service_operate,
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      disabled={!record.editable}
                      onClick={() =>
                        this.setState({
                          markId: record.id,
                          modelVisible: true,
                          markStaus: record.mark,
                        })
                      }
                    >
                      {record.mark ? '修改标注' : '标注'}
                    </OperateBar.Button>,
                  )}
                  {authCheck(
                    authEnum.service_delete,
                    <OperateBar.Button
                      danger
                      icon={<RollbackOutlined />}
                      confirmText="警告"
                      disabled={!record.editable}
                      confirmContent="删除服务将无法再恢复,确定删除吗?"
                      onClick={() => this.handleDeleteService(record)}
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
                  router.push({ name: 'service_view', params: { serviceid: record.id } })
                }
              >
                查看
              </OperateBar.Button>
            </OperateBar>
          );
        },
      },
    ],
    markId: null,
    modelVisible: false,
    markStaus: false,
  };

  queryForm = null;

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query } = this.state;

    dispatch({
      type: 'service/fetchList',
      params: { page, size },
      body: query,
    });
  };

  handleSearch = () => {
    this.queryForm.validateFields().then(vals => {
      this.setState({ query: vals }, () => this.fetchList({}));
    });
  };

  handleReset = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  handleChangeStatus = async ({ id, status }) => {
    const { pageNum, pageSize } = this.props;
    if (status) await CONVENIENCE.withdrawConvenienceUsingPOST(id);
    else await CONVENIENCE.publishConvenienceUsingPOST(id);
    notification.success({
      message: `成功${commonShelf.$v_names[status]}服务`,
    });
    this.fetchList({ page: pageNum, size: pageSize });
  };

  handleDeleteService = async ({ id }) => {
    const { pageNum, pageSize } = this.props;
    await CONVENIENCE.deleteConvenienceUsingPOST(id);
    notification.success({
      message: '成功删除服务',
    });
    this.fetchList({ page: pageNum, size: pageSize });
  };

  onCancel = () => {
    this.setState({ modelVisible: false, markId: null, similarVisible: false });
  };

  reload = () => {
    const { pageNum, pageSize } = this.props;
    this.fetchList({ page: pageNum, size: pageSize });
  };

  markExport = async () => {
    const onClose = message.loading('导出中');
    await commonDownload({
      url: '/convenience/markExport',
      name: '服务标注.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      CONVENIENCE.asyncExportConvenienceServiceUsingPOST({
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
    const { loading } = this.props;
    const { columns, query: queryCondition } = this.state;

    return (
      <>
        <ServiceQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.service_edit_alias}>
                <TButton.Create
                  type="primary"
                  ghost={false}
                  onClick={() => router.push('service_create')}
                >
                  新增服务
                </TButton.Create>
              </Auth>
              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.convenienceService}
                placement="bottom"
              />
              <Auth auth={authEnum.service_bulk}>
                <TButton.Edit
                  onClick={() =>
                    router.push({
                      name: 'service_bulk',
                      query: queryCondition,
                    })
                  }
                >
                  批量操作
                </TButton.Edit>
              </Auth>
              <TButton.Output onClick={this.markExport}>服务标注导出</TButton.Output>
            </>
          }
          footer={
            <>
              <TButton.Search ghost={false} onClick={this.handleSearch}>
                查询
              </TButton.Search>
              <TButton.Reset onClick={this.handleReset}>重置</TButton.Reset>
            </>
          }
        />
        <ServiceList
          className={styles.serviceList}
          columns={columns}
          fetchList={this.fetchList}
          loading={loading}
        />
        {this.state.modelVisible && (
          <DimensionSignModal
            mark={this.state.markStaus}
            cid={this.state.markId}
            reload={this.reload}
            handleCancel={this.onCancel}
            type={dimensionMarkType.convience}
          />
        )}
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            type={similarQuestionSimilarType.service}
          />
        )}
      </>
    );
  }
}

export default Index;
