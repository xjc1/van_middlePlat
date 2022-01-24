import React from 'react';
import MaterialForm from './materialForm';
import useMaterialDetail from './hooks/useMaterialDetail';

function ViewStandardMaterial(props) {
  const {
    params: { materialId },
  } = props.match;

  const { initialValues } = useMaterialDetail(materialId);

  return <MaterialForm {...props} title="查看标准材料" initialValues={initialValues} disabled />;
}

export default ViewStandardMaterial;
