import React from 'react';
import { DateTools } from '@/components/tis_ui';
import { portraitAuditState } from '@/utils/constantEnum';
import { Tooltip } from 'antd';
import CurrentReviewRecords from './CurrentReviewRecords';
import HistoryReviewRecords from './HistoryReviewRecords';

const columns = [
  {
    title: '阶段',
    dataIndex: 'title',
  },
  {
    title: '部门',
    dataIndex: 'department',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: status => portraitAuditState.$v_names[status],
  },
  {
    title: '意见',
    dataIndex: 'comments',
    ellipsis: true,
    render: comments => (
      <Tooltip title={comments} placement="topLeft">
        {comments}
      </Tooltip>
    ),
  },
  {
    title: '时间',
    dataIndex: 'updateTime',
    render: timeStr => DateTools.transformDefaultFormat(timeStr),
  },
];

function Index({ onlyCurrent = false, elementId, reviewIds = [], ...others }) {
  return onlyCurrent ? (
    <CurrentReviewRecords columns={columns} elementId={elementId} {...others} />
  ) : (
    <HistoryReviewRecords columns={columns} reviewIds={reviewIds} {...others} />
  );
}

export default Index;
