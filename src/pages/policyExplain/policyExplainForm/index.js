import React from 'react';
import { FormCard, FormBtnGp } from '@/components/tis_ui';
import { Card, Form, notification } from 'antd';
import router from '@/utils/tRouter';
import { CORE, POLICYINTERPRETATIONS } from '@/services/api';
import BaseInfo from './BaseInfo';

const handleRelation = data => {
  const result = [];
  if (data && data.length > 0) {
    data.forEach(item => {
      result.push({ id: item.key });
    });
  }
  return result;
};

function ProfessionalWordsForm(props) {
  const { initialValues = {}, disabled = false, title = '新增解读' } = props;
  const [form] = Form.useForm();

  async function createExplain(formatData) {
    return CORE.savePolicyInterpretationUsingPOST({ body: formatData })
      .then(() => {
        notification.success({
          message: '新增成功',
        });
        router.push('policyExplain');
      })
      .catch(e => {
        console.log('e => ', e);
        notification.error({
          message: '新增失败',
        });
      });
  }

  async function updateExplain(formatData) {
    return POLICYINTERPRETATIONS.updatePolicyInterpretationUsingPOST({ body: formatData })
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
    const formatData = {
      ...values,
      relatedPolicies: handleRelation(values.relatedPolicies),
      relatedMatters: handleRelation(values.relatedMatters),
      relatedServices: handleRelation(values.relatedServices),
      relatedProjects: handleRelation(values.relatedProjects),
      relatedArticles: handleRelation(values.relatedArticles),
    };
    if (initialValues && initialValues.id) {
      await updateExplain({
        ...initialValues,
        ...formatData,
      });
    } else {
      await createExplain(formatData);
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
