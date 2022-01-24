import React from 'react';
import ReuseInfo from '@/pages/standardFieldStore/fieldStoreForm/ReuseInfo';
import { Form, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { EmptyFn } from '@/components/tis_ui';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function ShareFormConfigModal({ initialValues = {}, onOk = EmptyFn, ...others }) {
  const [formRef] = useForm();

  function handleSubmit() {
    formRef.validateFields().then(onOk);
  }

  return (
    <Modal title="共享源" visible width="65%" onOk={handleSubmit} {...others}>
      <Form form={formRef} initialValues={initialValues}>
        <ReuseInfo formRef={formRef} layout={layout} />
      </Form>
    </Modal>
  );
}

export default ShareFormConfigModal;
