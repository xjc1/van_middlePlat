import React, { useState } from 'react';
import { Button, Divider, Form, Popover } from 'antd';

function EditPopover({
  title,
  initialValues,
  onFinish,
  children,
  inputItem,
  disabled = false,
  placement = 'right',
}) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      title={title}
      visible={visible}
      onVisibleChange={nextVisible => {
        if (disabled) return;
        setVisible(nextVisible);
        if (!nextVisible) {
          form.resetFields();
        }
      }}
      placement={placement}
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={vals => {
              onFinish(vals, form);
              setVisible(false);
            }}
          >
            {inputItem}
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  form.resetFields();
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
      trigger="click"
    >
      {children}
    </Popover>
  );
}

export default EditPopover;
