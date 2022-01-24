/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';
import DSelect from './Select';
import PropTypes from 'prop-types';
import { hooks } from '@/components/tis_ui';
import CodeInfo from '@/components/bussinessComponents/Dict/DictLabel';

const { useUnmount } = hooks;

function defaultChange({ name, code, showCode }) {
  return {
    value: code,
    label: (
      <div>
        {showCode && <CodeInfo code={code} />}
        {name}
      </div>
    ),
  };
}

function DictSimpleSelect({ dict, rootDict, fetchDict, change, showCode, ...ohters }) {
  const [safeExecute] = useUnmount();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDict(dict, rootDict).then(data => {
      safeExecute(setOptions)(
        _.map(data, item => {
          return change({ ...item, showCode });
        }),
      );
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
  rootDict: PropTypes.string,
  /** 获取字典数据 */
  fetchDict: PropTypes.func,
  /** 下拉选择 */
  change: PropTypes.func,
};

DictSimpleSelect.defaultProps = {
  dict: '',
  rootDict: '',
  fetchDict: DictAssistant.fetchChildrenDictWithMemo,
  change: defaultChange,
};

export default DictSimpleSelect;
