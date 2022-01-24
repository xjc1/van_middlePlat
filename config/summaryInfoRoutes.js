const _ = require('lodash');

// 统计信息方法
const summaryInfoMethod = {
  getSynonymsSummary: 'M01', // 问答记录数
  exportSynonymsSummary: 'M08', // 问答记录导出
  getHotQuestionSummary: 'M11', // 热门问题统计
  getQaSatisfactionSummary: 'M18', // 问答满意度统计
  getFootPrintSummary: 'M03', // 足迹数
  getLoginSummary: 'M02', // 登录数
  getLoginRepeatRate: 'M10', // 用户重复登录率
  getSort: 'M04', // 点击排序
  exportScenes: 'M09', // 导出主题记录数据
  getUserSummary: 'M06', // 注册，新增，男女，各年龄段用户数
  getLicenseSummary: 'M07', // 证照统计
  getOneFormSummary: 'M05', // 提交办理量
};

const messageRoutes = {
  msgList: {
    path: 'messageStatistic',
    name: '消息统计',
    rName: 'messageStatistic',
    component: './summaryInfo/messageStatistic',
  },
  msgSend: {
    path: 'messageStatistic/sendList',
    rName: 'messageStatistic_sendList',
    name: '消息推送',
    hideInMenu: true,
    component: './summaryInfo/messageStatistic/messageSendList',
  },
  warnList: {
    path: 'messageStatistic/warnList',
    rName: 'messageStatistic_warnList',
    name: '提醒列表',
    hideInMenu: true,
    component: './summaryInfo/messageStatistic/MessageWarnList',
  },
};

// 画像统计
const tagSummaryRoutes = {
  tagTotal: {
    path: 'portraitStatistics',
    rName: 'portraitStatistics',
    name: '画像统计',
    component: './portraitStatistics',
  },
  tagCount: {
    path: 'portraitStatistics/tagCount',
    name: '标签数',
    rName: 'portraitStatistics_tagCount',
    hideInMenu: true,
    component: './portraitStatistics/TagCount',
  },
  appScene: {
    path: 'portraitStatistics/appScene',
    name: '应用场景',
    rName: 'portraitStatistics_appScene',
    hideInMenu: true,
    component: './portraitStatistics/AppScene',
  },
  customer: {
    path: 'portraitStatistics/customer',
    name: '用户覆盖',
    rName: 'portraitStatistics_customer',
    hideInMenu: true,
    component: './portraitStatistics/Customer',
  },

  refresh: {
    path: 'portraitStatistics/refresh',
    name: '刷新',
    rName: 'portraitStatistics_refresh',
    hideInMenu: true,
    component: './portraitStatistics/PortraitRefresh',
  },
};

// 问答统计菜单
const synonymsRoutes = {
  synonyms: {
    path: 'synonyms',
    name: '问答统计',
    alias: '问答记录数',
    rName: 'synonyms_statistics',
    method: {
      list: summaryInfoMethod.getSynonymsSummary,
      export: summaryInfoMethod.exportSynonymsSummary,
    },
    component: './summaryInfo/synonymsSummary',
  },
  synonymsHotQuestion: {
    path: 'synonyms/hotQuestion',
    name: '热门问题统计',
    rName: 'synonyms_hotQuestion',
    method: { list: summaryInfoMethod.getHotQuestionSummary },
    hideInMenu: true,
    component: './summaryInfo/synonymsHotQuestion',
  },
  synonymsQaSatisfied: {
    path: 'synonyms/qaSatisfied',
    name: '问答满意度',
    rName: 'synonyms_qaSatisfied',
    method: { list: summaryInfoMethod.getQaSatisfactionSummary },
    hideInMenu: true,
    component: './summaryInfo/synonymsQaSatisfied',
  },
};

// 行为统计
const behaviorRoutes = {
  behavior: {
    path: 'behavior',
    name: '行为统计',
    rName: 'behavior',
    alias: '足迹数',
    method: {
      list: summaryInfoMethod.getFootPrintSummary,
      export: summaryInfoMethod.exportScenes,
    },
    component: './summaryInfo/behaviorFootPrint',
  },

  behaviorLoginNum: {
    path: 'behavior/loginNum',
    name: '登录数',
    rName: 'behavior_loginNum',
    hideInMenu: true,
    method: { list: summaryInfoMethod.getLoginSummary },
    component: './summaryInfo/behaviorLoginNum',
  },

  behaviorLoginRepeat: {
    path: 'behavior/loginRepeat',
    name: '用户重复登录率',
    rName: 'behavior_loginRepeat',
    method: { list: summaryInfoMethod.getLoginRepeatRate },
    hideInMenu: true,
    component: './summaryInfo/behaviorLoginRepeat',
  },
  behaviorSort: {
    path: 'behavior/sort',
    name: '点击排序',
    rName: 'behavior_sort',
    method: { list: summaryInfoMethod.getSort },
    hideInMenu: true,
    component: './summaryInfo/behaviorSort',
  },
};

// 用户统计
const userRoutes = {
  user: {
    path: 'user',
    name: '用户统计',
    rName: 'user_statistics',
    alias: '注册用户数',
    method: { list: summaryInfoMethod.getUserSummary },
    component: './summaryInfo/userRegisterNum',
  },
  userAddNum: {
    path: 'user/addNum',
    name: '新增用户数',
    rName: 'user_addNum',
    hideInMenu: true,
    method: { list: summaryInfoMethod.getUserSummary },
    component: './summaryInfo/userAddNum',
  },
  userSex: {
    path: 'user/sex',
    name: '男女用户数',
    rName: 'user_sex',
    hideInMenu: true,
    method: { list: summaryInfoMethod.getUserSummary },
    component: './summaryInfo/userSex',
  },
  userAge: {
    path: 'user/age',
    name: '各年龄段用户数',
    rName: 'user_age',
    hideInMenu: true,
    method: { list: summaryInfoMethod.getUserSummary },
    component: './summaryInfo/userAge',
  },
};

// 证照统计
const licenceRoutes = {
  licence: {
    path: 'licence',
    name: '证照统计',
    rName: 'licence',
    alias: '涉及证照数',
    method: { list: summaryInfoMethod.getLicenseSummary },
    component: './summaryInfo/licenceNum',
  },
};

// 一表统计
const oneformRoutes = {
  oneform: {
    path: 'oneform',
    name: '一表统计',
    rName: 'oneform_statistics',
    alias: '提交办理量',
    method: { list: summaryInfoMethod.getOneFormSummary },
    component: './summaryInfo/oneformNum',
  },
};

const formatRoutes = routesObj => {
  const routesObjValues = Object.values(routesObj);
  return routesObjValues.map(({ method, alias, ...others }) => ({ ...others }));
};

// 生成对应的路由
const summaryInfoRoutes = formatRoutes(
  Object.assign(
    {},
    messageRoutes,
    tagSummaryRoutes,
    synonymsRoutes,
    behaviorRoutes,
    userRoutes,
    licenceRoutes,
    oneformRoutes,
  ),
);

module.exports = {
  messageRoutes,
  tagSummaryRoutes,
  synonymsRoutes,
  behaviorRoutes,
  userRoutes,
  licenceRoutes,
  oneformRoutes,
  summaryInfoRoutes({ paths = [] }) {
    return _.map(summaryInfoRoutes, ({ path, ...others }) => {
      return {
        path: '/' + [...paths, path].join('/'),
        ...others,
      };
    });
  },
};
