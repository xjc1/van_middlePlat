import React from 'react';
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import EditScene from '@/pages/scenes/editScenes';
import useSceneDetail from '@/pages/scenes/hooks/useSceneDetail';

function AuditPage(props) {
  const {
    match: {
      params: { sceneId },
    },
  } = props;
  const info = useSceneDetail(sceneId);

  return (
    <>
      {info && info.id ? (
        <EditScene {...props} sceneInfo={info} title="编辑主题信息" audit />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default connect(({ scenesAudit }) => scenesAudit)(AuditPage);
