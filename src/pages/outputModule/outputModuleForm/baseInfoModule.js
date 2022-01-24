import { FormCard, FormRules, TItem } from '@/components/tis_ui';
import React from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

function baseInfoModule({ disabled, onChange }) {
  return (
    <FormCard title="模块基本信息" bordered={false}>
      <TItem name="object" label="对象类型" rules={[FormRules.required('对象类型必填')]}>
        <Select allowClear disabled={disabled} onChange={val => onChange(val)}>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v} label={appUserType.$names[k]}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="name" label="模块名称" rules={[FormRules.required('模块名称必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="code" label="模块编码" rules={[FormRules.required('模块编码必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="details" label="详情">
        <Input.TextArea rows={4} disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default baseInfoModule;
