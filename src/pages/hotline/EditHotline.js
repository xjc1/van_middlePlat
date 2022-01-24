import React from 'react';
import { Card, Spin } from 'antd';
import useHotlineDetail from './hooks/useHotlineDetail';
import EditHotlineForm from './hotlineForm';

function EditHotline(props) {
  const {
    match: {
      params: { hotlineId },
    },
  } = props;
  const info = useHotlineDetail(hotlineId);
  return info.id ? (
    <EditHotlineForm title="编辑热线电话" initialValues={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default EditHotline;
