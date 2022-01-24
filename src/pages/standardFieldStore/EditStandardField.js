import React from 'react';
import { Card, Spin } from 'antd';
import FieldStoreForm from './fieldStoreForm';
import useStandardFieldDetail from './hooks/useStandardFieldDetail';

function EditStandardField(props) {
  const {
    match: {
      params: { fieldId },
    },
  } = props;
  const info = useStandardFieldDetail(fieldId);
  return (
    <>
      {info && info.id ? (
        <FieldStoreForm title="编辑标准字段" fieldInfo={info} {...props} />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditStandardField;
