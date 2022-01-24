import React from 'react';
import { Spin } from 'antd';
import SceneDataForm from './sceneDataForm';
import useSceneDataDetail from './hooks/useSceneDataDetail';

function EditInstitution(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useSceneDataDetail(id);
  const title = id ? '场景用数编辑' : '场景用数新增';
  return detail ? <SceneDataForm initialValues={detail} title={title} /> : <Spin />;
}

export default EditInstitution;
