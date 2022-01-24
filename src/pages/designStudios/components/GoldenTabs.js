import React from 'react';
import { Tabs } from 'antd';
import Styles from './GoldenTabs.less';

console.log('-> Styles', Styles);

function GoldenTabs({ children, tabPosition = 'left' }) {
  return (
    <Tabs tabPosition={tabPosition} className={Styles.goldenTabsWrap}>
      {children}
    </Tabs>
  );
}

GoldenTabs.TabPane = Tabs.TabPane;

export default GoldenTabs;
