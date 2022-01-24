import React from 'react';
import { Form, Input } from 'antd';
import { EmptyFn } from '@/components/tis_ui';

function QueryBar({ onQuery = EmptyFn }) {
  const [form] = Form.useForm();

  return (
    <Form form={form} name="validateName" size="large" onFinish={onQuery}>
      <Form.Item name="username" wrapperCol={{ span: 24 }}>
        <Input allowClear placeholder="校验器名称" />
      </Form.Item>
    </Form>
  );
}

export default QueryBar;
