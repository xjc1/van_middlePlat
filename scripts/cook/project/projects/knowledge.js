const _ = require('lodash');

/**
 *
 * @param {所有路由} routers
 * @param {需要展示的路径} displayPath
 * @param {过滤路径对应的权限标识} filterAuth
 */
function getfilterAuth(routers = [], displayPath = [], filterAuth = []) {
  routers.forEach(({ path, routes = [], authority = [] }) => {
    displayPath.indexOf(path) < 0 && filterAuth.push(...authority);
    getfilterAuth(routes, displayPath, filterAuth);
  });
  return filterAuth;
}

// 此常量是需要展示的路由表, 全部的路由列表可以在 ./routerList.js 中查看
const needDispaly = [
  '/',
  '/login',
  '/content',
  '/content/do',
  '/content/do/matters',
  '/content/do/matters/new',
  '/content/do/matters/edit/:matterid',
  '/content/do/matters/split',
  '/content/do/matters/split/:id',
  '/content/do/matters/bulk',
  '/content/do/scenes',
  '/content/do/scenes/sceneinfo',
  '/content/do/scenes/view/:sceneId',
  '/content/do/scenes/editScenes/:sceneId',
  '/content/do/scenes/bulk',
  '/content/do/scenesQA',
  '/content/do/scenesQA/:scenesId',
  '/content/do/scenesQA/:scenesId/:nodeId',
  '/content/knowledgeLibWorkOrder',
  '/content/knowledgeLibWorkOrder/commit',
  '/content/knowledgeLibWorkOrder/confirm',
  '/content/knowledgeLibWorkOrder/commit/create',
  '/content/knowledgeLibWorkOrder/commit/view/:workOrderId',
  '/content/knowledgeLibWorkOrder/confirm/view/:workOrderId',
  '/content/knowledgeLibWorkOrder/commit/edit/:workOrderId',
  '/content/knowledgeLibWorkOrder/confirm/edit/:workOrderId',
  '/content/knowledgeLibWorkOrder/confirm/audit/:workOrderId',
  '/content/knowledgeLibWorkOrder/knowledge',
];

module.exports = {
  title: '湖北省政务知识库系统',
  text: {
    知识库工单: '知识库管理',
  },
  bg: 'login_hubei.png',
  routesList(routes, allRoutes) {
    const routesFilterAuth = getfilterAuth(allRoutes, needDispaly);
    // routesArray路由path数组，routesFilterAuth 隐藏路由对应需要隐藏的权限
    return { routesArray: _.intersection(routes, needDispaly), routesFilterAuth };
  },
};
