import { useState, useEffect } from 'react';
import { Code2Name } from '@/utils/DictTools';
import { KERNEL } from '@/services/api';

function useInstitutionDetail(id) {
  const [detail, setDetail] = useState();
  const initialValues = {};

  const getDetail = async recordId => {
    // 没有recordId为新增
    if (!recordId) {
      setDetail(initialValues);
      return;
    }
    const record = await KERNEL.getInstitutionUsingGET(recordId);
    const { relatedInstitutions = [], serviceType = [], serviceProject = [], city = {} } =
      record || {};
    const { dictNames } = await Code2Name(Promise.resolve({ content: relatedInstitutions }), [
      'SH00XZQH',
      'regions',
    ]);
    const newRelatedInstitutions = relatedInstitutions.map(({ relatioinId, name, regions }) => ({
      id: relatioinId,
      name,
      regions: dictNames.SH00XZQH[regions] || regions,
    }));
    setDetail({
      ...record,
      relatedInstitutions: newRelatedInstitutions,
      serviceType: serviceType.map(({ id: dictId }) => dictId),
      serviceProject: serviceProject.map(({ id: dictId }) => dictId),
      city: city.id,
    });
  };
  useEffect(() => {
    getDetail(id);
  }, []);

  return { detail };
}

export default useInstitutionDetail;
