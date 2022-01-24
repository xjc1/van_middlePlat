import React from 'react';
import { Divider } from 'antd';
import { TabForm, TItem } from '@/components/tis_ui';
import SuggestStrategy from './SuggestStrategy';
import GroupStrategy from './GroupStrategy';
import MixStrategySelectItem from './MixStrategySelectItem';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SuggestInfo({ disabled = false, strategyObj, ...others }) {
  const { suggest, group } = strategyObj;
  return (
    <TabForm.Tab {...others}>
      <Divider orientation="left">推荐策略</Divider>
      <TItem name="suggestStrategy" label="推荐策略" {...layout}>
        <SuggestStrategy stragyItems={suggest} disabled={disabled} />
      </TItem>
      <Divider orientation="left">分组策略</Divider>
      <TItem name="groupStrategy" label="分组策略" {...layout}>
        <GroupStrategy stragyItems={group} disabled={disabled} />
      </TItem>
      <Divider orientation="left">混合策略</Divider>
      <TItem name="mixStrategy" label="混合策略">
        <MixStrategySelectItem disabled={disabled} />
      </TItem>
    </TabForm.Tab>
  );
}

export default SuggestInfo;
