import React from 'react';
import MaterialForm from './materialForm';
import useMaterialDetail from './hooks/useMaterialDetail';

function EditStandardMaterial(props) {
  const {
    params: { materialId },
  } = props.match;

  const { initialValues, handleCreate, handleEdit } = useMaterialDetail(materialId);
  const title = materialId ? '编辑标准材料' : '新增标准材料';
  function onFinish(values) {
    // 有id走编辑操作
    if (materialId) {
      handleEdit({ ...values, id: materialId });
    } else {
      handleCreate(values);
    }
  }

  return (
    <MaterialForm {...props} title={title} initialValues={initialValues} onFinish={onFinish} />
  );
}

export default EditStandardMaterial;
