import React from 'react';
import { FormCard, FormBtnGp } from '@/components/tis_ui';
import { Card, Form, message } from 'antd';
import router from '@/utils/tRouter';
import { PROFESSIONALWORD } from '@/services/api';
import BaseInfo from './BaseInfo';

function ProfessionalWordsForm({ initialValues, disabled = false, title = '新增专业词' }) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const { id } = initialValues;
    const formData = await form.validateFields();
    if (id) {
      await PROFESSIONALWORD.updateProfessionalWordUsingPOST({ body: { ...formData, id } });
      message.success('更新成功');
    } else {
      await PROFESSIONALWORD.addProfessionalWordUsingPOST({ body: formData });
      message.success('新增成功');
      router.push('professionalWords');
    }
  };

  return (
    <>
      <Card
        bordered
        title={
          <span>
            <span>{title}</span>
            <a
              style={{ float: 'right' }}
              onClick={() => {
                router.goBack();
              }}
            >
              返回列表
            </a>
          </span>
        }
      >
        <Form form={form} initialValues={initialValues}>
          <FormCard title="基本信息" bordered={false}>
            <BaseInfo disabled={disabled} />
          </FormCard>
          <FormBtnGp onOk={handleSubmit} disabled={disabled} />
        </Form>
      </Card>
    </>
  );
}

export default ProfessionalWordsForm;
