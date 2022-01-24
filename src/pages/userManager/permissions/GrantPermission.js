import React from 'react';
import { Tabs, Button } from 'antd';
import _ from 'lodash';
import PermissionsList from "./PermissionsList";
import AlreadyPermissionCard from './AlreadyPermissionCard';
import ViewPermissionTree from './ViewPermissionTree';
import PERMISSION from "@/utils/permissionEnum";

function GrantPermission({
                           preStyle,
                           viewPermissions,
                           dataPermissions,
                           dataNodes,
                           onVPermissionCheck,
                           onDPermissionCheck,
                           onRemoveViewTag,
                           onRemoveDataTag
                         }) {
  return (
    <div style={{ display: 'flex' }}>
      <Tabs defaultActiveKey="1" style={{
        flex: 'auto',
        padding: '0 16px',
      }}>
        <Tabs.TabPane tab="视图权限" key="viewPermission">
          <Button.Group>
            <Button size="small" onClick={() => {
              onVPermissionCheck({ checked: _.keys(PERMISSION.viewPermissions) });
            }}>全选</Button>
            <Button size="small" onClick={() => {
              onVPermissionCheck({ checked: [] });
            }}>清空</Button>
          </Button.Group>
          <ViewPermissionTree
            checkable
            checkStrictly
            defaultExpandAll
            defaultExpandParent
            checkedKeys={viewPermissions}
            filternode={[]}
            onCheck={onVPermissionCheck}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="数据权限" key="dataPermission">
          <PermissionsList size="small" rowSelection={{
            selectedRowKeys: dataPermissions,
            onChange: onDPermissionCheck,
          }
          } />
        </Tabs.TabPane>
      </Tabs>
      <AlreadyPermissionCard
        preStyle={preStyle}
        viewPermissions={viewPermissions}
        dataNodes={dataNodes}
        onRemoveDataTag={onRemoveDataTag}
        onRemoveTag={onRemoveViewTag} />
    </div>
  );
}

export default GrantPermission;
