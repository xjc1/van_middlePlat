import React from 'react';
import { Spin } from 'antd';
import InstitutionForm from './institutionForm';
import useInstitutionDetail from './hooks/useInstitutionDetail';

function EditInstitution(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useInstitutionDetail(id);
  const title = id ? '机构编辑' : '机构新增';
  return detail ? <InstitutionForm initialValues={detail} title={title} /> : <Spin />;
}

export default EditInstitution;
