import { Form, Card, Spin, notification } from 'antd';
import React from 'react';
import { FormBtnGp } from '@/components/tis_ui';
import _ from "lodash";
import BaseInfo from './BaseInfo';
import DetailInfo from './DetailInfo';
import RelateInfo from './RelateInfo';
import { tableManageTableType } from '@/utils/constantEnum';

function Index({ title, onFinish, initialValues={}, isNeedCheck, setIsNeedCheck, disabled = false }) {
  const nextInitialValues = {
    ...initialValues,
    interfaceConfig: _.get(initialValues,'type') === tableManageTableType.INTERFACE ?
      _.get(initialValues,'interfaceConfig.url'): '',
  }
  const [form] = Form.useForm();
  const onSubmit = () => {
    form.validateFields().then(values => {
      const { type, interfaceConfig:url } = values;
      if (type === tableManageTableType.TIS && isNeedCheck) {
        notification.warning({ message: 'TIS表单类型修改英文名后请点击检测后再提交!' });
        return;
      }
      const nextValue = {
        ...values,
        interfaceConfig:
          type === tableManageTableType.INTERFACE ? { method: 'GET', url } : undefined,
      };
      onFinish(nextValue);
    });
  };
  return (
    <div>
      {initialValues ? (
        <Card title={title}>
          <Form form={form} initialValues={nextInitialValues}>
            <BaseInfo
              disabled={disabled}
              form={form}
              isNeedCheck={isNeedCheck}
              setIsNeedCheck={setIsNeedCheck}
            />
            <DetailInfo disabled={disabled} form={form} setIsNeedCheck={setIsNeedCheck} />
            <RelateInfo disabled={disabled} />
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
