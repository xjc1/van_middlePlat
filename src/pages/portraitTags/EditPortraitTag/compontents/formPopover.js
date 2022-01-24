import { EmptyFn } from '@/components/tis_ui';
import { Popover, Button, Divider, Form } from 'antd';
import React from 'react';

function FormPopover(props) {
  const { children, onFinish = EmptyFn, onCancel = EmptyFn, initialValues, title } = props;
  const [form] = Form.useForm();

  return (
    <Popover
      title={title}
      visible
      content={
        <div style={{ width: 600 }}>
          <Form form={form} initialValues={initialValues}>
            {children}
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  onCancel();
                }}
              >
                取消
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                onClick={() => {
                  form.validateFields().then(values => {
                    onFinish(values);
                  });
                }}
              >
                确定
              </Button>
            </div>
          </Form>
        </div>
      }
      trigger="click"
    />
  );
}

export default FormPopover;
