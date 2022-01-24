const fs = require('fs');
const join = require('path').join;
const _ = require('lodash');
const defaultSetting = require(`../../../config/defaultSettings.js`);
const digRouter = require('./digRouter');
const { text, ...otherDefaultSetting } = defaultSetting;
const generatRight = require('../../cook/right');

function defaultRightGenerate() {
  generatRight();
}

module.exports = (project) => {
  const projectSetting = project ? require(`./projects/${project}.js`) : {};
  const { defaultGenerate, generate, routerRegisters } = require('../../../config/routes');
  const { text: projectText, menuGenerate = defaultGenerate, rightGenerate = defaultRightGenerate, ...otherProjectSetting } = projectSetting;
  rightGenerate();
  const current = { ...otherDefaultSetting, ...otherProjectSetting };
  const { bg, ...others } = current;
  const { routesList } = current;
  const nextText = { ...text, ...projectText };
  // 1,合成路由表 2,nextText(文字转换)
  const routers = menuGenerate({ text: nextText, menuRegisters: routerRegisters }, generate);

  // 根据routesList方法进行路由与权限的过滤
  const { currentRoutes, routesFilterAuth } = digRouter(routers, routesList);
  // 对权限数组去重
  const allAuthFilter = _.union(routesFilterAuth);
  fs.writeFileSync(
    join(__dirname, '.', 'Setting.js'),
    `const setting =  ${JSON.stringify(others)};
    const text = ${JSON.stringify(nextText)};
    const authFilter = ${JSON.stringify(allAuthFilter)};
    const currentRoutes = ${JSON.stringify(currentRoutes)};
    module.exports =  {...setting, text, authFilter, currentRoutes };
  `,
  );

  fs.writeFileSync(
    join(__dirname, '.', 'images.js'),
    `import bg from './images/${bg}';
export default {bg};
  `,
  );

  return { currentRoutes, ...others };
};
