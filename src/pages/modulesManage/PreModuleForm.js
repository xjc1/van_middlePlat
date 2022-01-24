import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import ModuleForm from './moduleForm';
import { translateStrategy } from './EditModulePage';

function PreModuleForm() {
  const [params, setParams] = useState();

  useEffect(() => {
    (async () => {
      const strategyObj = await translateStrategy();
      setParams({
        detail: {},
        strategyObj,
      });
    })();
  }, []);

  return params ? <ModuleForm strategyObj={params.strategyObj} detail={params.detail} /> : <Spin />;
}

export default PreModuleForm;
