import React, { useState } from 'react';
import { Button } from 'antd';
import PERMISSION from '@/utils/permissionEnum';
import PermissionTree from '../../permissions/ViewPermissionTree';

function Permissions({ value = [], onChange = () => {} }) {
  const [selectPermissions, setSelectPermissions] = useState(value);
  const onCheck = ({ checked }) => {
    setSelectPermissions(checked);
    onChange(checked);
  };
  return (
    <>
      <Button.Group>
        <Button
          size="small"
          onClick={() => {
            onCheck({ checked: PERMISSION.permissionKeys });
          }}
        >
          全选
        </Button>
        <Button
          size="small"
          onClick={() => {
            onCheck({ checked: [] });
          }}
        >
          清空
        </Button>
      </Button.Group>
      <PermissionTree
        checkable
        editAble
        selectedList={selectPermissions}
        vaildPermissions={PERMISSION.permissionKeys}
        checkStrictly
        defaultExpandAll
        defaultExpandParent
        checkedKeys={selectPermissions}
        filternode={[]}
        onCheck={onCheck}
        style={{ margin: 'auto' }}
      />
    </>
  );
}
export default Permissions;
