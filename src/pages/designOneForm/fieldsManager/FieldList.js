import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { EmptyFn } from '@/components/tis_ui';
import Styles from './index.less';

function FieldList({ list = [], selectedId, onSelectItem = EmptyFn }) {
  const [columns] = useState([
    {
      title: '字段id',
      dataIndex: 'name',
    },
    {
      title: '字段名',
      dataIndex: 'displayName',
    },
    {
      title: '事项id',
      dataIndex: 'matterId',
    },
    {
      title: '原类型',
      dataIndex: 'originalType',
    },
    {
      title: '字段类型',
      dataIndex: 'field',
    },
    {
      title: '操作',
      width: '10%',
      render(text, record) {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                onSelectItem(record);
              }}
            >
              编辑 <RightOutlined />
            </Button>
          </>
        );
      },
    },
  ]);

  return (
    <Table
      bordered
      title={() => {
        return (
          list.length > 0 && (
            <span style={{ color: '#1890ff' }}>{`${list[0] && list[0].sceneName} [${list[0] &&
              list[0].sceneId}]`}</span>
          )
        );
      }}
      columns={columns}
      rowClassName={({ id }) => {
        return id === selectedId && Styles.fieldListSelectedItem;
      }}
      rowKey="id"
      size="small"
      dataSource={list}
    />
  );
}

export default FieldList;
