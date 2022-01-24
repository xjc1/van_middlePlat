import { FormCard, TItem } from '@/components/tis_ui';
import React from 'react';
import FunctionTable from './components/FunctionTable';

function RelateInfo({ disabled }) {
  return (
    <FormCard title="库表关联信息" bordered={false}>
      <TItem name="functions" label="关联函数">
        <FunctionTable disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default RelateInfo;
