import { Form, Card, Spin } from 'antd';
import React from 'react';
import { FormBtnGp, EmptyFn } from '@/components/tis_ui';
import MaterialInfo from './MaterialInfo';
import MaterialAttribute from './MaterialAttribute';

function Index({ title, onFinish = EmptyFn, initialValues, disabled = false }) {
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then(values => {
      onFinish(values);
    });
  };
  return (
    <div>
      {initialValues ? (
        <Card title={title}>
          <Form form={form} initialValues={initialValues}>
            <MaterialInfo disabled={disabled} initialValues={initialValues} />
            <MaterialAttribute disabled={disabled} standardMaterialId={initialValues.id} />
            <FormBtnGp onOk={onSubmit} disabled={disabled} />
          </Form>
        </Card>
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </div>
  );
}
export default Index;
