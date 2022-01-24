import React from 'react';
import { FormCard, TabForm } from '@/components/tis_ui';
import ApprovalMultiTable from '@/pages/matters/MatterForm/ApprovalMultiTable';

function ApprovalResult(props) {
  return (
    <>
      <FormCard title="原始审批材料" style={{ padding: '0 10%' }} bordered={false}>
        <TabForm.Tab {...props}>
          <ApprovalMultiTable name="originApprovalResult" disabled />
        </TabForm.Tab>
      </FormCard>

      <FormCard title="优化审批材料" style={{ padding: '0 10%' }} bordered={false}>
        <TabForm.Tab {...props}>
          <ApprovalMultiTable name="approvalResult" />
        </TabForm.Tab>
      </FormCard>
    </>
  );
}

export default ApprovalResult;
