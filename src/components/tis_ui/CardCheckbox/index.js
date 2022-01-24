/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Card, Checkbox } from 'antd';

const Index = props => {
  const {
    title = '卡片复选框',
    checkAllTitle = '全选',
    options = [],
    value = [],
    onChange,
    ...others
  } = props;
  const [localValue, setLocalValue] = useState(value);
  const [allCheckState, setAllCheckState] = useState(options.length === value.length);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const handleCheckAll = e => {
    const { checked } = e.target;
    const checkedList = checked ? options.map(item => item.value || item) : [];
    setLocalValue(checkedList);
    setAllCheckState(checked);
    triggerChange(checkedList);
  };

  const handleCheckOne = checkedList => {
    setLocalValue(checkedList);
    const isAllChecked = checkedList.length === options.length;
    if (isAllChecked !== allCheckState) {
      setAllCheckState(isAllChecked);
    }
    triggerChange(checkedList);
  };

  return (
    <Card
      title={title}
      extra={
        <Checkbox checked={allCheckState} onChange={handleCheckAll}>
          {checkAllTitle}
        </Checkbox>
      }
      {...others}
    >
      <Checkbox.Group options={options} value={localValue} onChange={handleCheckOne} />
    </Card>
  );
};

export default Index;
