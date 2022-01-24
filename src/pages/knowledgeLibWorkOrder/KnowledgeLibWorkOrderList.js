import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { commonAuditState, sourceType } from '@/utils/constantEnum';

@connect(({ knowledgeLibWorkOrder, loading }) => ({
  ...knowledgeLibWorkOrder,
  loading: loading.effects['knowledgeLibWorkOrder/fetchList'],
}))
class WorkOrderCommitList extends PureComponent {
  state = {
    columns: [],
  };

  componentDidMount() {
    const { operate } = this.props;
    this.setState({
      columns: [
        {
          title: '工单编号',
          dataIndex: 'id',
        },
        {
          title: '知识名称',
          dataIndex: 'name',
        },
        {
          title: '更新日期',
          dataIndex: 'updateTime',
          render: timeStr => DateTools.transformDefaultFormat(timeStr),
        },
        {
          title: '来源方式',
          dataIndex: 'source',
          render: source => sourceType.$v_names[source],
        },
        {
          title: '审核状态',
          dataIndex: 'review',
          render: review => commonAuditState.$v_names[review],
        },
        operate,
      ],
    });
  }

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      loading,
    } = this.props;
    const { columns } = this.state;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default WorkOrderCommitList;
