import { Alert, Tooltip } from 'antd';
import React from 'react';
import commonDownload from '@/services/commonDownload';

export function CellTooltip({ text }) {
  return (
    <Tooltip title={text} placement="bottomLeft">
      {text}
    </Tooltip>
  );
}

export function renderCellText(text) {
  return <CellTooltip text={text} />;
}

export function formatDateColumns(dates = []) {
  return dates
    .map(({ date }) => ({
      title: date,
      dataIndex: String(date),
      width: '120px',
      ellipsis: true,
      render: renderCellText,
    }))
    .reverse();
}

export function ViewTips() {
  return <Alert message="【shift + 鼠标滚轮】 可快捷横向滑动表格" type="info" showIcon />;
}

export function exportMsgList(body = {}) {
  return commonDownload({
    url: '/messageStatistic/export',
    name: 'message.xlsx',
    method: 'POST',
    condition: body,
  });
}
