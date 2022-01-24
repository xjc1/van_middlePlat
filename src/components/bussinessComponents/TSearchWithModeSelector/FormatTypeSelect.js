import React from 'react';
import { EmptyFn } from '@/components/tis_ui';
import { Select } from 'antd';
import { warningFormat } from '@/utils/constantEnum';
import _ from 'lodash';

function FormatTypeSelect({ value, disabled, onChange = EmptyFn, ...others }) {
  return (
    <Select disabled={disabled} value={value} onChange={onChange} {...others}>
      {_.map(warningFormat, (v, k) => (
        <Select.Option key={k} value={v} label={warningFormat.$names[k]}>
          {warningFormat.$names[k]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default FormatTypeSelect;
