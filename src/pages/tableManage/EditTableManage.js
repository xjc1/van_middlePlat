import React from 'react';
import TableManageForm from './tableManageForm';
import useTableDetail from './hooks/useTableForm';

function EditTableManage(props) {
  const {
    params: { tableId },
  } = props.match;

  const { initialValues, handleCreate, handleEdit, isNeedCheck, setIsNeedCheck } = useTableDetail(
    tableId,
  );
  const title = tableId ? '编辑库表' : '新增库表';
  function onFinish(values) {
    // 有id走编辑操作
    if (tableId) {
      handleEdit({ ...values, id: tableId });
    } else {
      handleCreate(values);
    }
  }

  return (
    <TableManageForm
      {...props}
      title={title}
      isNeedCheck={isNeedCheck}
      setIsNeedCheck={setIsNeedCheck}
      initialValues={initialValues}
      onFinish={onFinish}
    />
  );
}

export default EditTableManage;
