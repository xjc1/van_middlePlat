import React, { useState } from 'react';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';

function UseCheckedKeys(viewPermissions, checked = [], onChange = EmptyFn) {
  const [checkedKeys, setCheckedKeys] = useState(() => {
    const initData = _.filter(viewPermissions, ({ key }) => _.includes(checked, key));
    return initData;
  });

  const setKeysAndChange = (vals = []) => {
    const keysArray = vals.map(({ key }) => key);
    onChange(keysArray);
    setCheckedKeys(vals);
  };


  // 全选等批量操作
  const keysSelect = (keys) => {
    const selectData = _.filter(viewPermissions, ({ key }) => _.includes(keys, key));
    setKeysAndChange(selectData);
  };

  return [
    _.map(checkedKeys, ({ key }) => key),
    // 用于全选等批量keys操作
    nextKeys => {
      keysSelect(nextKeys);
    },
    // 选择 menu, 需要把父节点勾上, 把子节点也勾上
    nextKey => {
      const permission = _.find(viewPermissions, ({ key }) => nextKey === key);
      const { paths } = permission;
      // 父节点
      const parentPermission = _.filter(viewPermissions, ({ key: pkey }) =>
        _.includes(paths, pkey),
      );
      // 子节点
      const childPermission = _.filter(viewPermissions, ({ paths: cPaths }) =>
        _.includes(cPaths, nextKey),
      );
      // 取并集
      const unionData = _.union([...checkedKeys, ...parentPermission, ...childPermission]);
      // 去重
      setKeysAndChange(_.uniqBy(unionData, 'key'));
    },
    /*
      取消选择 menu, 取消需要检查父节点是不是只有唯一, 如果是唯一也要勾掉, 检查方法是,先把数组翻转, 倒推回去检查
    */
    nextKey => {
      // 先取消掉需要取消的部分, 包括子节点
      const permissions = _.filter(checkedKeys, ({ paths }) => _.includes(paths, nextKey));
      const prePermissions = _.difference(checkedKeys, permissions);
      // 翻转数组, 准备检查
      const reversePermission = _.reverse(prePermissions);
      const nextPrmissions = _.reduce(
        reversePermission,
        (result, permission) => {
          const { feature, hasLeaf, key } = permission;
          // 功能权限, 和叶子节点特殊不用检查
          if (feature || hasLeaf) return result;
          // 只检查目录节点
          const usedPermissions = _.filter(result, ({ paths }) => _.includes(paths, key));
          if (usedPermissions.length === 1) {
            return _.difference(result, usedPermissions);
          }
          return result;
        },
        reversePermission,
      );
      setKeysAndChange(_.reverse(nextPrmissions));
    },
    // 选择功能
    featureKey => {
      const permission = _.find(viewPermissions, ({ key }) => featureKey === key);
      const { paths, parent } = permission;
      const parenetPermission = _.find(checkedKeys, { key: parent });
      // 第一次功能选择,把父节点也勾上, 其他不用
      if (parenetPermission) {
        setKeysAndChange([...checkedKeys, permission]);
      } else {
        const permissions = _.filter(viewPermissions, ({ key }) => _.includes(paths, key));
        // 去重
        setKeysAndChange(_.uniqBy([...checkedKeys, ...permissions]), 'key');
      }
    },
    // 取消功能, 功能的取消无关父节点
    featureKey => {
      const permission = _.find(checkedKeys, ({ key }) => featureKey === key);
      setKeysAndChange(_.difference(checkedKeys, [permission]));
    },
  ];
}

export default UseCheckedKeys;
