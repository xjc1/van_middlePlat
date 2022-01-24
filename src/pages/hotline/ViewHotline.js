import React from 'react';
import { Card, Spin } from 'antd';
import useHotlineDetail from './hooks/useHotlineDetail';
import ViewHotlineForm from './hotlineForm';

function ViewHotline(props) {
  const {
    match: {
      params: { hotlineId },
    },
  } = props;
  const info = useHotlineDetail(hotlineId);
  return info.id ? (
    <ViewHotlineForm title="查看热线电话" disabled initialValues={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default ViewHotline;
