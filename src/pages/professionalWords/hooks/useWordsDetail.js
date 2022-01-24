import { useState, useEffect } from 'react';
import { PROFESSIONALWORD } from '@/services/api';

function useWordsDetail(recordId) {
  const [detail, setDetail] = useState();
  const getDetail = async id => {
    const data = await PROFESSIONALWORD.getProfessionalWordByIdUsingGET(id);
    setDetail(data);
  };
  useEffect(() => {
    getDetail(recordId);
  }, []);
  return {
    detail,
  };
}

export default useWordsDetail;
