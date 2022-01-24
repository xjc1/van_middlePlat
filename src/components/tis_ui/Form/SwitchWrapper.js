/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Checkbox } from 'antd';
import EmptyFn from '../utils/EmptyFn';

function SwitchWrapper({
  children,
  switchTitle,
  isChecked = false,
  onCheck = EmptyFn,
  disableCheck = false,
  preText,
  afterText,
  value,
  onChange,
}) {
  return (
    <span>
      <Checkbox
        style={{ paddingRight: 20 }}
        checked={isChecked}
        disabled={disableCheck}
        onChange={({ target: { checked } }) => {
          onCheck(checked);
        }}
      >
        {switchTitle}
      </Checkbox>
      {isChecked && (
        <>
          <span style={{ paddingRight: 10 }}>{preText}</span>
          {children(value, onChange)}
          <span style={{ paddingLeft: 10 }}>{afterText}</span>
        </>
      )}
    </span>
  );
}

export default SwitchWrapper;
