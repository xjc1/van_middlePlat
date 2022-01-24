import React from 'react';
import { BranchesOutlined } from '@ant-design/icons';
import { EmptyFn, TItem } from '@/components/tis_ui';
import { Form, Input } from 'antd';
import Styles from '../settingPanel.less';
import ConditionBranch from './ConditionBranch';

function Index({ model, onChange = EmptyFn }) {
  const [formRef] = Form.useForm();
  const { setting: formData } = model;

  return (
    <div className={Styles.settingPanel}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <BranchesOutlined className={Styles.settingPanelIcon} />
          判断节点
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <Form
          form={formRef}
          initialValues={formData}
          onValuesChange={(vals, allVals) => {
            onChange({ ...formData, ...allVals });
          }}
        >
          <TItem name="name" label="节点名称">
            <Input />
          </TItem>
          <ConditionBranch name="conditions" />
          <div className={Styles.conditionBranchCard}>
            <TItem
              name="otherCondition"
              label="如果不满足以上所有条件"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </TItem>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Index;
