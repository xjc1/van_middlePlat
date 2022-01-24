import React from 'react';
import { Table } from 'antd';
import { OperateBar } from '@/components/tis_ui';
import router from '@/utils/tRouter';

function TagsTable({ value = [] }) {
  const columns = [
    { title: '标签名称', dataIndex: 'name' },
    { title: '标签分类', dataIndex: 'category' },
    {
      title: '操作',
      width: 160,
      align: 'center',
      render: (text, record) => {
        return (
          <OperateBar>
            <OperateBar.Button
              onClick={() => {
                router.push({ name: 'tags_view', params: { tagId: record.id } });
              }}
            >
              查看
            </OperateBar.Button>
            <OperateBar.Button
              onClick={() => {
                router.push({ name: `tags_edit`, params: { tagId: record.id } });
              }}
            >
              编辑
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];
  return <Table size="small" dataSource={value} columns={columns} rowKey="id" bordered />;
}

export default TagsTable;
