import React from 'react';
import { KERNEL } from '@/services/api';
import { Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import TreeTable from './compontents/tableTree';

async function checkRolePermission({ id }) {
  const { viewPermissions = '' } = await KERNEL.selectRoleDetailUsingGET({
    params: { id },
  });
  const permissionsArray = viewPermissions.split(',');
  Modal.info({
    title: '查看权限',
    width: '70%',
    content: (
      // <AlreadyPermissionCard
      //   dataNodes={permissions}
      //   viewPermissions={_.split(viewPermissions, ',')}
      // />
      <TreeTable value={permissionsArray} editable={false} />
    ),
    okText: '好了',
    icon: <LockOutlined />,
    onOk: () => {
      console.info('0000');
    },
  });
}

export default checkRolePermission;
