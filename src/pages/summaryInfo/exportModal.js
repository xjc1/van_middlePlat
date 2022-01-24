import React from 'react';
import { Form, Popover, Button, Divider } from 'antd';

function ExportModal({ formItem, onClose, onSubmit, children, title, visible, initialValues }) {
  const [form] = Form.useForm();
  return (
    <Popover
      title={title}
      visible={visible}
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={vals => {
              onSubmit(vals);
              form.resetFields();
            }}
          >
            {formItem}
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  onClose();
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
      trigger="click"
    >
      {children}
    </Popover>
  );
}

export default ExportModal;
