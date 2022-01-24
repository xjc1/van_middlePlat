import React from 'react';
import { Table } from 'antd';
import { OperateBar } from '@/components/tis_ui';
import router from '@/utils/tRouter';

function ModulesTable({ value = [] }) {
  const columns = [
    { title: '模块名称', dataIndex: 'name' },
    { title: '模块编码', dataIndex: 'code' },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => {
        return (
          <OperateBar>
            <OperateBar.Button
              onClick={() => {
                router.push({ name: 'modules_view', params: { id: record.id } });
              }}
            >
              查看
            </OperateBar.Button>
            <OperateBar.Button
              onClick={() => {
                router.push({ name: 'modules_edit', params: { id: record.id } });
              }}
            >
              编辑
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];
  return <Table dataSource={value} columns={columns} rowKey="id" />;
}

export default ModulesTable;
