import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { MATTERHANDLEGUIDES } from '@/services/api';
import CreateMatterHandleGuide from './components/CreateMatterHandleGuide';
import initData from './initData';

function ViewMatterHandleGuide(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, []);

  async function getDetail(recordId) {
    const res = await MATTERHANDLEGUIDES.getMatterHandleGuideUsingGET(recordId);
    const newData = await initData(res);
    setProjectInfo(newData);
  }

  return (
    <>
      {projectInfo ? (
        <CreateMatterHandleGuide
          {...props}
          initialValues={projectInfo}
          editVisible={false}
          title="查看导办"
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default ViewMatterHandleGuide;
