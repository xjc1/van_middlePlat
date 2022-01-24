/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import _ from 'lodash';
import { Table, Checkbox, Tooltip, Badge } from 'antd';
import PERMISSION from '@/utils/permissionEnum';
import getViewPermissions from '@/utils/auth/permissionsTreeFilter';
import useCheckedKeys from './useCheckedKeys';
import EmptyFn from '@/utils/EmptyFn';
import styles from '../roles.less';


const item2treeNode = (roots, groupData, leaf = false) => {
  return _.map(roots, permission => {
    const { hasLeaf, desc, paths } = permission;
    if (hasLeaf) {
      return {
        key: permission.key,
        desc,
        paths,
        name: permission.name,
        auth: item2treeNode(groupData[permission.key], groupData, true),
      };
    }
    if (leaf) {
      return {
        key: permission.key,
        desc,
        paths,
        name: permission.name,
      };
    }
    const result = { key: permission.key, name: permission.name, paths };
    const childrenData = item2treeNode(groupData[permission.key], groupData) || [];
    // children为空数组则不添加children属性
    if (childrenData.length) {
      result.children = childrenData;
    }
    return result;
  });
};


function TableTree({ onChange = EmptyFn, value = [], editable = true, ...others }) {
  // const [checkedKeys, setcheckedKeys] = useState(value);

  const data = useMemo(() => {
    const viewPermissions = getViewPermissions();
    const allKeys = viewPermissions.map(({ key }) => key);
    const group = _.groupBy(viewPermissions, 'parent');
    const treeData = item2treeNode(group.root, group);
    return {
      viewPermissions,
      treeData,
      allKeys,
    };
  }, [PERMISSION.permissionKeys]);

  const [
    checkedKeys,
    allKeysChecked,
    menuCheck,
    menuUnCheck,
    featureCheck,
    featureUnCheck,
  ] = useCheckedKeys(data.viewPermissions, value, onChange);

  // 判断是否被选中
  const isChecked = key => {
    return checkedKeys.indexOf(key) > -1;
  };

  // 取消选中
  const unChecked = key => {
    featureUnCheck(key);
  };

  // 选中
  const onChecked = key => {
    featureCheck(key);
  };

  const handleCheck = (target, key, menuKey) => {
    const { checked } = target;
    if (checked) {
      onChecked(key, menuKey);
    } else {
      unChecked(key);
    }
  };
  // TABLE 字段
  const tableColumns = [
    {
      title: '菜单',
      dataIndex: 'name',
      render: (text, record) => {
        const { desc } = record;
        return <Tooltip title={desc}>{text}</Tooltip>;
      },
    },
    {
      title: '可见',
      width: '90px',
      render: (text, record) => {
        if (checkedKeys.indexOf(record.key) > -1) {
          return <Badge color="green" text="可见" />;
        }
        return <Badge color="red" text="不可见" />;
      },
    },
    {
      title: '权限',
      dataIndex: 'auth',
      width: '65%',
      render: (text, record) => {
        if (Array.isArray(text)) {
          return (
            <div>
              {text.map(it => (
                <Tooltip title={it.desc} mouseLeaveDelay={0} key={`auth_item_${it.key}`}>
                  <Checkbox
                    disabled={!editable}
                    checked={isChecked(it.key)}
                    onChange={e => {
                      handleCheck(e.target, it.key, record.key);
                    }}
                  >
                    {it.name}
                  </Checkbox>
                </Tooltip>
              ))}
            </div>
          );
        }
        return '';
      },
    },
  ];

  const tableRowSelection = {
    onSelect: (record, selected) => {
      const { key } = record;
      if (!selected) {
        menuUnCheck(key);
      } else {
        menuCheck(key);
      }
    },
    onSelectAll: selected => {
      if (selected) {
        allKeysChecked(data.allKeys);
      } else {
        allKeysChecked([]);
      }
    },
    getCheckboxProps: record => ({
      disabled: !editable,
    }),
    selectedRowKeys: checkedKeys,
  };

  return (
    <Table
      style={{ width: '100%' }}
      className={styles.treeTableTd}
      defaultExpandAllRows
      dataSource={data.treeData}
      pagination={false}
      columns={tableColumns}
      rowSelection={tableRowSelection}
      rowKey="key"
    />
  );
}

export default TableTree;
