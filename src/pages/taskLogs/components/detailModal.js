import React from 'react';
import { Modal, Button, Card } from 'antd';

function LogsDetailModal({ width = 900, onCancel, errorDetail = '' }) {
  return (
    <Modal
      visible
      title="日志详情"
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      width={width}
      bodyStyle={{
        background: '#f5f5f5',
        padding: '10px',
      }}
      footer={
        <div>
          <Button onClick={onCancel}>确定</Button>
        </div>
      }
    >
      <Card>
        <p>{errorDetail}</p>
      </Card>
    </Modal>
  );
}

export default LogsDetailModal;
