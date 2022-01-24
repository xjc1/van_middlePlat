import React, { useState } from 'react';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { useForm } from 'antd/es/form/Form';
import { Button, Divider, Form, Input, Popover } from 'antd';

function EditSource({ record = {}, onFinish = EmptyFn, children }) {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  return (
    <Popover
      title={record.id ? '编辑来源' : '添加来源'}
      visible={visible}
      onVisibleChange={setVisible}
      trigger="click"
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            initialValues={record}
            onFinish={val => {
              setVisible(false);
              form.resetFields();
              onFinish({ ...record, ...val });
            }}
          >
            <TItem name="name" label="来源类型" rules={[FormRules.required('必填')]}>
              <Input />
            </TItem>
            <TItem name="code" label="来源编码" rules={[FormRules.required('必填')]}>
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
