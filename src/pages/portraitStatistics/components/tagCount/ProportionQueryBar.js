import React from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import TagTypeSelect from './TagTypeSelect';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function ProportionQueryBar({ onForm, userType, ...others }) {
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem col={24} name="category" label="标签分类" {...layout}>
        <TagTypeSelect userType={userType} />
      </TItem>
    </QueryBarCard>
  );
}

export default ProportionQueryBar;
