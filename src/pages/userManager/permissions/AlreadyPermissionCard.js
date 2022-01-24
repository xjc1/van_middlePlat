import React from 'react';
import _ from "lodash";
import PERMISSION from "@/utils/permissionEnum";
import PermissionTag from "@/pages/userManager/permissions/PermissionTag";
import { Card } from "antd";

const defaultCss = {
  border: '1px solid #dddddd',
  width: 600,
  marginTop: 5,
};

function AlreadyPermissionCard({ viewPermissions, dataNodes, onRemoveTag, onRemoveDataTag, preStyle = {} }) {
  return (
    <Card
      type="inner"
      size="small"
      style={{...defaultCss, ...preStyle,}}
      bodyStyle={{ padding: 10 }}
      title={<span>已分配权限</span>}>
      {
        _.map(viewPermissions, (pKey) => {
          const permission = PERMISSION.viewPermissions[pKey];
          return permission && <PermissionTag
            style={{ marginBottom: 10 }}
            key={permission.key}
            onClose={() => onRemoveTag(pKey)}
            type="view"
            closable={!!onRemoveTag}
            valid={permission.status === 'VALID'}>{permission.allName}
          </PermissionTag>
        })
      }
      {
        _.map(dataNodes, ({ id, permissionName, status }) => <PermissionTag
          style={{ marginBottom: 10 }}
          key={id}
          onClose={() => onRemoveDataTag(id)}
          type="data"
          closable={!!onRemoveDataTag}
          valid={status === 'VALID'}>{permissionName}
        </PermissionTag>)
      }
    </Card>
  );
}

export default AlreadyPermissionCard;
