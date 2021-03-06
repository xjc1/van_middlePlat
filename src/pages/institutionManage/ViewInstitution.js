import React from 'react';
import { Spin } from 'antd';
import InstitutionForm from './institutionForm';
import useInstitutionDetail from './hooks/useInstitutionDetail';

function EditInstitution(props) {
  const {
    params: { id },
  } = props.match;
  const { detail } = useInstitutionDetail(id);
  return detail ? <InstitutionForm initialValues={detail} title="ζΊζζ₯η" disabled /> : <Spin />;
}

export default EditInstitution;
