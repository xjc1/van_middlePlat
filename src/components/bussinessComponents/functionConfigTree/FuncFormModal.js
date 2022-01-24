import React, { useState } from 'react';
import { EmptyFn, ModalForm, TButton, TItem, FormRules } from '@/components/tis_ui';
import _ from 'lodash';
import { Input } from 'antd';
import FuncSelect from './FuncSelect';
import FuncSchemaInput from '../funcSchemaInput';

function FuncFormModal({
  functionId,
  values,
  initValue,
  onFinish = EmptyFn,
  methodList,
  handleCancel,
  children,
  isRequire = true,
}) {
  let formRef = null;
  const selectValue = _.find(methodList, { key: functionId }) || {};
  const [selectedFunc, setSelectedFunc] = useState(selectValue);
  return (
    <ModalForm
      title="函数配置"
      visible
      initialValues={{ ...initValue, functionId, values }}
      onForm={form => {
        formRef = form;
      }}
      handleCancel={handleCancel}
      footer={
        <>
          <TButton.Button onClick={handleCancel}>取消</TButton.Button>
          <TButton.Button
            type="primary"
            onClick={() => {
              formRef.current.validateFields().then(vals => {
                onFinish(vals);
              });
            }}
          >
            确定
          </TButton.Button>
        </>
      }
    >
      <TItem name="functionId" label="函数" rules={[FormRules.required('必填')]}>
        <FuncSelect
          methodList={methodList}
          onChange={val => {
            // 函数改变清除之前输入的值
            formRef.current.setFields([{ name: 'values', value: undefined }]);
            const selected = _.find(methodList, { key: val }) || {};
            setSelectedFunc(selected);
          }}
        />
      </TItem>
      <FuncSchemaInput isRequire={isRequire} schema={selectedFunc.schema} />
      <TItem label="判断逻辑描述">
        <Input.TextArea value={selectedFunc.description} disabled autoSize />
      </TItem>
      {children}
    </ModalForm>
  );
}

export default FuncFormModal;
