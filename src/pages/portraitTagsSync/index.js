import React, { useEffect } from 'react';
import router from '@/utils/tRouter';
import PAGE_TABS from './const';

function Index() {
  useEffect(() => {
    // 重定向到 TableContentWrap
    router.replace({ name: 'tagsSync_pageTab', params: { pageTab: PAGE_TABS.NOT_SYNC } });
  }, []);
  return <></>;
}

export default Index;
