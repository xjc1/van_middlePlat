import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { cleanModuleDetail, translateStrategy } from './EditModulePage';
import ModuleForm from '@/pages/modulesManage/moduleForm';

function ViewModulePage({ match }) {
  const [params, setParams] = useState();

  useEffect(() => {
    (async () => {
      const { id } = match.params;
      const strategyObj = await translateStrategy();
      const nextDetail = await cleanModuleDetail(id);
      setParams({
        detail: nextDetail,
        strategyObj,
      });
    })();
  }, []);

  return params ? (
    <ModuleForm strategyObj={params.strategyObj} detail={params.detail} disabled />
  ) : null;
}

export default connect(({ modulesManage }) => {
  return { focusItem: modulesManage.focusItem };
})(ViewModulePage);
