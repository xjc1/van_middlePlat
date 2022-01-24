/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { CONDITION, TRANSLATE } from '@/services/api';
import AsySelector from '../AsySelector';

const findConditionWithMemo = (name, type, object) =>
  new Promise(resolve => {
    CONDITION.findAllConditionUsingPOST({
      params: { size: 100 },
      body: { name, object, type },
    }).then(({ content }) => {
      resolve(
        _.map(content, ({ id, name: itemName }) => ({
          key: id,
          label: itemName,
          value: id,
        })),
      );
    });
  });

function ConditionSelector({ type, object, name, value = [], onChange, ...others }) {
  const [isInit, setIsInit] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      let newValue = [...value];
      if (!Array.isArray(value)) {
        newValue = [value];
      }
      TRANSLATE.conditionTranslateUsingPOST({
        body: newValue,
      }).then(items => {
        // onChange(_.map(items, (v, k) => ({ value: k, key: k, label: v })));
        setOptions(_.map(items, (v, k) => ({ value: k, key: k, label: v })));
        setIsInit(true);
      });
    } else {
      setIsInit(true);
    }
  }, []);

  if (type && object && name) {
    return null;
  }
  return isInit ? (
    <AsySelector
      fetchList={text => findConditionWithMemo(text, type, object)}
      {...others}
      value={value}
      onChange={onChange}
      initOptions={options}
    />
  ) : null;
}

export default ConditionSelector;
