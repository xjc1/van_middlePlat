import React from 'react';
import { Tooltip } from 'antd';
import { InteractionOutlined, LayoutOutlined } from '@ant-design/icons';
import GoldenTabs from '@/pages/designStudios/components/GoldenTabs';
import LayoutPanel from '@/pages/designStudios/layoutPanel';
import WidgetPanel from '@/pages/designStudios/widgetPanel';
import UnitPanel from '@/pages/designStudios/unitPanel';
import CtxPanel from '@/pages/designStudios/CtxPanel';

const { TabPane } = GoldenTabs;

function FormDesignAssets(props) {
  return (
    <div {...props}>
      <GoldenTabs>
        <TabPane
          tab={
            <Tooltip placement="right" title="UI设计">
              <LayoutOutlined />
            </Tooltip>
          }
          key="layout"
        >
          <LayoutPanel />
          <UnitPanel />
          <WidgetPanel />
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
      </GoldenTabs>
    </div>
  );
}

export default FormDesignAssets;
