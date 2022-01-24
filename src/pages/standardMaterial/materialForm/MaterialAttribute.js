import { FormCard, TItem } from '@/components/tis_ui';
import React from 'react';
import FieldAssociation from './components/FieldAssociation';

function MaterialAttribute({ disabled, standardMaterialId }) {
  return (
    <FormCard title="材料属性" bordered={false}>
      <TItem name="attributes" label="材料属性">
        <FieldAssociation standardMaterialId={standardMaterialId} disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default MaterialAttribute;
