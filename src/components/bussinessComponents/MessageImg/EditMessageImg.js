import React, { useState, useEffect } from 'react';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { UploadImageUseFs } from '@/components/bussinessComponents';
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
      title={record.id ? '编辑消息配图' : '添加消息配图'}
      visible={visible}
      onVisibleChange={() => setVisible(true)}
      trigger="click"
      destroyTooltipOnHide={{ keepParent: false }}
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            initialValues={record}
            onFinish={val => {
              form.resetFields();
              setVisible(false);
              onFinish({ ...record, ...val });
            }}
          >
            <TItem name="name" label="图片名称" rules={[FormRules.required('必填')]}>
              <Input />
            </TItem>
            <TItem name="picture" label="缩略图" rules={[FormRules.required('必填')]}>
              <UploadImageUseFs />
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
    >
      {children}
    </Popover>
  );
}

export default EditSource;
