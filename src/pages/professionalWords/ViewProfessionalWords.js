import React from 'react';
import { Spin } from 'antd';
import useWordsDetail from './hooks/useWordsDetail';
import ProfessionalWordsForm from './professionalWordsForm';

function EditProjectWords(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useWordsDetail(id);
  return detail ? (
    <ProfessionalWordsForm initialValues={detail} title="查看专业词" disabled />
  ) : (
    <Spin />
  );
}

export default EditProjectWords;
