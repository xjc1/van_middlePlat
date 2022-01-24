/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Form, Col, Card, Space, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function Group({ title, children, col = 24 }) {
  return (
    <Col span={col}>
      <Card title={title} style={{ marginBottom: 24 }} bordered={false}>
        {children}
      </Card>
    </Col>
  );
}

function getLabel(label, tip) {
  return label && tip ? (
    <Space>
      {label}
      <Tooltip title={tip}>
        <QuestionCircleOutlined />
      </Tooltip>
    </Space>
  ) : (
    label
  );
}

const visibilityStyle = {
  height: '0px',
  visibility: 'hidden',
};

function TItem({
  col = 24,
  expanded = false,
  hidden = false,
  children,
  label,
  tip,
  labelCol = { span: 6 },
  wrapperCol = { span: 16 },
  ...others
}) {
  return (
    <Col span={col} style={hidden && visibilityStyle}>
      <Form.Item
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        label={getLabel(label, tip)}
        {...others}
      >
        {children}
      </Form.Item>
    </Col>
  );
}

TItem.getLabel = getLabel;

export default TItem;
