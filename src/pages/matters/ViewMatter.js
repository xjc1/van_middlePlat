import React from 'react';
import MatterForm from './MatterForm';
import { Spin } from 'antd';
import useMatterDetail from './hooks/useMatterDetail';
import { EmptyFn } from '@/components/tis_ui';

function ViewMatter(props) {
  const {
    match: {
      params: { matterid },
    },
  } = props;
  const { initData, getDetail = EmptyFn } = useMatterDetail(matterid);

  return initData ? (
    <MatterForm disabled instance={initData} loadDetail={() => getDetail(matterid)} />
  ) : (
    <div>
      <Spin />
    </div>
  );
}

export default ViewMatter;
