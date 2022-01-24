import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import { CONDITION } from '@/services/api';

function ConditionSelector(props) {
  const {
    object,
    type,
    size = 100,
    onChange = EmptyFn,
    changeLogicDesc = EmptyFn,
    value = {},
    ...others
  } = props;
  const { run: handleWordSearchDebounce } = useDebounceFn(fetchList, { wait: 500 });
  const [list, setList] = useState([]);

  function fetchList(name) {
    CONDITION.findAllConditionUsingPOST({
      params: { size },
      body: { name, object, type },
    }).then(({ content = [] }) => {
      setList(content);
    });
  }
  useEffect(() => {
    fetchList();
  }, [object]);

  const handleChange = val => {
    const { key } = val || {};
    const { description } = _.find(list, { id: key }) || {};

    onChange(val);
    changeLogicDesc(description);
  };

  return (
    <TSelect
      onChange={handleChange}
      optionFilterProp="children"
      labelInValue
      value={value}
      onSearch={handleWordSearchDebounce}
      {...others}
    >
      {_.map(list, ({ id, name: itemName }) => (
        <TSelect.Option key={id} value={id}>
          {itemName}
        </TSelect.Option>
      ))}
    </TSelect>
  );
}

export default ConditionSelector;
