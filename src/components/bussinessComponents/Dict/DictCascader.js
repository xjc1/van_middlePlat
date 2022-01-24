/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';
import { Cascader } from 'antd';
import useUnmount from '../../tis_ui/hooks/useUnmount';

function item2treeNode(roots, group) {
  return _.map(roots, ({ code, name }) => ({
    value: code,
    label: name,
    children: group[code] && item2treeNode(group[code], group),
  }));
}

function DictCascader({
  dict,
  fetchDict = DictAssistant.fetchTreeDictWithMemo,
  onChange,
  ...others
}) {
  const [treeData, setTreeData] = useState(null);
  const [safeExecute] = useUnmount();

  useEffect(() => {
    fetchDict(dict).then(
      safeExecute(data => {
        const groups = _.groupBy(data, 'parentcode');
        const result = item2treeNode(groups[dict], groups, {});
        setTreeData(result);
      }),
    );
  }, []);

  return (
    treeData && (
      <Cascader
        allowClear
        getPopupContainer={triggerNode => triggerNode.parentElement}
        onChange={val => {
          onChange && onChange(val, treeData);
        }}
        options={treeData}
        {...others}
      />
    )
  );
}

DictCascader.item2treeNode = item2treeNode;

export default DictCascader;
