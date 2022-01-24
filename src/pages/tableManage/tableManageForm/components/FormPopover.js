import { EmptyFn } from '@/components/tis_ui';
import { Popover, Button, Divider, Form } from 'antd';
import React, { useState } from 'react';

function FormPopover(props) {
  const {
    onFinish = EmptyFn,
    initialValues = {},
    title,
    children,
    render = EmptyFn,
    placement = 'left',
  } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  function renderItem() {
    return render(setVisible);
  }

  function onCancel() {
    setVisible(false);
    form.resetFields();
  }

  return (
    <Popover
      title={title}
      visible={visible}
      placement={placement}
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
                    onFinish(values, initialValues.key);
                    onCancel();
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
    >
      {renderItem()}
    </Popover>
  );
}

export default FormPopover;
