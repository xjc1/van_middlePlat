import React from 'react';
import { Card, Spin } from 'antd';
import PolicyContentForm from './policyContentForm';
import usePolicyDetail from './hooks/usePolicyDetail';

function ViewPolicyContent(props) {
  const {
    params: { policyId },
  } = props.match;
  const { policyDetail, userType, setUserType } = usePolicyDetail(policyId);

  return (
    <>
      {policyDetail.id ? (
        <PolicyContentForm
          {...props}
          title="查看政策"
          disabled
          policyInfo={policyDetail}
          userType={userType}
          setUserType={setUserType}
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default ViewPolicyContent;
