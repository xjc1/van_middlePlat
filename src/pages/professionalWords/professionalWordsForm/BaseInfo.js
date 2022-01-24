import React from 'react';
import { Input, Select } from 'antd';
import { FormRules, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { professionalSourceType, commonYesNo } from '@/utils/constantEnum';
import _ from 'lodash';
import InputAddTable from './InputAddTable';

function BaseInfo({ disabled = false }) {
  return (
    <>
      <TItem name="name" label="专业词名称" rules={[FormRules.required('必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="synonym" label="同义词/近义词">
        <InputAddTable disabled={disabled} />
      </TItem>
      <TItem name="homophone" label="同音词">
        <InputAddTable disabled={disabled} />
      </TItem>
      <TItem name="wordFeature" label="词性">
        <DictSelect
          disabled={disabled}
          dict="WF1000"
          dictType="tree"
          allowClear
          placeholder="请选择词性"
        />
      </TItem>
      <TItem name="sourceType" label="来源">
        <Select disabled={disabled} mode="multiple" allowClear>
          {_.map(professionalSourceType, (v, k) => (
            <Select.Option key={k} value={v}>
              {professionalSourceType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="isAmend" label="是否参与纠错" rules={[FormRules.required('必填')]}>
        <Select disabled={disabled}>
          {_.map(commonYesNo, (v, k) => (
            <Select.Option key={k} value={v}>
              {commonYesNo.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
    </>
  );
}

export default BaseInfo;
