import React, { useState, useEffect } from 'react';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { Button, Divider, Form, Input, Popover } from 'antd';

function EditSource({ record = {}, onFinish = EmptyFn, children }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(record);
    }
  }, [visible]);
  return (
    <Popover
      title={record.id ? '编辑认证方式' : '添加认证方式'}
      visible={visible}
      onVisibleChange={setVisible}
      trigger="click"
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            onFinish={val => {
              setVisible(false);
              form.resetFields();
              onFinish({ ...record, ...val });
            }}
          >
            <TItem name="name" label="认证方式" rules={[FormRules.required('必填')]}>
              <Input />
            </TItem>
            <TItem name="code" label="认证编码" rules={[FormRules.required('必填')]}>
              <Input disabled={record.id} />
            </TItem>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  setVisible(false);
                }}
              >
                取消
              </Button>
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form>
        </div>
      }
    >
      {children}
    </Popover>
  );
}

export default EditSource;
