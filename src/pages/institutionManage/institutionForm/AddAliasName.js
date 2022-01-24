import React, { useState } from 'react';
import { Input, Table, Button, message } from 'antd';
import emptyFn from '@/utils/EmptyFn';
import { TButton } from '@/components/tis_ui';

function AddAliasName({ value = [], onChange = emptyFn, disabled }) {
  const [inputValue, setInputValue] = useState(null);
  const tableData = value.map(it => ({ name: it }));
  const columns = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text, record, index) => {
        return (
          <div style={{ display: disabled ? 'none' : 'block' }}>
            <TButton.Button
              size="small"
              type="link"
              danger
              confirmText="您确认要删除吗?"
              onClick={() => {
                const newValue = value.filter((item, ind) => ind !== index);
                onChange(newValue);
              }}
            >
              删除
            </TButton.Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Input
          disabled={disabled}
          value={inputValue}
          onChange={e => setInputValue(e.target.value.trim())}
        />
        <Button
          disabled={!inputValue}
          style={{ marginLeft: 16 }}
          type="primary"
          onClick={() => {
            if (value.indexOf(inputValue) > -1) {
              message.warning('名称已存在');
              return;
            }
            const newValue = [...value, inputValue];
            setInputValue(null);
            onChange(newValue);
          }}
        >
          添加
        </Button>
      </div>

      <Table
        pagination={{ defaultPageSize: 4 }}
        size="small"
        rowKey="name"
        bordered
        style={{ marginTop: 10 }}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
}

export default AddAliasName;
