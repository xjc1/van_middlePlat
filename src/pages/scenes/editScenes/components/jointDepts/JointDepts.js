import React from 'react';
import { Radio } from 'antd';
import { TItem, FormRules } from '@/components/tis_ui';
import AddDepartments from './AddDepartments';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function JointDepts(props) {
  const { sceneForm, disabled } = props;

  return (
    <>
      <TItem
        name="isNeedAudit"
        label="是否需要审核"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <Radio.Group disabled={disabled}>
          <Radio value={0}>需要</Radio>
          <Radio value={1}>不需要</Radio>
        </Radio.Group>
      </TItem>
      <TItem name="department" label="联办部门" {...layout}>
        <AddDepartments disabled={disabled} sceneForm={sceneForm} />
      </TItem>
    </>
  );
}

export default JointDepts;
