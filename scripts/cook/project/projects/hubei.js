const _ = require('lodash');

/**
 *
 * @param {所有路由} routers
 * @param {需要过滤的路径} filterPath
 * @param {过滤路径对应的权限标识} filterAuth
 */
function getfilterAuth(routers = [], filterPath = [], filterAuth = []) {
  routers.forEach(({ path, routes = [], authority = [] }) => {
    filterPath.indexOf(path) > -1 && filterAuth.push(...authority);
    getfilterAuth(routes, filterPath, filterAuth);
  });
  return filterAuth;
}

// 此常量是需要隐藏的路由表, 全部的路由列表可以在 ./routerList.js 中查看
const needFilter = ['/content/archivesLibMenu'];

module.exports = {
  title: '湖北省政务知识库系统',
  text: {
    主题运营: '主题创建管理',
    文章管理: '解读文件',
  },
  bg: 'login_hubei.png',
  runtimeText: {
    拆解状态: '关联材料',
    材料拆解: '关联材料',
    拆解材料: '材料库',
    创建拆解材料: '添加材料',
    编辑拆解材料: '编辑材料',
    未拆解: '未关联',
    已拆解: '已关联',
  },
  routesList(routes, allRoutes) {
    const routesFilterAuth = getfilterAuth(allRoutes, needFilter);
    // routesArray路由path数组，routesFilterAuth 隐藏路由对应需要隐藏的权限
    return { routesArray: _.difference(routes, needFilter), routesFilterAuth };
  },
};
