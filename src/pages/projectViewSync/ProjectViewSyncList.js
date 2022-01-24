
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { TTable, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { policyProjectSyncStatus } from '@/utils/constantEnum';

const columns = [
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

@connect(({ projectViewSync,loading }) => ({
  ...projectViewSync,
  loading:loading.effects["projectViewSync/fetchList"]
}))
class ProjectViewSyncList extends PureComponent {

  timer = null;

  componentDidMount() {
    this.timer = setInterval(() => this.handlePollingForData(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlePollingForData = () => {
    const { onPageSizeChange, loading, pageNum } = this.props;
    if (!loading) {
      onPageSizeChange({ page: pageNum });
    }
  };

  render() {
    const { list, total, pageSize, pageNum, onPageSizeChange = EmptyFn,className,loading} = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize })
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default ProjectViewSyncList;

