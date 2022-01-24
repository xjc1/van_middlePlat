import React from 'react';
import { Modal, Table, Button } from 'antd';

function ErrorListModal(props) {
  const { list, onCancel } = props;
  const columns = [
    { title: '字典名称', dataIndex: 'name' },
    { title: '字典编码', dataIndex: 'code' },
  ];
  return (
    <Modal
      visible
      title="异常字典"
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      width={900}
      bodyStyle={{
        background: '#f5f5f5',
        padding: '10px',
      }}
      footer={
        <div>
          <Button onClick={onCancel}>关闭</Button>
        </div>
      }
    >
      <Table dataSource={list} rowKey="code" columns={columns} />
    </Modal>
  );
}

export default ErrorListModal;
