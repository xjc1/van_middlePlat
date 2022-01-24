import React from 'react';
import MatterForm from './MatterForm';
import { Spin } from 'antd';
import useMatterDetail from './hooks/useMatterDetail';
import { EmptyFn } from '@/components/tis_ui';

function EditMatter(props) {
  const {
    match: {
      params: { matterid },
    },
  } = props;
  const { initData, getDetail = EmptyFn } = useMatterDetail(matterid);

  return initData ? (
    <MatterForm instance={initData} loadDetail={() => getDetail(matterid)} />
  ) : (
    <div>
      <Spin />
    </div>
  );
}

export default EditMatter;
