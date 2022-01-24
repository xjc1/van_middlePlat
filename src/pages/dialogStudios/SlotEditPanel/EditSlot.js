import React from 'react';
import { Form, Input, Row } from 'antd';
import { EmptyFn, FormRules as Rules, TItem, TSwitch } from '@/components/tis_ui';

const { TextArea } = Input;

function EditSlot({ onForm = EmptyFn, initialValues = {} }) {
  const [formRef] = Form.useForm();
  onForm(formRef);
  return (
    <Form initialValues={initialValues} form={formRef}>
      <Row>
        <TItem name="name" label="节点名称" rules={[Rules.required('节点名称必填')]}>
          <Input />
        </TItem>
        <TItem name="isRequired" label="必填">
          <TSwitch />
        </TItem>
        <TItem name="regExp" label="正则表达式" labelCol={{ span: 24}} wrapperCol={{ span:24}}>
          <TextArea style={{ height: 120 }} />
        </TItem>
      </Row>
    </Form>
  );
}

export default EditSlot;
