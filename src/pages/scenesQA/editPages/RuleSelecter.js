import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { TSelect } from '@/components/tis_ui';
import { ONEFORM } from '@/services/api';

function RuleSelecter(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    ONEFORM.findRulesUsingGET({ params: { size: 500 } }).then(({ items }) => {
      console.info(items);
      setOptions(_.map(items, ({ name, uuid }) => ({ value: uuid, label: name })));
    });
  }, []);

  return (
    <TSelect {...props}>
      {_.map(options, ({ value, label }) => (
        <TSelect.Option key={value} value={value} label={label}>
          {label}
        </TSelect.Option>
      ))}
    </TSelect>
  );
}

export default RuleSelecter;
