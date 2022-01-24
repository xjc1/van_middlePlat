import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { listMethods } from '@tong/datastructure';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TTable } from '@/components/tis_ui';
import { modulesContentType } from '@/utils/constantEnum';
import AddTopModal from './AddTopModal';

function Index({ value = [], onChange, disabled }) {
  const [showModal, setShowModal] = useState();
  const columns = [
    {
      title: '内容标题',
      dataIndex: 'name',
    },
    {
      title: '内容类型',
      dataIndex: 'contentType',
      render(code) {
        return modulesContentType.$v_names[code];
      },
    },
    {
      title: '区划',
      dataIndex: 'regions',
    },
    {
      title: '操作',
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            disabled={disabled}
            icon={<ArrowUpOutlined />}
            type="text"
            onClick={() => {
              const nextValue = listMethods.moveUp(value, index, { isLoop: true });
              onChange(nextValue);
            }}
          >
            上移
          </Button>
          <Button
            icon={<ArrowDownOutlined />}
            type="text"
            disabled={disabled}
            onClick={() => {
              const nextValue = listMethods.moveDown(value, index, { isLoop: true });
              onChange(nextValue);
            }}
          >
            下移
          </Button>
          <Button
            type="text"
            danger
            disabled={disabled}
            onClick={() => {
              const newValue = value.filter(({ id }) => id !== record.id);
              onChange(newValue);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        style={{ marginBottom: 16 }}
        disabled={disabled}
        type="primary"
        onClick={() => setShowModal({})}
      >
        添加
      </Button>
      <TTable columns={columns} dataSource={value} rowKey="id" />
      {showModal && (
        <AddTopModal
          title="添加置顶内容"
          onOk={item => {
            const newValue = [...value, ...item];
            onChange(newValue);
            setShowModal();
          }}
          onCancel={() => setShowModal()}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default Index;
