import React from 'react';
import { PageTab } from '@/components/tis_ui';

function MessageTabs({ curPath, children }) {
  return (
    <>
      <PageTab
        tabList={[
          {
            rName: 'messageConfig',
            name: '消息分类',
          },
          {
            rName: 'messageConfig_noticeStyle',
            name: '提醒样式',
          },
          {
            rName: 'messageConfig_messageImg',
            name: '消息配图',
          },
          {
            rName: 'messageConfig_authMethod',
            name: '认证方式',
          },
          {
            rName: 'messageConfig_otherConfig',
            name: '其他设置',
          },
        ]}
        value={curPath}
      >
        {children}
      </PageTab>
    </>
  );
}

export default MessageTabs;
