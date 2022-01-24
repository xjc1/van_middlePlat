import React from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import MenuRootSelect from './MenuRootSelect';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

function PortraitInfoQueryBar({ onForm, userType, ...others }) {
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem col={6} name="rootMenuId" label="根级菜单" {...layout}>
        <MenuRootSelect userType={userType} />
      </TItem>
    </QueryBarCard>
  );
}

export default PortraitInfoQueryBar;
