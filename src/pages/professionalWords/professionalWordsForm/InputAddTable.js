import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { Button, Row, Col, Input, message } from 'antd';
import React, { useState } from 'react';

function InputAddTable({ value = [], onChange = EmptyFn, disabled }) {
  const [inputValue, setInputValue] = useState();
  const handleAdd = text => {
    if (value.includes(text)) {
      message.warning('不可重复添加');
      return;
    }
    setInputValue();
    onChange([...value, text]);
  };
  return (
    <Row>
      {!disabled && (
        <Col span={20}>
          <Input
            style={{ width: '80%', marginRight: 16 }}
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />
          <Button type="primary" onClick={() => handleAdd(inputValue)}>
            添加
          </Button>
        </Col>
      )}

      <Col span={24}>
        <TTable
          rowKey="key"
          bordered
          style={{ marginTop: 16 }}
          dataSource={value.map(name => ({ name, key: IDGenerator.next() }))}
          columns={[
            { title: '名称', dataIndex: 'name' },
            {
              title: '操作',
              width: 100,
              render: record => {
                return (
                  <OperateBar>
                    <OperateBar.Button
                      danger
                      disabled={disabled}
                      onClick={() => {
                        const newValue = value.filter(name => name !== record.name);
                        onChange(newValue);
                      }}
                    >
                      删除
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
}

export default InputAddTable;
