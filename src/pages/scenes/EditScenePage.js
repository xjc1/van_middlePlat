import React from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import useSceneDetail from './hooks/useSceneDetail';
import EditScene from './editScenes';

function EditScenePage(props) {
  const {
    match: {
      params: { sceneId },
    },
  } = props;
  const info = useSceneDetail(sceneId);

  return (
    <>
      {info && info.id ? (
        <EditScene {...props} sceneInfo={info} title="编辑主题信息" />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default connect(({ scenes }) => scenes)(EditScenePage);
