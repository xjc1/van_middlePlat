import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DataImport, OperateBar, TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import {
  asyncExportArguments,
  policyUpDownStatus,
  similarQuestionSimilarType,
  terminalType,
} from '@/utils/constantEnum';
import { MATTERHANDLEGUIDES } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import MatterHandleGuideQueryBar from './MatterHandleGuideQueryBar';
import MatterHandleGuideList from './MatterHandleGuideList';
import styles from './matterHandleGuide.less';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import authEnum, { authCheck, Auth } from '@/utils/auth';

@connect(({ matterHandleGuide, department }) => {
  return {
    ...matterHandleGuide,
    flatDeparts: department.flatDeparts,
  };
})
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    relatedId: '',
    similarVisible: false,
  };

  componentDidMount() {
    this.fetchMatterHandleGuide({});
  }

  fetchMatterHandleGuideWithQuery = ({ page = 0, size = 10, query }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'matterHandleGuide/fetchList',
      payload: {
        page,
        size,
        query: { ...query },
      },
    });
    this.setState({ query });
  };

  fetchMatterHandleGuide = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'matterHandleGuide/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  changeStatus = async ({ id, status }) => {
    await MATTERHANDLEGUIDES.updateMatterHandleGuideStatusUsingPOST(
      id,
      status === policyUpDownStatus.down ? policyUpDownStatus.up : policyUpDownStatus.down,
    );
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  deleteMatterHandleGuide = async id => {
    await MATTERHANDLEGUIDES.deleteMatterHandleGuideUsingPOST(id);
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  reload = () => {
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({
      url: '/matterHandleGuides/importTemplate',
      name: '网上办事指引导入模板.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportMatterWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      MATTERHANDLEGUIDES.exportMatterHandleGuideAsyncUsingGET({
        params: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  columns = [
    {
      title: '导办主题',
      width: 300,
      dataIndex: 'guideTopic',
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'createTime',
    },
    {
      title: '创建部门',
      width: 150,
      dataIndex: 'collectDepartment',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '更新时间',
      width: 150,
      dataIndex: 'updateTime',
    },
    {
      title: '更新部门',
      width: 150,
      dataIndex: 'updateDept',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '终端类型',
      width: 150,
      dataIndex: 'clientType',
      ellipsis: true,
      render: (types = []) => types.map(item => terminalType.$v_names[item]).join(' | '),
    },
    {
      title: '行政区划',
      width: 150,
      dataIndex: 'regions',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
      },
    },
    {
      title: '上下架状态',
      width: 150,
      dataIndex: 'status',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 180,
      render: (text, record) => (
        <OperateBar
          more={
            <>
              {authCheck(
                authEnum.matterHandleGuide_edit_alias,
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    router.push({ name: 'matterHandleGuide_edit', params: { id: record.id } })
                  }
                >
                  编辑
                </OperateBar.Button>,
              )}
              {authCheck(
                authEnum.matterHandleGuide_publish,
                <OperateBar.Button
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="警告"
                  onClick={() => {
                    this.changeStatus(record);
                  }}
                  confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                >
                  {record.status === 1 ? '下架' : '上架'}
                </OperateBar.Button>,
              )}

              {authCheck(
                authEnum.matterHandleGuide_operate,
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                >
                  相似问
                </OperateBar.Button>,
              )}

              {authCheck(
                authEnum.matterHandleGuide_delete,
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={() => {
                    this.deleteMatterHandleGuide(record.id);
                  }}
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
              router.push({ name: 'matterHandleGuide_view', params: { id: record.id } })
            }
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  render() {
    const { list, total, pageSize, pageNum } = this.props;
    const { query } = this.state;
    return (
      <div>
        <MatterHandleGuideQueryBar
          initialValues={TrackTool.getQueryParamsCache()}
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.matterHandleGuide_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('matterHandleGuide_create');
                  }}
                >
                  新增导办
                </TButton.Create>
              </Auth>

              <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>

              <DataImport
                action="/matterHandleGuides/import"
                refresh={this.fetchMatterHandleGuide}
              />

              <AsyncExportFile
                applyDerive={this.exportMatterWithQuery}
                type={asyncExportArguments.matterHandleGuide}
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(nextQuery => {
                    this.fetchMatterHandleGuideWithQuery({ page: 0, size: 10, query: nextQuery });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  console.log('-> ', this.queryForm);
                  this.queryForm.resetFields();
                  // 重置数据
                  this.setState({ query }, () => {
                    this.fetchMatterHandleGuideWithQuery({ page: 0, size: 10, query: {} });
                  });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        <MatterHandleGuideList
          columns={this.columns}
          dataSource={list}
          className={styles.matterHandleGuideList}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              this.fetchMatterHandleGuideWithQuery({ page, size: pageSize, query });
            },
          }}
        />
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={similarQuestionSimilarType.matterHandleGuide}
          />
        )}
      </div>
    );
  }
}

export default Index;
