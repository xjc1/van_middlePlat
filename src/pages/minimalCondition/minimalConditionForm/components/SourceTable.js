import React from 'react';
import { Table, Space, message } from 'antd';
import { modulesContentType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';

function SourceTable({ value = [] }) {
  const handleView = (type, id) => {
    switch (type) {
      case modulesContentType.POLICY_PROJECT:
        router.push({ name: 'projectManage_view', params: { id } });
        break;
      case modulesContentType.POLICY:
        router.push({ name: 'policyContent_view', params: { policyId: id } });
        break;
      default:
        message.error('暂不支持此类型!');
    }
  };

  const handleEdit = (type, id) => {
    switch (type) {
      case modulesContentType.POLICY_PROJECT:
        router.push({ name: 'projectManage_edit', params: { id } });
        break;
      case modulesContentType.POLICY:
        router.push({ name: 'policyContent_edit', params: { policyId: id } });
        break;
      default:
        message.error('暂不支持此类型!');
    }
  };
  const columns = [
    {
      title: '来源类型',
      dataIndex: 'sourceType',
      width: 100,
      render: text => modulesContentType.$v_names[text] || text,
    },
    { title: '来源名称', dataIndex: 'sourceName' },
    {
      title: '原文',
      dataIndex: 'content',
    },
    {
      title: '操作人',
      width: 150,
      dataIndex: 'operator',
    },
    {
      title: '梳理时间',
      dataIndex: 'updateTime',
      width: 120,
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      render: record => {
        return (
          <Space>
            <a
              onClick={() => {
                handleView(record.sourceType, record.sourceId);
              }}
            >
              查看
            </a>
            <a
              onClick={() => {
                handleEdit(record.sourceType, record.sourceId);
              }}
            >
              编辑
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Table bordered dataSource={value} columns={columns} rowKey="sourceId" />
    </>
  );
}

export default SourceTable;
