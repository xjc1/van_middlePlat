import React from 'react';
import { Card, Spin } from 'antd';
import PolicyContentForm from './policyContentForm';
import usePolicyDetail from './hooks/usePolicyDetail';

function EditPolicyContent(props) {
  const {
    params: { policyId },
  } = props.match;
  const { policyDetail, userType, setUserType } = usePolicyDetail(policyId);

  return (
    <>
      {policyDetail.id ? (
        <PolicyContentForm
          {...props}
          key={policyId}
          title="编辑政策"
          policyInfo={policyDetail}
          objectType={userType}
          setObjectType={setUserType}
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditPolicyContent;
