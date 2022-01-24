import React from 'react';
import { Table } from 'antd';
import { OperateBar } from '@/components/tis_ui';
import router from '@/utils/tRouter';

function FunctionTable({ value = [], disabled }) {
  const columns = [
    { title: '函数名称', dataIndex: 'functionName' },
    {
      title: '操作',
      width: 160,
      align: 'center',
      render: (text, record) => {
        return (
          !disabled && (
            <OperateBar>
              <OperateBar.Button
                onClick={() => {
                  router.push({
                    name: 'ruleManage_view',
                    query: { id: record.functionId, needBack: true },
                  });
                }}
              >
                查看
              </OperateBar.Button>
              <OperateBar.Button
                onClick={() => {
                  router.push({
                    name: 'ruleManage_edit',
                    query: { id: record.functionId, needBack: true },
                  });
                }}
              >
                编辑
              </OperateBar.Button>
            </OperateBar>
          )
        );
      },
    },
  ];
  return <Table dataSource={value} columns={columns} bordered rowKey="functionId" />;
}

export default FunctionTable;
