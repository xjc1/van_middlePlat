import React from 'react';
import { Tooltip } from 'antd';
import {
  ClusterOutlined,
  InteractionOutlined,
  DatabaseOutlined,
  LayoutOutlined,
} from '@ant-design/icons';
import GoldenTabs from '../components/GoldenTabs';
import LayoutPanel from '../layoutPanel';
import FieldPanel from '../fieldPanel';
import CtxPanel from '../CtxPanel';
import FormOrderPanel from '../formOrderPanel';

const { TabPane } = GoldenTabs;

function FormDesignAssets(props) {
  return (
    <div {...props}>
      <GoldenTabs>
        <TabPane
          tab={
            <Tooltip placement="right" title="布局设计">
              <LayoutOutlined />
            </Tooltip>
          }
          key="layout"
        >
          <LayoutPanel />
        </TabPane>
        <TabPane
          tab={
            <Tooltip placement="right" title="表单字段">
              <DatabaseOutlined />
            </Tooltip>
          }
          key="formElement"
        >
          <FieldPanel />
        </TabPane>
        <TabPane
          tab={
            <Tooltip placement="right" title="上下文状态">
              <InteractionOutlined />
            </Tooltip>
          }
          key="context"
        >
          <CtxPanel />
        </TabPane>
        <TabPane
          tab={
            <Tooltip placement="right" title="表单编排">
              <ClusterOutlined />
            </Tooltip>
          }
          key="treeForm"
        >
          <FormOrderPanel />
        </TabPane>
      </GoldenTabs>
    </div>
  );
}

export default FormDesignAssets;
