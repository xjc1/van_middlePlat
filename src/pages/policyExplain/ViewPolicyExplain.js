import React from 'react';
import { Card, Spin } from 'antd';
import usePolicyExplainDetail from './hooks/usePolicyExplainDetail';
import ViewPolicyExplainForm from './policyExplainForm';

function ViewPolicyExplain(props) {
  const {
    match: {
      params: { policyExplainId },
    },
  } = props;
  const info = usePolicyExplainDetail(policyExplainId);
  console.log('info', info);
  return info.id ? (
    <ViewPolicyExplainForm title="查看解读" disabled initialValues={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default ViewPolicyExplain;
