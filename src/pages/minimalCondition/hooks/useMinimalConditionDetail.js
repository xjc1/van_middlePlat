import { useEffect, useState } from 'react';
import { MINIMALCONDITION } from '@/services/api';
import { message } from 'antd';

function useMinimalConditionDetail(id) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    MINIMALCONDITION.getMinimalConditionDetailUsingGET(id)
      .then(setDetail)
      .catch(e => message.error(e.msg));
  }, []);
  return detail;
}

export default useMinimalConditionDetail;
