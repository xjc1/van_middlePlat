import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { DECLAREPROJECT } from '@/services/api';
import CreateProject from './compontents/CreateProject';
import initProjectData from '@/pages/projectManage/initProjectData';

function EditProject(props) {
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
    const res = await DECLAREPROJECT.getProjectDetailUsingGET(recordId);
    const newData = await initProjectData(res);
    setProjectInfo(newData);
  }

  return (
    <>
      {projectInfo ? (
        <CreateProject
          {...props}
          initialValues={projectInfo}
          editVisible={false}
          title="查看项目"
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditProject;
