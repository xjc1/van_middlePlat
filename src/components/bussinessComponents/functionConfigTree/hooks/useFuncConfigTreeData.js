import { useEffect, useState } from 'react';

function useFuncConfigTreeData(userType = null, getMethods, tableType) {
  const [methodList, setMethodList] = useState([]);

  useEffect(() => {
    getMethods(userType, tableType).then(methods => {
      setMethodList(methods);
    });
  }, [userType]);

  return {
    methodList,
  };
}

export default useFuncConfigTreeData;
