const _ = require('lodash');
const { authEnum } = require('../../../../config/authEnum');
const { adaptText } = require('../../../../config/utils');
const generatRight = require('../../../cook/right');

function gPaths(paths, ...names) {
  return `/${[...paths, ...names].join('/')}`;
}

const yyyzRelativeFilesRight = {
  name: '"一业一证"相关文件',
  desc: '"一业一证"相关文件',
  status: 'VALID',
  children: {},
  hasLeaf: true,
};

const performanceRight = {
  name: '"一业一证"效能分析',
  desc: '"一业一证"效能分析',
  status: 'VALID',
  children: {
    runtimeStatistics: {
      name: '运行情况统计',
      key: 'runtimeStatistics',
      status: 'VALID',
    },
    dailyReportStatistics: {
      name: '日常报表统计',
      key: 'dailyReportStatistics',
      status: 'VALID',
    },
    processStatusMonitoring: {
      name: '办件状态统计',
      key: 'processStatusMonitoring',
      status: 'VALID',
    }
  },
  hasLeaf: false,
};

const extendRights = {
  yyyz: {
    name: '"一业一证"制证发证',
    desc: '"一业一证"制证发证',
    status: 'VALID',
    children: {
      yyyzbasicInfo: {
        name: '基本信息',
        desc: '一业一证相关权限',
        status: 'VALID',
        children: {
          statistics: {
            name: '统计信息',
            key: 'yyyzbasicInfo_statistics',
            status: 'VALID',
          },
          businessType: {
            name: '业态管理',
            key: 'yyyzbasicInfo_businessType',
            status: 'VALID',
          },
          temp: {
            name: '模版管理',
            key: 'yyyzbasicInfo_temp',
            status: 'VALID',
          }
        },
        hasLeaf: true,
      },
      yyyzmakeCertificate: {
        name: '制证管理',
        desc: '制证管理相关权限',
        status: 'VALID',
        children: {
          make: {
            name: '证照制证',
            key: 'yyyzmakeCertificate_make',
            status: 'VALID',
          },
          management: {
            name: '证照管理',
            key: 'yyyzmakeCertificate_management',
            status: 'VALID',
          },
          linkSearch: {
            name: '证照管理',
            key: 'yyyzmakeCertificate_linkSearch',
            status: 'VALID',
          }
        },
        hasLeaf: true,
      },
      yyyzprovide: {
        name: '发证管理',
        status: 'VALID',
        children: {
          info: {
            name: '发证信息',
            key: 'yyyzprovide_info',
            status: 'VALID',
          },
        },
        hasLeaf: true,
      },
    },
    hasLeaf: false,
  },
  window: {
    name: '“一业一证”综窗收件',
    desc: '“一业一证”综窗收件',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  }
};


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
const needFilter = [
  '/content/connect',
  '/content/reviewPoint',
  '/content/ask',
  '/content/archivesLibMenu',
  '/content/efficacy',
  '/content/knowledgeLibWorkOrder',
  '/content/portraitMenu',
  '/content/sceneDataReuse',
  '/content/recommendationMenu',
  '/content/messageMenu',
  '/content/summaryInfo',
  '/content/policyKnowledgeLib/policyContent',
  '/content/policyKnowledgeLib/policyGraph',
  '/content/policyKnowledgeLib/institutionManage',
  '/content/policyKnowledgeLib/article',
  '/content/policyKnowledgeLib/service',
  '/content/policyKnowledgeLib/projectManage',
  '/content/policyKnowledgeLib/policyProjectSync',
  '/content/policyKnowledgeLib/policyExplain',
  '/content/policyKnowledgeLib/hotline',
  '/content/policyKnowledgeLib/matterHandleGuide',
  `/content/policyKnowledgeLib/smartQa`,
  '/app',
  '/model',
];

// 内容运营
function yyyzconsole({ text }) {
  const rName = 'yyyzconsole';
  return {
    path: '/yyyzconsole',
    name: '“一业一证“制证发证',
    rName,
    header: true,
    icon: 'HddOutlined',
    component: '../layouts/SecurityLayout',
    authority: [authEnum.yyyz],
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [
          {
            path: `/${rName}`,
            redirect: `/${rName}/home`,
          },
          {
            path: `/${rName}/home`,
            fullScreen: true,
            url: '/tongban/yyyzconsole/index/statisticalManage',
            component: './iframeSystemPage',
          }],
      },
    ],
  };
};

// 内容运营
function yyyzwindow({ text }) {
  const rName = 'yyyzwindow';
  return {
    path: '/yyyzwindow',
    name: '“一业一证”综窗收件',
    rName,
    header: true,
    icon: 'HddOutlined',
    component: '../layouts/SecurityLayout',
    authority: [authEnum.window],
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [
          {
            path: `/${rName}`,
            redirect: `/${rName}/home`,
          },
          {
            path: `/${rName}/home`,
            fullScreen: true,
            url: '/tongban/yyyzwindow/receivingRegistration',
            component: './iframeSystemPage',
          }],
      },
    ],
  };
};

function content({ text, paths, routerRegisters }) {
  const rName = 'content';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.content],
    path,
    name: '“一业一证”综合管理',
    rName,
    header: true,
    icon: 'HddOutlined',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [{
          path,
          redirect: `${path}/yyyzMatters/matters`,
        },
          ..._.concat(
            routerRegisters['yyyzMatters']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['yyyzScenes']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['yyyzOneform']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['yyyzSpecialColumn']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['yyyzPolicyKnowledgeLib']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['yyyzRelativeFiles']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['performance']({ text, routerRegisters, paths: nextPaths }),
          ),
        ]
      },
    ],
  };
}

function yyyzMatters({ text, paths, routerRegisters }) {
  const rName = 'yyyzMatters';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.themeManage],
    path,
    rName,
    name: '"一业一证"事项管理',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: `${path}/matters`,
      },
      ..._.concat(
        routerRegisters['matters']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}


function yyyzScenes({ text, paths, routerRegisters }) {
  const rName = 'yyyzScenes';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.scenes],
    path,
    rName,
    name: '"一业一证"事项管理',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: `${path}/matters`,
      },
      ..._.concat(
        routerRegisters['scenes']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['scenesQA']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['scenesAudit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['yyyzDict']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

function yyyzDict({ text, paths, routerRegisters }) {
  const rName = 'dict';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.dictManage],
    path,
    rName,
    name: '业态分类',
    component: './dictManage',
  };
}

function yyyzOneform({ text, paths, routerRegisters }) {
  const rName = 'yyyzOneform';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    authority: [authEnum.themeManage],
    name: '"一业一证"一表管理',
    icon: 'ContainerOutlined',
    component: './designOneForm',
  };
}

function yyyzSpecialColumn({ text, paths, routerRegisters }) {
  const rName = 'yyyzSpecialColumn';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.oneMatter],
    path,
    rName,
    name: '"一业一证"专区管理',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: `${path}/matters`,
      },
      ..._.concat(
        routerRegisters['oneMatter']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

function yyyzPolicyKnowledgeLib({ text, paths, routerRegisters }) {
  const rName = 'yyyzPolicyKnowledgeLib';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.themeManage],
    path,
    rName,
    name: '"一业一证"知识管理',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: `${path}/matters`,
      },
      ..._.concat(
        routerRegisters['synonyms']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['policyWords']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

function yyyzRelativeFiles({ paths }) {
  const rName = 'yyyzRelativeFiles';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.themeManage],
    path: '/content/yyyzRelativeFiles',
    name: '"一业一证"相关文件',
    icon: 'ContainerOutlined',
    component: './building',
  };
}


function performance({ text, paths, routerRegisters }) {
  const rName = 'performance';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.performance],
    path,
    rName,
    name: '"一业一证"效能分析',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: `${path}/runtimeStatistics`,
      },
      {
        authority: [authEnum.runtimeStatistics],
        path: `${path}/runtimeStatistics`,
        rName: 'runtimeStatistics',
        name: '运行情况统计',
        url: '/tongban/yyyzstatistic/index.html/#/runtimeStatistics',
        component: './iframeSystemPage',
      },
      {
        authority: [authEnum.dailyReportStatistics],
        path: `${path}/dailyReportStatistics`,
        rName: 'dailyReportStatistics',
        name: '日常报表统计',
        url: '/tongban/yyyzstatistic/index.html/#/dailyReportStatistics',
        component: './iframeSystemPage',
      },
      {
        authority: [authEnum.processStatusMonitoring],
        path: `${path}/processStatusMonitoring`,
        rName: 'processStatusMonitoring',
        name: '办件状态统计',
        url: '/tongban/yyyzstatistic/index.html/#/processStatusMonitoring',
        component: './iframeSystemPage',
      },
    ],
  };
}

module.exports = {
  title: '湖北省"一业一证"综合审批系统',
  text: {
    事项管理: '事项基本信息',
    事项同步: '事项信息同步',
    主题管理: '业态配置',
    主题审核: '业态审核',
    主题专栏: '专区配置',
    政务百科词条: '政务百科',
  },
  bg: 'login_hubei.png',
  projectBaseUrl: '/tongban/yslbmiddle',
  runtimeText: {
    主题名称: '业态名称',
    主题创建: '业态创建',
    主题类型: '业态类型',
    主题预览: '业态场景预览',
    引导问卷: '情形引导问卷',
    办理条件: '条件预检',
    主题标签: '业态标签',
    关联服务: '解读配置',
    主题分类: '业态分类',
    这件事解读: '解读配置',
    一级名称: '事项名称',
    二级名称: '分项名称',
    三级名称: '办理项名称',
    产品手册: '系统操作手册',
  },
  routesList(routes, allRoutes) {
    const routesFilterAuth = getfilterAuth(allRoutes, needFilter);
    // routesArray路由path数组，routesFilterAuth 隐藏路由对应需要隐藏的权限
    return { routesArray: _.difference(routes, needFilter), routesFilterAuth };
  },

  rightGenerate() {
    generatRight((dict) => {
      dict.content.children.yyyzRelativeFiles = yyyzRelativeFilesRight;
      dict.content.children.performance = performanceRight;
      return {
        ...dict,
        ...extendRights,
      };
    });
  },

  menuGenerate({ text = {}, menuRegisters = {} }, generate) {
    const { ...others } = menuRegisters;
    const nextMenuRegisters = {
      ...others,
      content,
      yyyzconsole,
      yyyzScenes,
      yyyzwindow,
      yyyzMatters,
      yyyzDict,
      yyyzOneform,
      yyyzSpecialColumn,
      yyyzPolicyKnowledgeLib,
      yyyzRelativeFiles,
      performance,
    };
    return generate(
      adaptText(text),
      {
        homePage: '/content/yyyzMatters/matters',
        entry: ['content', 'yyyzconsole', 'yyyzwindow', 'system'],
      },
      nextMenuRegisters,
    );
  }
};

