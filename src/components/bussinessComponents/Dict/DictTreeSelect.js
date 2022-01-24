/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import DictAssistant from '@/utils/DictAssistant';
import { TreeSelect } from 'antd';
import Styles from './dictTreeSelect.less';
import { DoNothingFn, EmptyFn, hooks } from '@/components/tis_ui';

const { useUnmount } = hooks;

function DictTreeSelect({
  dict,
  rootDict,
  fetchDict,
  leafOnly = false,
  onTreeData = EmptyFn,
  cleanValue = DoNothingFn,
  showCode = false,
  value,
  ...others
}) {
  const [safeExecute] = useUnmount();
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetchDict(dict, rootDict).then(result => {
      onTreeData(result);
      safeExecute(setTreeData)(result);
    });
  }, []);

  return (
    treeData && (
      <TreeSelect
        dropdownClassName={leafOnly && Styles.leafOnly}
        allowClear
        treeIcon={showCode}
        getPopupContainer={triggerNode => triggerNode.parentElement}
        treeData={treeData}
        value={cleanValue(value)}
        {...others}
      />
    )
  );
}

DictTreeSelect.defaultProps = {
  fetchDict: DictAssistant.fetchTreeDictWithFormat,
};

export default DictTreeSelect;
