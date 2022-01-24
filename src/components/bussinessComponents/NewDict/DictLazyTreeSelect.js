/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState, forwardRef } from 'react';
import _ from 'lodash';
import { Cascader } from 'antd';
import { DICT } from '@/services/api';

function defaultChange({ name, id, code }) {
  return {
    value: id,
    label: name,
    code,
    isLeaf: false,
  };
}

function defaultFetchDict(dictId) {
  return new Promise((resolve, reject) => {
    DICT.findTreeDictionaryUsingPOST({ body: { id: dictId, oneLevel: true } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function DictLazyTreeSelect(
  {
    dictId,
    fetchDict = defaultFetchDict,
    onLoadData = defaultFetchDict,
    value,
    onChange,
    change = defaultChange,
    changeOnSelect = true,
    ...others
  },
  ref,
) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDict(dictId).then(data => {
      setOptions(_.map(data, change));
    });
  }, []);

  const loadData = function(allOptions) {
    const selected = allOptions[allOptions.length - 1];
    selected.loading = true;
    onLoadData(selected.value).then(data => {
      selected.loading = false;
      selected.children = _.map(data, change);
      setOptions([...options]);
    });
  };

  return (
    <Cascader
      ref={ref}
      allowClear
      notFoundContent="无下级数据"
      changeOnSelect={changeOnSelect}
      options={options}
      loadData={loadData}
      onChange={onChange}
      value={_.isArray(value) ? value : []}
      {...others}
    />
  );
}

export default forwardRef(DictLazyTreeSelect);
