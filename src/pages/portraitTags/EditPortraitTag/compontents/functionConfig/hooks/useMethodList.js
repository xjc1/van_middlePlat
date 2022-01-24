import { useEffect, useState } from 'react';
import { CORE } from '@/services/api';
import _ from 'lodash';

function useMethodList(userType = null) {
  const [methodList, setMethodList] = useState([]);

  useEffect(() => {
    getMethodList(userType);
  }, [userType]);

  async function getMethodList(type) {
    const allMethod = await CORE.findAllMethodSchemaUsingGET({ params: { type } });
    const formatMethod = _.map(allMethod, ({ id, cname, description, ...others }) => ({
      ...others,
      label: cname,
      value: id,
      key: id,
      description,
      id,
    }));
    setMethodList(formatMethod);
  }

  return {
    methodList,
  };
}

export default useMethodList;
