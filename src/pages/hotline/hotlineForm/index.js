import React from 'react';
import { FormCard, FormBtnGp } from '@/components/tis_ui';
import { Card, Form, notification } from 'antd';
import router from '@/utils/tRouter';
import { CORE, HOTLINES } from '@/services/api';
import BaseInfo from './BaseInfo';

function ProfessionalWordsForm(props) {
  const { initialValues = {}, disabled = false, title = '新增热线电话' } = props;
  const [form] = Form.useForm();

  async function createHotline(formatData) {
    return CORE.saveHotlineUsingPOST({ body: formatData })
      .then(() => {
        notification.success({
          message: '新增成功',
        });
        router.push('hotline');
      })
      .catch(e => {
        console.log('e => ', e);
        notification.error({
          message: '新增失败',
        });
      });
  }

  async function updateHotline(formatData) {
    return HOTLINES.updateHotlineUsingPOST({ body: formatData })
      .then(() => {
        notification.success({
          message: '更新成功',
        });
      })
      .catch(e => {
        console.log('e => ', e);
        notification.error({
          message: '更新失败',
        });
      });
  }

  async function handleSubmit(values) {
    if (initialValues && initialValues.id) {
      await updateHotline({
        ...initialValues,
        ...values,
      });
    } else {
      await createHotline(values);
    }
  }

  function validateForm() {
    form
      .validateFields()
      .then(values => {
        handleSubmit(values);
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          notification.error({
            message: '请检查所有必填项是否填完',
          });
        }
      });
  }

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
          <FormBtnGp onOk={validateForm} disabled={disabled} />
        </Form>
      </Card>
    </>
  );
}

export default ProfessionalWordsForm;
