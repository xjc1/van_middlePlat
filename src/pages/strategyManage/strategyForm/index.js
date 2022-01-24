import React from 'react';
import { FormCard, FormBtnGp } from '@/components/tis_ui';
import { Card, Form } from 'antd';
import router from '@/utils/tRouter';
import BaseInfo from './BaseInfo';

function StrategyForm({ initialValues, disabled = false }) {
  const [form] = Form.useForm();

  return (
    <>
      <Card
        bordered
        title={
          <span>
            <span>
              <span>查看策略</span>
            </span>
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
          <FormBtnGp disabled={disabled} />
        </Form>
      </Card>
    </>
  );
}

export default StrategyForm;
