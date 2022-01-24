import React from 'react';
import { Spin } from 'antd';
import useWordsDetail from './hooks/useWordsDetail';
import ProfessionalWordsForm from './professionalWordsForm';

function EditProjectWords(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useWordsDetail(id);
  return detail ? <ProfessionalWordsForm initialValues={detail} title="编辑专业词" /> : <Spin />;
}

export default EditProjectWords;
