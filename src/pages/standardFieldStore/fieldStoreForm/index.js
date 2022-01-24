import React from 'react';
import { Button, Card, Form, message } from 'antd';
import { FormBtnGp, FormCard } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import { CORE, STANDARDFIELDS } from '@/services/api';
import BasicInfo from './BasicInfo';
import ReuseInfo from './ReuseInfo';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function FieldsForm({ title = '新增标准字段', fieldInfo = {}, disabled = false }) {
  const [formRef] = Form.useForm();

  function createStandardField(newInfo = {}) {
    CORE.addStandardFieldUsingPOST({ body: newInfo })
      .then(() => {
        message.success('新增成功');
        router.goBack();
      })
      .catch(e => {
        message.error(`新增失败，${e.msg}`);
      });
  }

  function updateStandardField(newInfo = {}) {
    STANDARDFIELDS.updateStandardFieldUsingPOST({ body: newInfo })
      .then(() => {
        message.success('修改成功');
      })
      .catch(e => {
        message.error(`修改失败，${e.msg}`);
      });
  }

  function handleSubmit() {
    formRef.validateFields().then(val => {
      if (fieldInfo.id) {
        updateStandardField({ ...fieldInfo, ...val });
      } else {
        createStandardField(val);
      }
    });
  }

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={router.goBack}>
          返回列表
        </Button>
      }
    >
      <Form form={formRef} initialValues={fieldInfo}>
        <FormCard title="基本信息">
          <BasicInfo initDataType={fieldInfo.dataType} disabled={disabled} layout={layout} />
        </FormCard>
        <FormCard title="复用信息">
          <ReuseInfo formRef={formRef} disabled={disabled} layout={layout} />
        </FormCard>
        <FormBtnGp onOk={handleSubmit} disabled={disabled} />
      </Form>
    </Card>
  );
}

export default FieldsForm;
