import React from 'react';
import { TabForm, TItem } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ExtendRead(props) {
  const { disabled, ...others } = props;

  return (
    <TabForm.Tab {...others}>
      <TItem name="relationMatchScene" label="相关主题" {...layout}>
        <TSearchSelector type="scene" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchMatters" label="相关事项" {...layout}>
        <TSearchSelector type="matter" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchService" label="相关服务" {...layout}>
        <TSearchSelector type="convenience" disabled={disabled} />
      </TItem>
      <TItem name="relationPolicy" label="相关政策" {...layout}>
        <TSearchSelector type="policyLibrary" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchProject" label="相关项目" {...layout}>
        <TSearchSelector type="project" disabled={disabled} />
      </TItem>
    </TabForm.Tab>
  );
}

export default ExtendRead;
