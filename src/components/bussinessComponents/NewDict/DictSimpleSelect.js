/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';
import DSelect from './Select';
import PropTypes from 'prop-types';

function defaultChange({ name, _id }) {
  return {
    value: _id,
    label: name,
  };
}

function DictSimpleSelect({ dict, fetchDict, change, ...ohters }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDict(dict).then(data => {
      setOptions(_.map(data, change));
    });
  }, []);

  return (
    <DSelect
      allowClear
      getPopupContainer={triggerNode => triggerNode.parentElement}
      options={options}
      {...ohters}
    />
  );
}

DictSimpleSelect.propTypes = {
  /** 字典码 */
  dict: PropTypes.string,
  /** 获取字典数据 */
  fetchDict: PropTypes.func,
  /** 下拉选择 */
  change: PropTypes.func,
};

DictSimpleSelect.defaultProps = {
  dict: '',
  fetchDict: DictAssistant.fetchChildrenDictWithMemo,
  change: defaultChange,
};

export default DictSimpleSelect;
