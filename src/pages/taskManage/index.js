import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DateTools } from '@/components/tis_ui';
import {
  ReloadOutlined,
  EditOutlined,
  RollbackOutlined,
  RocketOutlined,
  RotateLeftOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { message, Tag } from 'antd';
import router from '@/utils/tRouter';
import {
  pageStatus as pageEnum,
  taskRuningStatus,
  taskLastExecuteStatus,
} from '@/utils/constantEnum';
import { SCHEDULER } from '@/services/api';
import TaskFormModal from './taskForm/index';
import TaskManageQueryBar from './TaskManageQueryBar';
import TaskManageList from './TaskManageList';
import styles from './taskManage.less';
import TrackTool from '@/utils/TrackTool';

const statusColor = {
  [taskRuningStatus.SUCCESS]: 'green',
  [taskRuningStatus.FAILED]: 'red',
};

@connect(({ taskManage }) => taskManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    modalVisible: false,
    modalConfig: {
      initData: {},
      pageStatus: pageEnum.view,
    },
  };

  columns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      width: 150,
    },
    {
      title: '上次执行状态',
      dataIndex: 'executeStatus',
      width: 150,
      render: text => {
        return <Tag color={statusColor[text]}>{taskLastExecuteStatus.$v_names[text]}</Tag>;
      },
    },
    {
      title: 'cron表达式',
      dataIndex: 'cronExpression',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: text => {
        return <Tag color={statusColor[text]}>{taskRuningStatus.$v_names[text]}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 110,
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      align: 'center',

      render: (text, record) => {
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<RocketOutlined />}
                  confirmText="警告"
                  confirmContent="确定需要执行该任务吗？"
                  onClick={() => this.handleExecute(record.id)}
                >
                  执行
                </OperateBar.Button>

                {this.renderStatuOperation(record.id, record.status)}

                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除任务将不可能再恢复,确定删除吗?"
                  onClick={() => this.handleDelete(record.id)}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                this.handleEdit(record);
              }}
            >
              编辑
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchTaskManage({});
  }

  fetchTaskManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchTaskManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'taskManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  handleEdit = record => {
    SCHEDULER.getJobDetailUsingGET(record.id).then(recordDetail => {
      this.setState({
        modalVisible: true,
        modalConfig: { initData: recordDetail, pageStatus: pageEnum.edit },
      });
    });
  };

  handleExecute = recordId => {
    SCHEDULER.executionUsingPOST(recordId).then(() => {
      message.success('执行成功');
      this.fetchTaskManage({});
    });
  };

  handleRecovery = recordId => {
    SCHEDULER.updateIsPauseUsingPOST({
      body: { id: recordId, status: taskRuningStatus.SUCCESS },
    }).then(() => {
      message.success('恢复成功');
      this.fetchTaskManage({});
    });
  };

  handleStop = recordId => {
    SCHEDULER.updateIsPauseUsingPOST({
      body: { id: recordId, status: taskRuningStatus.FAILED },
    }).then(() => {
      message.success('暂停成功');
      this.fetchTaskManage({});
    });
  };

  handleDelete = recordId => {
    SCHEDULER.deleteUsingPOST(recordId).then(() => {
      message.success('删除成功');
      this.fetchTaskManage({});
    });
  };

  renderStatuOperation = (id, status) => {
    switch (status) {
      case taskRuningStatus.SUCCESS:
        return (
          <OperateBar.Button
            icon={<StopOutlined />}
            confirmContent="确定需要暂停该任务吗？"
            onClick={() => this.handleStop(id)}
          >
            暂停
          </OperateBar.Button>
        );
      case taskRuningStatus.FAILED:
        return (
          <OperateBar.Button
            icon={<RotateLeftOutlined />}
            confirmContent="确定需要恢复该任务吗？"
            onClick={() => this.handleRecovery(id)}
          >
            恢复
          </OperateBar.Button>
        );
      default:
        // eslint-disable-next-line consistent-return
        return <></>;
    }
  };

  render() {
    const { modalVisible, modalConfig } = this.state;
    const { pageSize, pageNum } = this.props;
    return (
      <div>
        <TaskManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  this.setState({
                    modalVisible: true,
                    modalConfig: { pageStatus: pageEnum.new },
                  });
                }}
              >
                新增任务
              </TButton.Create>
              <TButton.List
                onClick={() => {
                  router.push({ name: 'taskManage_logs' });
                }}
              >
                日志
              </TButton.List>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    const { timeRange = [], ...otherQuey } = query;
                    const [startTime, endTime] = timeRange;

                    this.fetchTaskManageWithQuery({
                      query: {
                        startTime: startTime
                          ? startTime.startOf('day').format('YYYY-MM-DD HH:mm:ss')
                          : undefined,
                        endTime: endTime
                          ? endTime.endOf('day').format('YYYY-MM-DD HH:mm:ss')
                          : undefined,
                        ...otherQuey,
                      },
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
                  this.fetchTaskManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>

              <TButton.Button
                onClick={() => {
                  // 刷新
                  this.fetchTaskManage({ page: pageNum, size: pageSize });
                }}
                icon={<ReloadOutlined />}
              >
                刷新
              </TButton.Button>
            </>
          }
        />

        <TaskManageList
          className={styles.taskManageList}
          onPageSizeChange={this.fetchTaskManage}
          columns={this.columns}
          scroll={{ x: '100%' }}
        />
        {modalVisible && (
          <TaskFormModal
            reload={this.fetchTaskManageWithQuery}
            modalConfig={modalConfig}
            onCancel={() => {
              this.setState({ modalVisible: false, modalConfig: {} });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
