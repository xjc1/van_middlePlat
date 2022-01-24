import React from 'react';
import { BranchesOutlined, SlidersOutlined } from '@ant-design/icons';
import { EmptyFn, TItem } from '@/components/tis_ui';
import { Button, Form, Input } from 'antd';
import Styles from '../settingPanel.less';
import OptionSetting from './OptionSetting';

function Index({ model, onChange = EmptyFn, onGenerateUserInputNode = EmptyFn }) {
  const [formRef] = Form.useForm();
  const { setting: formData } = model;

  return (
    <div className={Styles.settingPanel}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <SlidersOutlined className={Styles.settingPanelIcon} />
          选项节点
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <Form
          form={formRef}
          initialValues={formData}
          onValuesChange={(vals, allVals) => {
            onChange(allVals);
          }}
        >
          <TItem name="name" label="节点名称">
            <Input />
          </TItem>
          <TItem name="title" label="引导语">
            <Input />
          </TItem>
          <OptionSetting name="options" />
        </Form>
        <div style={{ textAlign: "center" }}>
          <Button type="link"
                  onClick={() => {
                    onGenerateUserInputNode(model.id);
                  }}
                  icon={<BranchesOutlined />}>
            自动生成输入节点
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
