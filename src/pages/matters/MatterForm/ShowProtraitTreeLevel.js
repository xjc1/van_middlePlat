import React from 'react';
import { Row, Col, Button, Table, Typography, Tooltip, message } from 'antd';
import EmptyFn from '@/utils/EmptyFn';

const defaultPageSize = 4;

function ShowProtraitTreeLevel({ value = [], addToMatter = EmptyFn, disabled }) {
  function handleAdd() {
    if (!value.length) {
      message.error('不允许添加空值');
      return;
    }
    addToMatter(value);
  }

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        {!disabled && (
          <>
            <Col>
              <Button type="primary" disabled={disabled || !value.length} onClick={handleAdd}>
                统一添加到事项
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Table
        bordered
        size="small"
        pagination={{
          defaultPageSize,
        }}
        dataSource={value}
        columns={[
          {
            title: '三级分类名称',
            dataIndex: 'label',
            width: '50%',
            render: label => (
              <Typography.Paragraph
                ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}
              >
                <Tooltip title={label}>{label}</Tooltip>
              </Typography.Paragraph>
            ),
          },
          {
            title: '编码',
            dataIndex: 'code',
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            render: record => (
              <a
                style={{ display: disabled ? 'none' : 'block' }}
                onClick={() => addToMatter([record])}
              >
                添加到事项
              </a>
            ),
          },
        ]}
      />
    </>
  );
}

export default ShowProtraitTreeLevel;
