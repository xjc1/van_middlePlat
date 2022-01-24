import React, { useEffect, useState } from 'react';
import { Card, Radio } from 'antd';
import router from '@/utils/tRouter';
import NotSyncTable from './components/notSyncTable';
import SyncRecords from './components/syncRecords';
import SyncSetting from './components/syncSetting';
import PAGE_TABS from './const';
import styles from './index.less';

const tableMap = {
  [PAGE_TABS.NOT_SYNC]: <NotSyncTable />,
  [PAGE_TABS.SYNC_RECORDS]: <SyncRecords />,
  [PAGE_TABS.SYNC_SETTING]: <SyncSetting />,
};

function TableContentWrap(props) {
  const [curTab, setCurTab] = useState(null);
  const {
    match: {
      params: { pageTab },
    },
  } = props;

  useEffect(() => {
    setCurTab(pageTab);
  }, [pageTab]);

  return (
    <>
      <Card className={styles.pageTabs}>
        <Radio.Group
          value={curTab}
          options={[
            {
              label: '查看未同步标签',
              value: PAGE_TABS.NOT_SYNC,
            },
            {
              label: '查看同步记录',
              value: PAGE_TABS.SYNC_RECORDS,
            },
            {
              label: '同步设置',
              value: PAGE_TABS.SYNC_SETTING,
            },
          ]}
          optionType="button"
          buttonStyle="solid"
          onChange={e => router.push({ name: 'tagsSync_pageTab', params: { pageTab: e.target.value } })}
        />
      </Card>
      {tableMap[curTab]}
    </>
  );
}

export default TableContentWrap;
