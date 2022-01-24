import React, { useEffect } from 'react';
import _ from 'lodash';
import { Space, Button } from 'antd';
import { listMethods } from '@tong/datastructure';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TTable } from '@/components/tis_ui';
import { modulesContentType } from '@/utils/constantEnum';
import { defaultContentSort } from '../const';

function Index({ value = [], onChange, disabled }) {
  useEffect(() => {
    if (!value.length) {
      onChange(defaultContentSort);
    }
  }, []);
  const columns = [
    {
      title: '内容类型',
      dataIndex: 'contentType',
      render(code) {
        return modulesContentType.$v_names[code];
      },
    },
    {
      title: '操作',
      width: 200,
      render: (record, record2, index) => (
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
        </Space>
      ),
    },
  ];

  return (
    <TTable
      columns={columns}
      dataSource={_.map(value, code => {
        return {
          contentType: code,
          key: code,
        };
      })}
      rowKey="key"
    />
  );
}

export default Index;
