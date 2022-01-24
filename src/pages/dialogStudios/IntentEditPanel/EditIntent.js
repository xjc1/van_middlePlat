import React from 'react';
import { Form, Input, Row } from 'antd';
import { EmptyFn, FormRules as Rules, TItem } from '@/components/tis_ui';
import UserAsk from '@/pages/dialogStudios/EditorItemPanel/UserInputSettingPanel/userAsk';
import SlotConfig from './slotConfig';

function EditIntent({ onForm = EmptyFn, initialValues = {} }) {
  const [formRef] = Form.useForm();

  onForm(formRef);
  return (
    <Form initialValues={initialValues} form={formRef}>
      <Row>
        <TItem name="name" label="意图名称" rules={[Rules.required('意图名称必填')]}>
          <Input />
        </TItem>
        <TItem name="similarList" colon={false} wrapperCol={{ span: 24 }}>
          <UserAsk />
        </TItem>
        <TItem name="slots" colon={false} wrapperCol={{ span: 24 }}>
          <SlotConfig />
        </TItem>
      </Row>
    </Form>
  );
}

export default EditIntent;
