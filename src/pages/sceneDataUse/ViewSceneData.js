import React from 'react';
import { Spin } from 'antd';
import SceneDataForm from './sceneDataForm';
import useSceneDataDetail from './hooks/useSceneDataDetail';

function EditInstitution(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useSceneDataDetail(id);
  return detail ? <SceneDataForm initialValues={detail} title="场景用数查看" disabled /> : <Spin />;
}

export default EditInstitution;
