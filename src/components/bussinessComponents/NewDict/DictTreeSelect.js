/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DictAssistant from '@/utils/DictAssistant';
import { TreeSelect } from 'antd';

function item2treeNode(roots, group) {
  return _.map(roots, ({ code, name, _id }) => ({
    value: _id,
    title: name,
    children: group[code] && item2treeNode(group[code], group),
  }));
}

function DictSimpleSelect({ dict, fetchDict, ...others }) {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetchDict(dict).then(data => {
      const groups = _.groupBy(data, 'parentcode');
      let result = [];
      if (_.isString(dict)) {
        result = item2treeNode(groups[dict], groups, {});
      }
      if (Array.isArray(dict)) {
        dict.forEach(dictCode => {
          result = result.concat(item2treeNode(groups[dictCode], groups, {}));
        });
      }
      setTreeData(result);
    });
  }, []);
  return (
    treeData && (
      <TreeSelect
        allowClear
        getPopupContainer={triggerNode => triggerNode.parentElement}
        treeData={treeData}
        {...others}
      />
    )
  );
}

DictSimpleSelect.defaultProps = {
  fetchDict: DictAssistant.fetchTreeDictWithMemo,
};

export default DictSimpleSelect;
