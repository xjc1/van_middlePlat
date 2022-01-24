import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Popover } from 'antd';
import { FormRules, TItem } from '@/components/tis_ui';

function EditDimensionPopover({ title, initialValues, onFinish, children }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      title={title}
      visible={visible}
      onVisibleChange={nextVisible => {
        setVisible(nextVisible);
        if (!nextVisible) {
          form.resetFields();
        }
      }}
      getPopupContainer={triggerNode => triggerNode.parentElement}
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
            <TItem name="label" label="标签" rules={[FormRules.required('必填')]}>
              <Input />
            </TItem>
            <TItem name="otherWords" label="不同说法">
              <Input placeholder="多个不同说法以|分割" />
            </TItem>
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

export default EditDimensionPopover;
