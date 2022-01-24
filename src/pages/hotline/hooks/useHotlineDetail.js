import { useEffect, useState } from 'react';
import { HOTLINES } from '@/services/api';

function UseHotlineDetail(id) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    HOTLINES.getHotlineUsingGET(id).then((res = {}) => {
      const { clientType = [] } = res;
      const formatInfo = {
        ...res,
        clientType: clientType.map(String),
      };
      setDetail(formatInfo);
    });
  }, []);
  return detail;
}

export default UseHotlineDetail;
