// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Input, Radio } from 'antd';
import { ModalForm, EmptyFn, TItem, FormRules, TButton } from '@/components/tis_ui';
import TSearchSelector from '@/components/bussinessComponents/Dict/TSearchSelector';

const operationType = {
  add: 'add',
  relate: 'relate',
};

function FormModal({
  title = '添加条件',
  tip = {},
  handleCancel = EmptyFn,
  onFinish = EmptyFn,
  objectType,
}) {
  let form = null;
  const [type, setType] = useState(operationType.add);
  const {
    source: { text, id, startMeta, endMeta },
  } = tip;
  const { textOffset } = startMeta;
  const initialValues = { content: text };
  const relateCondition = () => {
    form.current.validateFields().then(values => {
      const { condition } = values;
      const { value: conditionId, label: conditionName } = condition;
      const relation = {
        id,
        conditionInfo: {
          conditionId,
          conditionName,
          content: text,
          startPosition: textOffset,
          startMeta,
          endMeta,
        },
      };
      onFinish(relation);
    });
  };
  const addCondition = () => {
    form.current.validateFields().then(values => {
      const { conditionName } = values;
      onFinish({
        id,
        conditionInfo: {
          conditionName,
          content: text,
          startPosition: textOffset,
          startMeta,
          endMeta,
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
      handleCancel={handleCancel}
      width="50%"
      footer={
        <>
          <TButton.Button onClick={handleCancel}>取消</TButton.Button>
          <TButton.Button
            type="primary"
            onClick={() => {
              if (type === operationType.add) {
                addCondition();
                return;
              }
              relateCondition();
            }}
          >
            确定
          </TButton.Button>
        </>
      }
    >
      <Radio.Group
        value={type}
        buttonStyle="solid"
        onChange={({ target }) => {
          setType(target.value);
        }}
      >
        <Radio.Button value={operationType.add}>新增</Radio.Button>
        <Radio.Button value={operationType.relate}>关联</Radio.Button>
      </Radio.Group>
      <TItem name="content" label="原文" rules={[FormRules.required('必填')]}>
        <Input disabled />
      </TItem>
      {type === operationType.add && (
        <TItem name="conditionName" label="条件名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
      )}
      {type === operationType.relate && (
        <TItem name="condition" label="关联条件" rules={[FormRules.required('必填')]}>
          <TSearchSelector objectType={objectType} type="mini_condition" mode="single" />
        </TItem>
      )}
    </ModalForm>
  );
}

export default FormModal;
