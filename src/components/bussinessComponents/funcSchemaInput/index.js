import React from 'react';
import { Input, InputNumber } from 'antd';
import { TItem, FormRules, ArrayTextArea } from '@/components/tis_ui';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const keyGenerator = new IDGenerator('func_form');

function FuncSchemaInput({
  isRequire = true,
  schema = [],
  parentName = [],
  formLayout = {},
  disabled,
}) {
  return schema
    .map(item => ({ ...item, key: keyGenerator.next() }))
    .map(({ name, type, remark, key }, index) => {
      switch (type) {
        case 'integer': {
          return (
            <TItem
              {...formLayout}
              name={[...parentName, 'values', index]}
              rules={isRequire && [FormRules.required('必填')]}
              label={`${name}(参数)`}
              tip={remark}
              key={key}
            >
              <InputNumber disabled={disabled} />
            </TItem>
          );
        }

        case 'string': {
          return (
            <TItem
              {...formLayout}
              name={[...parentName, 'values', index]}
              rules={isRequire && [FormRules.required('必填')]}
              label={`${name}(参数)`}
              tip={remark}
              key={key}
            >
              <Input />
            </TItem>
          );
        }

        case 'array': {
          return (
            <TItem
              {...formLayout}
              name={[...parentName, 'values', index]}
              rules={isRequire && [FormRules.required('必填')]}
              label={`${name}(参数)`}
              tip={remark}
              key={key}
            >
              <ArrayTextArea placeholder='多个输入请以","分隔' />
            </TItem>
          );
        }

        default:
          return (
            <TItem
              {...formLayout}
              name={[...parentName, 'values', index]}
              rules={isRequire && [FormRules.required('必填')]}
              label={`${name}(参数)`}
              tip={remark}
              key={key}
            >
              <Input />
            </TItem>
          );
      }
    });
}

export default FuncSchemaInput;
