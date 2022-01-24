import React from 'react';
import { Table } from 'antd';

function UserTag({ value = [] }) {
  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
    },
    { title: '标签分类', dataIndex: 'category' },
  ];
  return (
    <>
      <Table dataSource={value} columns={columns} rowKey="id" />
    </>
  );
}

export default UserTag;
