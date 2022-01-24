import React from 'react';
import { Input } from 'antd';
import { QueryBarCard, TItem } from '@/components/tis_ui';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

function RolesQueryBar({ onForm, actions, footer }) {
  return (
    <QueryBarCard onForm={onForm} actions={actions} footer={footer}>
      <TItem col={6} {...layout} name="roleName" label="角色名称">
        <Input />
      </TItem>
    </QueryBarCard>
  );
}

export default RolesQueryBar;
