import React from 'react';
import { DataImport, EmptyFn } from '@/components/tis_ui';

function FieldImport({ handleResponse = EmptyFn }) {
  return (
    <DataImport
      btnText="导入字段"
      action="/standardMaterials/attributes/import"
      refresh={handleResponse}
      type="link"
      ghost={false}
      icon={null}
    />
  );
}

export default FieldImport;
