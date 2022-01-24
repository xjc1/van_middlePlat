import { EmptyFn, FormCard, FormRules, TItem } from '@/components/tis_ui';
import React from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

function BaseInfo({ disabled, setIsNeedCheck = EmptyFn, isNeedCheck }) {
  function handleNameChanged() {
    if (!isNeedCheck) {
      setIsNeedCheck(true);
    }
  }
  return (
    <FormCard title="库表基本信息" bordered={false}>
      <TItem name="objectType" label="对象类型" rules={[FormRules.required('对象类型必填')]}>
        <Select allowClear disabled={disabled}>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v} label={appUserType.$names[k]}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="enName" label="英文名" rules={[FormRules.required('英文名必填')]}>
        <Input disabled={disabled} onChange={() => handleNameChanged()} />
      </TItem>
      <TItem name="cnName" label="中文名">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="source" label="来源">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="code" label="编码">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="detail" label="详情">
        <Input.TextArea rows={4} disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default BaseInfo;
