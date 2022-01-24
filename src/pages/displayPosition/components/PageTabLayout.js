import React from 'react';
import { PageTab } from '@/components/tis_ui';

function PageTabLayout({ curPath, children }) {
  return (
    <>
      <PageTab
        tabList={[
          {
            rName: 'displayPosition_sourceManage',
            name: '来源管理',
          },
          {
            rName: 'displayPosition_freshRegular',
            name: '刷新',
          },
        ]}
        value={curPath}
      >
        {children}
      </PageTab>
    </>
  );
}

export default PageTabLayout;
