import React from 'react';
import { ConditionDesigner } from '@/components/bussinessComponents';
import { Form } from 'antd';
import { TItem, FormBtnGp } from '@/components/tis_ui';

function ConditionDesignerPage() {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(res => {
      console.log('res:', res);
    });
  };
  return (
    <div
      style={{
        marginTop: 200,
        padding: '0 160px',
      }}
    >
      <Form form={form}>
        <TItem name="condition" label="条件管理">
          <ConditionDesigner />
        </TItem>
      </Form>
      <FormBtnGp onOk={handleSubmit} />
    </div>
  );
}

export default ConditionDesignerPage;
