import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { SUGGESTSTRATEGIES } from '@/services/api';
import StrategyForm from './strategyForm';

function ViewStrategy({ match = {} }) {
  const {
    params: { id },
  } = match;
  const [initialValues, setInitialValues] = useState();
  const getDetail = async code => {
    const detail = await SUGGESTSTRATEGIES.getStrategyDetailUsingGET(code);
    setInitialValues(detail);
  };
  useEffect(() => {
    getDetail(id);
  }, []);
  return initialValues ? <StrategyForm initialValues={initialValues} disabled /> : <Spin />;
}

export default ViewStrategy;
