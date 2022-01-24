import React from 'react';
import { Spin } from 'antd';
import InstitutionForm from './institutionForm';
import useInstitutionDetail from './hooks/useInstitutionDetail';

function EditInstitution(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useInstitutionDetail(id);
  return detail ? <InstitutionForm initialValues={detail} title="机构查看" disabled /> : <Spin />;
}

export default EditInstitution;
