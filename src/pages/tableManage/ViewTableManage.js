import React from 'react';
import TableManageForm from './tableManageForm';
import useTableForm from './hooks/useTableForm';

function ViewTableManage(props) {
  const {
    params: { tableId },
  } = props.match;
  const { initialValues } = useTableForm(tableId);

  return <TableManageForm {...props} disabled title="查看库表" initialValues={initialValues} />;
}

export default ViewTableManage;
