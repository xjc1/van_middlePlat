import React from 'react';
import { Card, Spin } from 'antd';
import MinimalConditionForm from './minimalConditionForm';
import useMinimalConditionDetail from './hooks/useMinimalConditionDetail';

function EditMinimalCondition(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const info = useMinimalConditionDetail(id);

  return info.id ? (
    <MinimalConditionForm title="编辑最小条件" info={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default EditMinimalCondition;
