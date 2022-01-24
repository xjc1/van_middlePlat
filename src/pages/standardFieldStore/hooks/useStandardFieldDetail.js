import { useState, useEffect } from 'react';
import { STANDARDFIELDS } from '@/services/api';

function useStandardFieldDetail(id) {
  const [detail, setDetail] = useState();
  useEffect(() => {
    if (id) {
      STANDARDFIELDS.queryStandardFieldDetailUsingGET(id).then(setDetail);
    }
  }, []);
  return detail;
}

export default useStandardFieldDetail;
