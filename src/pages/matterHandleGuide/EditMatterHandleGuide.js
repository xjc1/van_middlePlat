import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { MATTERHANDLEGUIDES } from '@/services/api';
import CreateMatterHandleGuide from './components/CreateMatterHandleGuide';
import initData from './initData';

function EditMatterHandleGuide(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [matterHandleGuideInfo, setMatterHandleGuideInfo] = useState(null);

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setMatterHandleGuideInfo({});
    }
  }, []);

  async function getDetail(recordId) {
    const res = await MATTERHANDLEGUIDES.getMatterHandleGuideUsingGET(recordId);
    const newData = await initData(res);
    setMatterHandleGuideInfo(newData);
  }

  return (
    <>
      {matterHandleGuideInfo ? (
        <CreateMatterHandleGuide
          {...props}
          initialValues={matterHandleGuideInfo}
          editVisible
          title={id ? '编辑导办' : '新增导办'}
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditMatterHandleGuide;
