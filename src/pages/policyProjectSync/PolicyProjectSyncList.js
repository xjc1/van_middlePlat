import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { policyProjectSyncStatus } from '@/utils/constantEnum';

@connect(({ policyProjectSync, loading }) => ({
  ...policyProjectSync,
  loading: loading.effects['policyProjectSync/fetchList'],
}))
class PolicyProjectSyncList extends PureComponent {
  columns = [
    {
      title: '同步状态',
      dataIndex: 'status',
      render: status => policyProjectSyncStatus.$v_names[status],
    },
    {
      title: '同步地区',
      dataIndex: 'region',
    },
    {
      title: '未同步数',
      dataIndex: 'notSync',
    },
    {
      title: '已同步数',
      dataIndex: 'already',
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '结束时间',
      dataIndex: 'updateTime',
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '操作人员',
      dataIndex: 'operator',
    },
  ];

  timer = null;

  componentDidMount() {
    this.timer = setInterval(() => this.handlePollingForData(), 15 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlePollingForData = () => {
    const { fetchList, loading, pageNum } = this.props;
    if (!loading) {
      fetchList({ page: pageNum });
    }
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default PolicyProjectSyncList;
