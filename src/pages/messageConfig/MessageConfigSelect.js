import { Select } from 'antd';
import { MESSAGECONFIGS } from '@/services/api';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

/**
 * @param {array} applicationScenario 过滤条件,用于筛选消息发送方式
 * */

function MessageConfigSelect({ type, applicationScenario, ...otherProps }) {
  const [selectOption, setSelectOption] = useState([]);
  const fetchOptions = () => {
    if (applicationScenario?.length === 0) {
      return setSelectOption([]);
    }
    return MESSAGECONFIGS.getAllMessageConfigUsingPOST({
      body: { type, applicationScenario },
    }).then((content = []) => {
      const selectOptions = content.map(({ code, name, applicationScenario: categories }) => ({
        key: code,
        value: code,
        label: name,
        sendMethod: categories,
      }));
      setSelectOption(selectOptions);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  return (
    <Select {...otherProps}>
      {_.map(selectOption, ({ key, label }) => (
        <Select.Option key={key} title={label}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
}

export default MessageConfigSelect;
