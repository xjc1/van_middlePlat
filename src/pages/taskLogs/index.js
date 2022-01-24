import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar, DateTools } from '@/components/tis_ui';
import { Tag } from 'antd';
import { taskLastExecuteStatus } from '@/utils/constantEnum';
import TaskLogsQueryBar from './TaskLogsQueryBar';
import TaskLogsList from './TaskLogsList';
import styles from './taskLogs.less';
import LogsDetailModal from './components/detailModal';

const statusColor = {
  [taskLastExecuteStatus.SUCCESS]: 'green',
  [taskLastExecuteStatus.FAILED]: 'red',
};

@connect(({ taskLogs }) => taskLogs)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    errorDetail: '',
  };

  columns = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
    },
    {
      title: 'cron表达式',
      dataIndex: 'cronExpression',
      width: '15%',
    },
    {
      title: '异常详情',
      dataIndex: 'exceptionDetail',
      width: 150,
      render: text => {
        return text ? (
          <OperateBar>
            <OperateBar.Button
              onClick={() => {
                this.setState({ errorDetail: text });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ) : (
          <></>
        );
      },
    },
    {
      title: '耗时(毫秒)',
      dataIndex: 'cost',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: text => {
        return <Tag color={statusColor[text]}>{taskLastExecuteStatus.$v_names[text]}</Tag>;
      },
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
  ];

  componentDidMount() {
    this.fetchTaskLogs({});
  }

  fetchTaskLogsWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskLogs/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchTaskLogs = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'taskLogs/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    const { errorDetail } = this.state;
    return (
      <div>
        <TaskLogsQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    const { timeRange = [], ...otherQuey } = query;
                    const [startTime, endTime] = timeRange;

                    this.fetchTaskLogsWithQuery({
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
                  this.fetchTaskLogsWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <TaskLogsList
          className={styles.taskLogsList}
          onPageSizeChange={this.fetchTaskLogs}
          columns={this.columns}
        />
        {errorDetail && (
          <LogsDetailModal
            errorDetail={errorDetail}
            onCancel={() => {
              this.setState({ errorDetail: '' });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
