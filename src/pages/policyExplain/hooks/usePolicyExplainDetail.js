import { useEffect, useState } from 'react';
import { POLICYINTERPRETATIONS } from '@/services/api';

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);

function usePolicyExplainDetail(id) {
  const [detail, setDetail] = useState({});
  useEffect(() => {
    POLICYINTERPRETATIONS.getPolicyInterpretationUsingGET(id).then((res = {}) => {
      const {
        relatedArticles = [],
        relatedMatters = [],
        relatedPolicies = [],
        relatedProjects = [],
        relatedServices = [],
        clientType = [],
      } = res;
      const formatInfo = {
        ...res,
        relatedArticles: flatBy(relatedArticles, 'id'),
        relatedMatters: flatBy(relatedMatters, 'id'),
        relatedPolicies: flatBy(relatedPolicies, 'id'),
        relatedProjects: flatBy(relatedProjects, 'id'),
        relatedServices: flatBy(relatedServices, 'id'),
        clientType: clientType.map(String),
      };
      setDetail(formatInfo);
    });
  }, []);
  return detail;
}

export default usePolicyExplainDetail;
