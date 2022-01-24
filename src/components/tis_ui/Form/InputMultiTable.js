/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, Col, Row, Input, message } from 'antd';
import _ from 'lodash';
import TTable from '../TTable';
import EmptyFn from '../utils/EmptyFn';

function InputMultiTable({
  value = [],
  onChange = EmptyFn,
  placeholder = '请输入',
  okText = '确定',
  defaultPageSize = 5,
  title = '输入内容',
  showHeader = true,
  disabled = false,
  emptyText = '已添加内容',
  loading = false,
  editAble = true,
  deleteAble = true,
}) {
  const [input, setInput] = useState(null);

  function handleOk() {
    if (!input) {
      message.error('不允许添加空值');
      return;
    }

    setInput(null);
    onChange([...value, { key: value.length, value: input }]);
  }

  return (
    <Row>
      {!disabled && editAble && (
        <>
          <Col span={20}>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={disabled}
              placeholder={placeholder}
            />
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={handleOk}>
              {okText}
            </Button>
          </Col>
        </>
      )}
      <Col span={24}>
        <TTable
          size="small"
          bordered
          showHeader={showHeader}
          locale={{
            emptyText,
          }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title,
              dataIndex: 'value',
              ellipsis: true,
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) =>
                !disabled && (
                  <span>
                    <Button
                      type="link"
                      disabled={!deleteAble}
                      onClick={() => {
                        onChange(_.filter(value, ({ key }) => key !== record.key));
                      }}
                    >
                      删除
                    </Button>
                  </span>
                ),
            },
          ]}
          dataSource={value}
          rowKey="key"
          loading={loading}
          style={{ margin: '10px 0' }}
        />
      </Col>
    </Row>
  );
}

export default InputMultiTable;
