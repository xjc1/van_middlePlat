import React, { useState } from 'react';
import { Button, Divider, Form, Input, Popover } from 'antd';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { DisplayPosition } from '@/components/bussinessComponents';

function EditDisplayPosition({ record = {}, disabled, onFinish = EmptyFn, children }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    positionInfo: record.positionId && {
      key: record.positionId,
      label: record.positionName,
    },
    displayName: record.displayName,
  };

  return (
    <Popover
      title={JSON.stringify(record) !== '{}' ? '编辑输出' : '添加输出'}
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={val => {
              const { positionInfo, displayName } = val;
              onFinish({
                ...record,
                positionId: positionInfo.key,
                positionName: positionInfo.label,
                displayName,
              });
              form.resetFields();
              setVisible(false);
            }}
          >
            <TItem name="positionInfo" label="输出模块" rules={[FormRules.required('必填')]}>
              <DisplayPosition mode="" prefetch disabled={disabled} />
            </TItem>
            <TItem name="displayName" label="输出名称">
              <Input />
            </TItem>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
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

export default EditDisplayPosition;
