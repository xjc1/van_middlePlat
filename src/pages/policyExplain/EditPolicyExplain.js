import React from 'react';
import { Card, Spin } from 'antd';
import usePolicyExplainDetail from './hooks/usePolicyExplainDetail';
import EditPolicyExplainForm from './policyExplainForm';

function EditPolicyExplain(props) {
  const {
    match: {
      params: { policyExplainId },
    },
  } = props;
  const info = usePolicyExplainDetail(policyExplainId);
  return info.id ? (
    <EditPolicyExplainForm title="编辑解读" initialValues={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default EditPolicyExplain;
