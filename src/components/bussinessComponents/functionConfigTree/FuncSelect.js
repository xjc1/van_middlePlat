import React from 'react';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import _ from 'lodash';

function FuncSelect({ value = '', onChange = EmptyFn, disabled, methodList = [] }) {
  return (
    <>
      <TSelect
        disabled={disabled}
        placeholder="请输入函数名称"
        showSearch
        allowClear
        value={value}
        optionFilterProp="children"
        onChange={onChange}
      >
        {_.map(methodList, ({ key, label, description }) => (
          <TSelect.Option key={key} title={description}>
            {label}
          </TSelect.Option>
        ))}
      </TSelect>
    </>
  );
}

export default FuncSelect;
