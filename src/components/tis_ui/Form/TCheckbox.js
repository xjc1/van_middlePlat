/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Checkbox } from 'antd';

function TCheckbox({ value, onChange, disabled }) {
  return (
    <Checkbox
      checked={value}
      disabled={disabled}
      onChange={({ target: { checked } }) => {
        onChange(checked);
      }}
    />
  );
}

export default TCheckbox;
