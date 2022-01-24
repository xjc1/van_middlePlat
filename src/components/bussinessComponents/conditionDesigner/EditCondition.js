// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Input } from 'antd';
import _ from 'lodash';
import { ModalForm, EmptyFn, TItem, FormRules, TButton } from '@/components/tis_ui';
import TSearchSelector from '../Dict/TSearchSelector';

function EditCondition({
  title = '编辑条件',
  conditionItem = {},
  onCancel = EmptyFn,
  onFinish = EmptyFn,
  objectType,
}) {
  let form = null;
  const { conditionInfo = {} } = conditionItem;
  const { content, conditionId, conditionName } = conditionInfo;
  const initialValues = { content, condition: _.compact([conditionId]), conditionName };
  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    form.current.validateFields().then(({ condition = {}, conditionName: name }) => {
      const { label, value } = condition;
      onFinish({
        ...conditionItem,
        conditionInfo: {
          ...conditionInfo,
          content,
          conditionId: value,
          conditionName: conditionId ? label : name,
        },
      });
    });
  };

  return (
    <ModalForm
      onForm={formRef => {
        form = formRef;
      }}
      initialValues={initialValues}
      visible
      title={title}
      maskClosable={false}
      handleCancel={onCancel}
      width="50%"
      footer={
        <>
          <TButton.Button onClick={onCancel}>取消</TButton.Button>
          <TButton.Button type="primary" onClick={onSubmit}>
            确定
          </TButton.Button>
        </>
      }
    >
      <TItem name="content" label="原文" rules={[FormRules.required('必填')]}>
        <Input disabled />
      </TItem>
      {conditionId ? (
        <TItem name="condition" label="关联条件" rules={[FormRules.required('必填')]}>
          <TSearchSelector mode="single" type="mini_condition" objectType={objectType} />
        </TItem>
      ) : (
        <TItem name="conditionName" label="条件名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
      )}
    </ModalForm>
  );
}

export default EditCondition;
