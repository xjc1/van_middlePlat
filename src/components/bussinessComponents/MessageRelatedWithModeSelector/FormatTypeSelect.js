import React, { useEffect } from 'react';
import { EmptyFn } from '@/components/tis_ui';
import { Select } from 'antd';
import { warningFormat } from '@/utils/constantEnum';
import _ from 'lodash';

function FormatTypeSelect({
  value = warningFormat.default,
  disabled,
  onChange = EmptyFn,
  onFormatChange = EmptyFn,
  ...others
}) {
  useEffect(() => {
    onFormatChange(value);
  }, [value]);
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
