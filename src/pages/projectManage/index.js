import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { TButton, OperateBar, DateTools, SortColumnTitle } from '@/components/tis_ui';
import {
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { message, notification } from 'antd';
import { DECLAREPROJECT } from '@/services/api';
import globalStyles from '@/global.less';
import commonDownload from '@/services/commonDownload';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import { commonShelf, policyUpDownStatus, asyncExportArguments } from '@/utils/constantEnum';
import { AsyncExportFile } from '@/components/bussinessComponents';
import ProjectManageQueryBar from './ProjectManageQueryBar';
import ProjectManageList from './ProjectManageList';
import styles from './projectManage.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ projectManage }) => projectManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  columns = [
    {
      title: '项目申报名称',
      className: globalStyles.primaryColmn,
      dataIndex: 'name',
    },
    {
      title: '行政区划',
      width: '12%',
      ellipsis: true,
      dataIndex: 'regions',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
      },
    },
    {
      title: '政策级别',
      width: '10%',
      ellipsis: true,
      dataIndex: 'policyLevel',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.ZCJB0001[code] ? dictNames.ZCJB0001[code] : code;
      },
    },
    {
      title: '面向对象',
      width: '10%',
      ellipsis: true,
      dataIndex: 'objectType',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.DXLX0001[code] ? dictNames.DXLX0001[code] : code;
      },
    },
    {
      title: '关联体检',
      width: '10%',
      ellipsis: true,
      dataIndex: 'relateExam',
      render: relateExam => {
        return relateExam === 1 ? '是' : '否';
      },
    },
    {
      title: '上下架状态',
      width: '10%',
      ellipsis: true,
      dataIndex: 'status',
      render: status => {
        return status === 1 ? '上架' : '下架';
      },
    },
    {
      title: (
        <SortColumnTitle
          defaultSort={TrackTool.getQueryParamsCache().sortDirection}
          onCancel={() => {
            this.fetchProjectWithSort();
          }}
          onSort={sort => {
            this.fetchProjectWithSort(sort);
          }}
          title="申报时间段"
        />
      ),
      width: 200,
      ellipsis: true,
      dataIndex: 'timeTags',
      render: time => {
        const timeArray = time || [];
        const { startTime, endTime } = timeArray[0] || {};
        const sTime = DateTools.transformDefaultFormat(startTime) || '';
        const eTime = DateTools.transformDefaultFormat(endTime) || '';
        return (
          <>
            {sTime} -- {eTime}
          </>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      align: 'center',
      render: (text, record) => {
        const { timeTags = [] } = record;
        // 下架状态并且无时间标签 置灰上架按钮
        const publishAble = !timeTags.length && record.status === policyUpDownStatus.down;
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.projectManage_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      router.push({ name: 'projectManage_edit', params: { id: record.id } })
                    }
                  >
                    编辑
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.projectManage_publish,
                  <OperateBar.Button
                    disabled={publishAble}
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="警告"
                    confirmContent={`确定需要${commonShelf.$v_names[record.status]}[${
                      record.name
                    }]吗？`}
                    onClick={() =>
                      this.handleChangeStatus({
                        id: record.id,
                        status: record.status,
                        name: record.name,
                      })
                    }
                  >
                    {commonShelf.$v_names[record.status]}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.projectManage_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    // onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                    onClick={() =>
                      router.push({ name: 'projectManage_exam', params: { id: record.id } })
                    }
                  >
                    体检
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.projectManage_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent={`确定要删除[${record.name}]吗?`}
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
                router.push({ name: 'projectManage_view', params: { id: record.id } })
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
    this.fetchProjectManage({});
  }

  fetchProjectManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    const { status, relateExam } = query;
    const nextQuery = {
      ...query,
      status: status === 'all' ? undefined : status,
      relateExam: relateExam === 'all' ? undefined : relateExam,
    };
    dispatch({
      type: 'projectManage/fetchList',
      payload: {
        page,
        size,
        query: nextQuery,
      },
    });
    this.setState({ query: nextQuery });
  };

  fetchProjectWithSort = sortDirection => {
    this.queryForm.validateFields().then(query => {
      this.fetchProjectManageWithQuery({ query: { ...query, sortDirection } });
    });
  };

  fetchProjectManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'projectManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onDelete = async recordId => {
    await DECLAREPROJECT.deleteProjectUsingPOST(recordId);
    message.success('操作成功');
    this.fetchProjectManage({});
  };

  handleChangeStatus = async ({ id, status, name }) => {
    if (status === Number(commonShelf.lower)) {
      await DECLAREPROJECT.withdrawProjectUsingPOST(id);
    } else {
      await DECLAREPROJECT.publishProjectUsingPOST(id);
    }

    notification.success({ message: `成功${commonShelf.$v_names[status]}[${name}]` });
    this.fetchProjectManage({});
  };

  examExport = async () => {
    const { relateExam, status, ...others } = this.queryForm.getFieldsValue();
    message.loading('导出中');
    await commonDownload({
      url: '/declareProject/exportExamination',
      name: '项目体检数据.txt',
      method: 'POST',
      condition: {
        ...others,
        relateExam: relateExam === 'all' ? undefined : relateExam,
        status: status === 'all' ? undefined : status,
      },
    });
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      DECLAREPROJECT.asyncExportProjectUsingPOST({
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
        <ProjectManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.projectManage_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('projectManage_create');
                  }}
                >
                  新增项目
                </TButton.Create>
              </Auth>
              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.project}
                btnText="项目导出"
                placement="bottom"
              />
              <TButton.Output onClick={this.examExport}>体检导出</TButton.Output>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchProjectManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchProjectManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ProjectManageList
          columns={this.columns}
          className={styles.projectManageList}
          onPageSizeChange={this.fetchProjectManage}
        />
      </div>
    );
  }
}

export default Index;
