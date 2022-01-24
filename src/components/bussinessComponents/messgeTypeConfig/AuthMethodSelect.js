import { Select } from 'antd';
import { MESSAGECONFIGS } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { messageConfigType } from '@/utils/constantEnum';
import _ from 'lodash';

function AuthMethodSelect(props) {
  const [authSelectOption, setAuthSelectOption] = useState([]);
  const fetchOptions = () => {
    MESSAGECONFIGS.getAllMessageConfigUsingPOST({
      body: { type: messageConfigType.authMethod },
    }).then((content = []) => {
      const selectOptions = content.map(({ code, name }) => ({
        key: code,
        value: code,
        label: name,
      }));
      setAuthSelectOption(selectOptions);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  return (
    <Select {...props}>
      {_.map(authSelectOption, ({ key, label }) => (
        <Select.Option key={key} title={label}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
}

export default AuthMethodSelect;
