import React from 'react';
import classNames from 'classnames';
import { ItemPanel } from 'gg-editor';
import { Collapse } from 'antd';
import OptionItem from './OptionItem';
import { ITEM_TYPES, ITEM_OPTIONS, ITEM_GROUP_TYPES } from '@/pages/dialogStudios/itemConst';
import styles from './index.less';

const { Panel } = Collapse;

const FlowItemPanel = ({ className }) => (
  <ItemPanel className={classNames(styles.itemPanel, className)}>
    <Collapse
      defaultActiveKey={[
        ITEM_GROUP_TYPES.USER,
        ITEM_GROUP_TYPES.ROBOT_THINK,
        ITEM_GROUP_TYPES.ROBOT_ANSWER,
        ITEM_GROUP_TYPES.SYSTEM_POWER,
      ]}
    >
      <Panel header="个性说" key={ITEM_GROUP_TYPES.USER}>
        <OptionItem label="输入节点" {...ITEM_OPTIONS[ITEM_TYPES.USER_INPUT_NODE]} />
      </Panel>
      <Panel header="智能想" key={ITEM_GROUP_TYPES.ROBOT_THINK}>
        <OptionItem label="判断节点" {...ITEM_OPTIONS[ITEM_TYPES.JUDGE_NODE]} />
        <OptionItem label="填槽节点" {...ITEM_OPTIONS[ITEM_TYPES.SLOT_NODE]} />
      </Panel>
      <Panel header="精准答" key={ITEM_GROUP_TYPES.ROBOT_ANSWER}>
        <OptionItem label="选项节点" {...ITEM_OPTIONS[ITEM_TYPES.OPTION_NODE]} />
        <OptionItem label="答案节点" {...ITEM_OPTIONS[ITEM_TYPES.ANSWER_NODE]} />
      </Panel>
    </Collapse>
  </ItemPanel>
);

export default FlowItemPanel;
