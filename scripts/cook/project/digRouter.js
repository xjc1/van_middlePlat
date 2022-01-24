const fs = require('fs');
const join = require('path').join;
const _ = require('lodash');

function digRouter(routers, pathList = [], pathHash = {}) {
  routers.forEach(({ path, rName, routes = [] }) => {
    path && pathList.push(path);
    if (rName) {
      if (pathHash[rName]) {
        throw new Error(rName);
      } else {
        pathHash[rName] = path;
      }
    }
    digRouter(routes, pathList, pathHash);
  });
  return { pathList, pathHash };
}

function getCurrentRouter(routers, list = []) {
  return _.reduce(
    routers,
    (result, route) => {
      const { path, routes } = route;
      if (_.includes(list, path)) {
        if (routes) {
          route.routes = getCurrentRouter(routes, list);
        }
        result.push(route);
      }
      return result;
    },
    [],
  );
}

module.exports = (routers, routesList) => {
  const { pathList, pathHash } = digRouter(routers);
  const list = _.union(
    _.map(pathList, item => {
      return `'${item}'`;
    }),
  );

  fs.writeFileSync(
    join(__dirname, '..', '..', '..', 'src', 'utils', 'pathHash.js'),
    `
    // 此代码为生成
 const pathHask = ${JSON.stringify(pathHash, null, 2)};
 export default pathHask;
  `,
  );

  fs.writeFileSync(
    join(__dirname, '.', 'routerList.js'),
    `
module.exports = [
${list.join(',\n')}
];
  `,
  );

  if (routesList) {
    if (_.isFunction(routesList)) {
      const { routesArray, routesFilterAuth } = routesList(pathList, routers);
      return { currentRoutes: getCurrentRouter(routers, routesArray), routesFilterAuth };
    }

    if (_.isArray(routesList)) {
      return { currentRoutes: getCurrentRouter(routers, routesList) };
    }

    throw new Error('配置文件的routers, 只能配置为 数组 或者是方法');
  } else {
    return { currentRoutes: routers };
  }
};
