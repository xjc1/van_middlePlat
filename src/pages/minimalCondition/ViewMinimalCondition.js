import React from 'react';
import { Card, Spin } from 'antd';
import MinimalConditionForm from './minimalConditionForm';
import useMinimalConditionDetail from './hooks/useMinimalConditionDetail';

function ViewMinimalCondition(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const info = useMinimalConditionDetail(id);

  return info.id ? (
    <MinimalConditionForm title="查看最小条件" info={info} disabled />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default ViewMinimalCondition;
