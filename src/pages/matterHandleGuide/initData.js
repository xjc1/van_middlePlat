export default async function(res) {
  const {
    relatedPolicies = [],
    relatedMatters = [],
    relatedServices = [],
    relatedProjects = [],
    relatedArticles = [],
    clientType = [],
  } = res;
  return {
    ...res,
    relatedPolicies: relatedPolicies.map(it => it.id),
    relatedMatters: relatedMatters.map(it => it.id),
    relatedServices: relatedServices.map(it => it.id),
    relatedProjects: relatedProjects.map(it => it.id),
    relatedArticles: relatedArticles.map(it => it.id),
    clientType: clientType.map(String),
  };
}
