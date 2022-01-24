/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState, forwardRef } from 'react';
import DictAssistant from '@/utils/DictAssistant';
import _ from 'lodash';
import { Cascader } from 'antd';
import { DICT } from '@/services/api';
import { cascaderDropdownRender } from './DictLabel';

function defaultChange({ name, code }) {
  return {
    value: code,
    label: name,
    isLeaf: false,
  };
}

function DictLazyTreeSelect(
  {
    dict,
    rootDict,
    fetchDict = DictAssistant.fetchChildrenDictWithMemo,
    value,
    onChange,
    change = defaultChange,
    showCode = false,
    ...others
  },
  ref,
) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDict(dict, rootDict).then(data => {
      setOptions(_.map(data, change));
    });
    if (value) {
      DICT.batchTranslateDictPathByCodesUsingPOST({
        body: { rootCode: rootDict || dict, childCodes: [value] },
      }).then(data => {
        console.info(data[value]);
      });
    }
  }, []);

  const loadData = function(allOptions) {
    const selected = allOptions[allOptions.length - 1];
    // targetOption.loading = true;
    selected.loading = true;
    setOptions(options);
    fetchDict(selected.value).then(data => {
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
      changeOnSelect={false}
      options={options}
      loadData={loadData}
      dropdownRender={showCode && cascaderDropdownRender({ root: dict })}
      onChange={onChange}
      value={_.isArray(value) ? value : []}
      {...others}
    />
  );
}

export default forwardRef(DictLazyTreeSelect);
