import React from 'react';
import { Tooltip } from 'antd';
import {
  ClusterOutlined,
  InteractionOutlined,
  DatabaseOutlined,
  LayoutOutlined,
} from '@ant-design/icons';
import GoldenTabs from '@/pages/designStudios/components/GoldenTabs';
import LayoutPanel from '@/pages/designStudios/layoutPanel';
import CtxPanel from '@/pages/designStudios/CtxPanel';
import FormOrderPanel from '@/pages/designStudios/formOrderPanel';
import SeceneFieldPanel from '@/pages/designOneForm/OneFormAssets/SeceneFieldPanel';

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
          <SeceneFieldPanel />
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
