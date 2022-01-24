import React from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { portraitUpdateStatus } from '@/utils/constantEnum';
import { EmptyFn, TTable } from '@/components/tis_ui';

const ellipsisContent = {
  width: '15%',
  ellipsis: true,
  render: content => (
    <Tooltip title={content} placement="topLeft">
      {content}
    </Tooltip>
  ),
};

const columns = [
  {
    title: '原标签名称',
    dataIndex: 'originalTagName',
    ...ellipsisContent,
  },
  {
    title: '来源',
    dataIndex: 'source',
    ...ellipsisContent,
  },
  {
    title: '标签名称',
    dataIndex: 'tagName',
    ...ellipsisContent,
  },
  {
    title: '标签分类',
    dataIndex: 'category',
    ...ellipsisContent,
  },
  {
    title: '已同步数',
    dataIndex: 'already',
  },
  {
    title: '未同步数',
    dataIndex: 'notSync',
  },
  {
    title: '变更',
    dataIndex: 'type',
    render: type => portraitUpdateStatus.$v_names[type],
  },
];

function SyncDetailModal({ dataSource = [], memo = '', onClose = EmptyFn }) {
  return (
    <Modal
      title="同步详情"
      visible
      onCancel={onClose}
      maskClosable={false}
      width="65%"
      footer={<Button onClick={onClose}>关闭</Button>}
    >
      <TTable
        columns={columns}
        dataSource={dataSource}
        pagination={{ size: 'small', defaultPageSize: 5 }}
        rowKey="id"
      />
      <p>备注：{memo}</p>
    </Modal>
  );
}

export default SyncDetailModal;
