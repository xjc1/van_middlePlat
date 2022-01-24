import React from 'react';
import { PageTab } from '@/components/tis_ui';

const tabList = [
  {
    rName: 'ruleManage',
    name: '函数',
  },
  {
    rName: 'ruleManage_condition',
    name: '限定条件',
  },
];

function changeTab({ path }) {
  return <PageTab tabList={tabList} value={path} />;
}

export default changeTab;
