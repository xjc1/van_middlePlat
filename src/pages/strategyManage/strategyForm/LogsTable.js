import React from 'react';
import { Table } from 'antd';

function LogsTable({ value = [] }) {
  const columns = [
    { title: '更新日期', dataIndex: 'date' },
    { title: '更新内容', dataIndex: 'desc' },
  ];
  return <Table dataSource={value} columns={columns} />;
}

export default LogsTable;
