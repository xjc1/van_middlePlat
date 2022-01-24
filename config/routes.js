const _ = require('lodash');
const iframePagesEnum = require('./iframePagesEnum');
const { summaryInfoRoutes } = require('./summaryInfoRoutes');
const { authEnum } = require('./authEnum');
const { adaptText } = require('./utils');

function transport({ routerRegisters, routers = [], paths = [], text }) {
  return _.concat(_.map(routers, (name) => {
    return routerRegisters[name]({ text, routerRegisters, paths });
  }));
};

function gPaths(paths, ...names) {
  return `/${[...paths, ...names].join('/')}`;
}

function test({ text, paths, routerRegisters }) {
  return {
    path: '/test',
    rName: 'test',
    component: './test',
  };
};

// 内容运营
function content({ text, paths, routerRegisters }) {
  const rName = 'content';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.content],
    path,
    name: text('内容运营'),
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
          redirect: `${path}/policyKnowledgeLib/policyContent`,
        },
          ..._.concat(
            routerRegisters['connect']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['do']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['policyKnowledgeLib']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['reviewPoint']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['ask']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['archivesLibMenu']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['efficacy']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['knowledgeLibWorkOrder']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['portraitMenu']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['sceneDataReuse']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['recommendationMenu']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['messageMenu']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['certification']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['tool']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['summaryInfo']({ text, routerRegisters, paths: nextPaths }),
            {
              component: './404',
            },
          ),
        ]
      },
      {
        component: './404',
      },
    ],
  };
};

// 主题接入管理
function connect({ text, paths, routerRegisters }) {
  const rName = 'connect';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.themeManage],
    path,
    rName,
    name: '主题接入管理',
    icon: 'RobotOutlined',
    routes: [
      {
        path,
        redirect: `${path}/themeAccess`,
      },
      ..._.concat(
        routerRegisters['themeAccess']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['themeAudit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['infoLibrary']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ],
  };
}

// 业务梳理
function themeAccess({ paths }) {
  const rName = 'themeAccess';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.themeAccess],
    path,
    rName,
    name: '业务梳理',
    component: './themeAccess',
  };
}

// 业务梳理
function themeAudit({ paths }) {
  const rName = 'themeAudit';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.themeAudit],
    path,
    rName,
    name: '梳理确认',
    component: './themeAudit',
  };
}

// 基本信息库
function infoLibrary({ paths }) {
  const rName = 'infoLibrary';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.infoLibrary],
      path,
      rName,
      name: '基本信息库',
      component: './infoLibrary',
    },
    {
      path: `${path}/viewInfo`,
      rName: `${rName}_viewInfo`,
      hideInMenu: true,
      component: './infoLibrary/ViewInfo',
    },
    {
      path: `${path}/editInfo`,
      rName: `${rName}_editInfo`,
      hideInMenu: true,
      component: './infoLibrary/EditInfo',
    },
    {
      path: `${path}/createInfo`,
      rName: `${rName}_createInfo`,
      hideInMenu: true,
      component: './infoLibrary/createInfoLibrary',
    },
  ];
}

// 主题管理
function _do({ text, paths }) {
  const rName = 'do';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.themeOperation],
    path,
    name: '主题管理',
    icon: 'AuditOutlined',
    rName,
    routes: [
      {
        path,
        redirect: gPaths(paths, rName, 'scenes'),
      },
      ..._.concat(
        routerRegisters['matters']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['materialSplit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['scenes']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['scenesQA']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['scenesAudit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['oneFormManager']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['oneMatter']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ]
  };
};

// 事项
function matters({ paths, text }) {
  const rName = 'matters';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.matters],
      path,
      rName,
      name: text('事项管理'),
      component: './matters',
    },
    {
      authority: authEnum.matters_edit_alias,
      path: `${path}/new`,
      name: '事项管理/新增',
      rName: `${rName}_new`,
      hideInMenu: true,
      component: './matters/MatterForm',
    },
    {
      authority: authEnum.matters_edit_alias,
      path: `${path}/edit/:matterid`,
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './matters/EditMatter',
    },
    {
      authority: [authEnum.matters],
      path: `${path}/view/:matterid`,
      hideInMenu: true,
      rName: `${rName}_view`,
      component: './matters/ViewMatter',
    },
    {
      path: `${path}/materialSplit/:type/:id`, // 事项-材料拆解
      hideInMenu: true,
      rName: `${rName}_materialSplit`,
      component: './matters/materialSplit',
    },
    {
      path: `${path}/formSplit/:id`, // 事项-材料拆解
      hideInMenu: true,
      rName: `formSplit`,
      component: './matters/formSplit',
    },
    {
      path: `${path}/formCopy/:id`, // 事项-材料拆解
      hideInMenu: true,
      rName: `formCopy`,
      component: './matters/formCopy',
    },
    {
      authority: [authEnum.matters_bluk],
      path: `${path}/bulk`,
      hideInMenu: true,
      rName: `matters_bulk`,
      component: './matters/bulk',
    },
    {
      authority: [authEnum.mattersSync],
      path: `${path}/matterSync`,
      name: text('事项同步'),
      rName: `matterSync`,
      component: './matterSync',
    },
  ];
};

// 事项拆解
function materialSplit({ paths }) {
  const rName = 'materialSplit';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.materialSplit],
      path,
      name: '材料拆解',
      rName,
      component: './materialSplit',
    }
  ];
};

// 主题
function scenes({ text, paths }) {
  const rName = 'scenes';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return [
    {
      authority: [authEnum.scenes],
      path,
      name: text('主题管理'),
      rName,
      component: './scenes',
    },
    {
      authority: authEnum.scenes_edit_alias,
      path: `${path}/create`, // 主题管理/新增
      component: './scenes/editScenes',
      rName: 'sceneinfo',
      hideInMenu: true,
    },
    {
      authority: [authEnum.scenes],// 主题管理/查看
      path: `${path}/view/:sceneId`,
      component: './scenes/ViewScenePage',
      rName: 'scenes_view',
      hideInMenu: true,
    },
    {
      authority: authEnum.scenes_edit_alias,// 主题管理/编辑
      path: `${path}/edit/:sceneId`,
      component: './scenes/EditScenePage',
      rName: 'scenes_edit',
      hideInMenu: true,
    },
    {
      authority: [authEnum.scenes_bluk], // 主题管理/批量操作
      path: `${path}/bulk`,
      component: './scenes/bulk',
      rName: 'scenes_bulk',
      hideInMenu: true,
    },
    ..._.concat(
      routerRegisters['conditions']({ text, routerRegisters, paths: nextPaths }),
    ),
  ];
};

// 引导问卷
function scenesQA({ paths }) {
  const rName = 'scenesQA';
  const path = gPaths(paths, rName);
  return [
    {
      path: path,
      name: '引导问卷',
      rName,
      hideInMenu: true,
      component: './scenesQA',
    },
    {
      path: `${path}/:scenesId`,
      rName: `${rName}_none`,
      hideInMenu: true,
      redirect: `${path}/:scenesId/none`,
    },
    {
      authority: [authEnum.scenes],
      path: `${path}/:scenesId/:nodeId`,
      rName: `${rName}_node`,
      hideInMenu: true,
      component: './scenesQA',
    },
  ];
};

// 主题审核
function scenesAudit({ text, paths }) {
  const rName = 'scenesAudit';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.scenesAudit],
      path,
      rName,
      name: text('主题审核'),
      component: './scenesAudit',
    },
    {
      authority: [authEnum.scenesAudit],
      path: `${path}/view/:sceneId`,
      rName: `${rName}_view`,
      component: './scenes/ViewScenePage',
      hideInMenu: true,
    },
    {
      authority: [authEnum.scenesAudit],
      path: `${path}/audit/:sceneId`,
      rName: `${rName}_audit`,
      component: './scenesAudit/AuditPage',
      hideInMenu: true,
    },
  ];
};

// 条件
function conditions({ paths }) {
  const rName = 'conditions';
  const path = gPaths(paths, rName);
  return [
    {
      path: `${path}/:sceneId`,
      hideInMenu: true,
      rName,
      redirect: `${path}/:sceneId/none`,
    },
    /* {
       path: `${path}/:sceneId`,
       name: '主题办理条件',
       rName: 'conditions',
       hideInMenu: true,
       component: './scenes/handlingConditions',
     },*/
    {
      path: `${path}/:sceneId/:nodeId`,
      name: '主题办理条件/节点',
      rName: 'conditions_node',
      hideInMenu: true,
      component: './scenes/handlingConditions',
    },
  ];
};

// 一表管理
function oneFormManager({ paths }) {
  const rName = 'oneFormManager';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.oneFormManager],
    path,
    rName,
    name: '一表管理',
    component: './jumpPage',
  };
};

// 主题专栏 原一表联办
function oneMatter({ text, paths }) {
  const rName = 'oneMatter';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.oneMatter],
      path,
      rName,
      name: text('主题专栏'), // 原 一事联办
      component: './oneMatter',
    },
    {
      authority: [authEnum.oneMatter],
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '主题专栏/新增', // 原 一事联办
      component: './oneMatter/editOneMatter',
      hideInMenu: true,
    },
    {
      authority: [authEnum.oneMatter],
      path: `${path}/view/:oneMatterId`,
      rName: `${rName}_view`,
      name: '主题专栏/查看', // 原 一事联办
      component: './oneMatter/ViewOneMatterPage',
      hideInMenu: true,
    },
    {
      authority: [authEnum.oneMatter],
      path: `${path}/edit/:oneMatterId`,
      rName: `${rName}_edit`,
      name: '主题专栏/编辑', // 原 一事联办
      component: './oneMatter/EditOneMatterPage',
      hideInMenu: true,
    },
  ];
};

// 知识库
function policyKnowledgeLib({ text, paths }) {
  const rName = 'policyKnowledgeLib';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.policyKnowledgeLib],
    path,
    rName,
    name: '政务知识库',
    icon: 'ContainerOutlined',
    routes: [
      {
        path,
        redirect: '/content/policyKnowledgeLib/policyContent',
      },
      ..._.concat(
        routerRegisters['policyContent']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['policyGraph']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['policyWords']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['institutionManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['article']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['service']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['projectManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['synonyms']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['policyExplain']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['hotline']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['matterHandleGuide']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['smartQa']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

// 政策原文
function policyContent({ paths }) {
  const rName = 'policyContent';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.policyContent],
      path,
      rName,
      name: '政策原文',
      component: './policyContent',
    },
    {
      path: `${path}/new`,
      rName: `${rName}_new`,
      name: '新增政策',
      component: './policyContent/policyContentForm',
      hideInMenu: true,
    },
    {
      path: `${path}/edit/:policyId`,
      rName: `${rName}_edit`,
      name: '编辑政策',
      component: './policyContent/EditPolicyContent',
      hideInMenu: true,
    },
    {
      path: `${path}/view/:policyId`,
      rName: `${rName}_view`,
      name: '查看政策',
      component: './policyContent/ViewPolicyContent',
      hideInMenu: true,
    },
    {
      authority: [authEnum.policyContent],
      rName: `${rName}_bulk`,
      path: `${path}/bulk`,
      component: './policyContent/bulk',
      name: '政策正文/批量操作',
      hideInMenu: true,
    },
    {
      authority: [authEnum.policyContent],
      path: `${path}/bulk/:id`,
      rName: `${rName}_bulk_id`,
      component: './policyContent/bulk',
      name: '政策正文/重复政策批量操作',
      hideInMenu: true,
    },
  ];
}

// 政策图谱
function policyGraph({ paths }) {
  const rName = 'policyGraph';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.policyGraph],
      path,
      rName,
      name: '政策图谱',
      component: './policyGraph',
    },
    {
      path: `${path}/bulk`,
      rName: `${rName}_bulk`,
      hideInMenu: true,
      component: './policyGraph/bulk',
    },
  ];
}

// 政务百科词条
function policyWords({ text, paths }) {
  const rName = 'policyWords';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.policyWord],
    path,
    rName,
    name: text('政务百科词条'),
    component: './policyWords',
  };
}

// 机构信息
function institutionManage({ paths }) {
  const rName = 'institutionManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.institutionManage],
      path,
      rName,
      name: '部门信息',
      component: './institutionManage',
    },
    {
      authority: authEnum.institutionManage_edit_alias,
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '机构编辑',
      hideInMenu: true,
      component: './institutionManage/EditInstitution',
    },
    {
      authority: [authEnum.institutionManage],
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '机构查看',
      hideInMenu: true,
      component: './institutionManage/ViewInstitution',
    },
    {
      authority: authEnum.institutionManage_edit_alias,
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '机构新增',
      hideInMenu: true,
      component: './institutionManage/EditInstitution',
    },
  ];
}

// 通知公告
function article({ text, paths }) {
  const rName = 'article';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.article],
      path,
      rName,
      name: text('通知公告'),
      component: './article',
    },
    {
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '文章管理/添加',
      hideInMenu: true,
      component: './article/editArticleForm',
    },
    {
      path: `${path}/edit/:articleId`,
      rName: `${rName}_edit`,
      name: '文章管理/编辑',
      hideInMenu: true,
      component: './article/EditArticle',
    },
    {
      path: `${path}/view/:articleId`,
      rName: `${rName}_view`,
      name: '文章管理/查看',
      hideInMenu: true,
      component: './article/ViewArticle',
    },
  ];
}

// 服务管理
function service({ paths }) {
  const rName = 'service';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.service],
      path,
      rName,
      name: '服务管理',
      component: './serviceMenu',
    },
    {
      authority: authEnum.service_edit_alias,
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '服务管理/新增服务管理',
      component: './serviceMenu/editService',
      hideInMenu: true,
    },
    {
      authority: [authEnum.service],
      path: `${path}/view/:serviceid`,
      name: '服务管理/查看服务管理',
      rName: `${rName}_view`,
      component: './serviceMenu/ViewServicePage',
      hideInMenu: true,
    },
    {
      authority: authEnum.service_edit_alias,
      path: `${path}/edit/:serviceid`,
      name: '服务管理/编辑服务管理',
      rName: `${rName}_edit`,
      component: './serviceMenu/EditServicePage',
      hideInMenu: true,
    },
    {
      authority: [authEnum.service_bulk],
      path: `${path}/bulk`,
      name: '服务管理/批量操作',
      rName: `${rName}_bulk`,
      component: './serviceMenu/bulk',
      hideInMenu: true,
    },
  ];
}

// 项目管理
function projectManage({ paths }) {
  const rName = 'projectManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.projectManage],
      path,
      rName,
      name: '申报项目',
      component: './projectManage',
    },
    {
      authority: authEnum.projectManage_edit_alias,
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '项目管理/编辑项目管理',
      component: './projectManage/EditProject',
      hideInMenu: true,
    },
    {
      authority: authEnum.projectManage_edit_alias,
      path: `${path}/create`,
      name: '项目管理新增',
      rName: `${rName}_create`,
      component: './projectManage/compontents/CreateProject',
      hideInMenu: true,
    },
    {
      authority: [authEnum.projectManage],
      path: `${path}/view/:id`,
      name: '项目管理查看',
      rName: `${rName}_view`,
      component: './projectManage/ViewProject',
      hideInMenu: true,
    },
    {
      authority: authEnum.projectManage_edit_alias,
      path: `${path}/projectExam/:id`,
      name: '项目体检',
      rName: `${rName}_exam`,
      component: './projectExam',
      hideInMenu: true,
    },
  ];
}

// 政策项目同步
function policyProjectSync({ paths }) {
  const rName = 'policyProjectSync';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.policyProjectSync],
    path,
    rName,
    name: '政策项目同步',
    component: './policyProjectSync',
  };
}

// 问答管理
function synonyms({ paths }) {
  const rName = 'synonyms';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.synonyms],
      path,
      rName,
      name: '常见问题',
      component: './synonyms',
    },
    {
      authority: [authEnum.synonyms],
      path: `${path}/view`,
      name: '问答管理/查看',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './synonyms/createOrEditQuestionForm/getFormData',
    },
    {
      authority: authEnum.synonyms_edit_alias,
      path: `${path}/edit`,
      name: '问答管理/编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './synonyms/createOrEditQuestionForm/getFormData',
    },
    {
      authority: authEnum.synonyms_edit_alias,
      path: `${path}/create`,
      name: '问答管理/创建',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './synonyms/createOrEditQuestionForm/getFormData',
    },
  ];
}

// 政策解读
function policyExplain({ paths }) {
  const rName = 'policyExplain';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.policyExplain],
      path,
      rName,
      name: '政策解读',
      component: './policyExplain',
    },
    {
      authority: authEnum.policyContent_edit_alias,
      path: `${path}/create`,
      name: '政策解读/创建',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './policyExplain/policyExplainForm',
    },
    {
      authority: authEnum.policyContent_edit_alias,
      path: `${path}/edit/:policyExplainId`,
      name: '政策解读/编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './policyExplain/EditPolicyExplain',
    },
    {
      authority: [authEnum.policyExplain],
      path: `${path}/view/:policyExplainId`,
      name: '政策解读/查看',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './policyExplain/ViewPolicyExplain',
    },
  ];
}

// 热线电话
function hotline({ paths }) {
  const rName = 'hotline';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.hotline],
      path,
      rName,
      name: '热线电话',
      component: './hotline',
    },
    {
      authority: authEnum.hotline_edit_alias,
      path: '/content/policyKnowledgeLib/hotline/create',
      name: '热线电话/创建',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './hotline/hotlineForm',
    },
    {
      authority: authEnum.hotline_edit_alias,
      path: '/content/policyKnowledgeLib/hotline/edit/:hotlineId',
      name: '热线电话/编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './hotline/EditHotline',
    },
    {
      authority: [authEnum.hotline],
      path: '/content/policyKnowledgeLib/hotline/view/:hotlineId',
      name: '热线电话/查看',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './hotline/ViewHotline',
    },
  ];
}

// 网上办事指引
function matterHandleGuide({ paths }) {
  const rName = 'matterHandleGuide';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.matterHandleGuide],
      path,
      rName,
      name: '网上办事指引',
      component: './matterHandleGuide',
    },
    {
      authority: authEnum.matterHandleGuide_edit_alias,
      path: `${path}/edit`,
      name: '网上办事指引/创建',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './matterHandleGuide/EditMatterHandleGuide',
    },
    {
      authority: authEnum.matterHandleGuide_edit_alias,
      path: `${path}/edit/:id`,
      name: '网上办事指引/编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './matterHandleGuide/EditMatterHandleGuide',
    },
    {
      authority: [authEnum.matterHandleGuide],
      path: `${path}/view/:id`,
      name: '网上办事指引/查看',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './matterHandleGuide/ViewMatterHandleGuide',
    },
  ];
}

// 智能小申
function smartQa({ paths }) {
  const rName = 'smartQa';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.smartQa],
    path,
    rName,
    target: 'qaGuide',
    name: '智能小申',
    component: './IframePagesWithConfig',
  };
}

// 审查要素库
function reviewPoint({ paths }) {
  const rName = 'reviewPoint';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.reviewPoint],
      path,
      rName,
      name: '审查要素库',
      icon: 'InboxOutlined',
      component: './reviewPoint',
    },
    {
      path: `${path}/specialStep/:matterId`,
      component: './reviewPoint/specialStepList',
      rName: `${rName}_specialStep`,
      hideInMenu: true,
    },
    {
      path: `${path}/applyConditionList/:matterId`,
      component: './reviewPoint/applyConditionList',
      rName: `${rName}_applyConditionList`,
      hideInMenu: true,
    },
    {
      path: `${path}/applyMaterialList/:matterId`,
      component: './reviewPoint/applyMaterialList',
      rName: `${rName}_applyMaterialList`,
      hideInMenu: true,
    },
    {
      path: `${path}/formCheckPoint/:matterId`,
      component: './reviewPoint/formCheckPoint',
      rName: `${rName}_formCheckPoint`,
      hideInMenu: true,
    },
  ];
}

// 问答运营
function ask({ text, paths }) {
  const rName = 'ask';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.qaManage],
    path,
    rName,
    name: '问答运营',
    icon: 'CommentOutlined',
    routes: [
      {
        path,
        redirect: '/content/ask/emoticon',
      },
      ..._.concat(
        routerRegisters['emoticon']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['dimensionManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['hotWordsManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['synonymsSetting']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['chatLibrary']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['hotQuestion']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['refresh']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['triggerWords']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['functionWords']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['professionalWords']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['rubbishWords']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['dialogManager']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ]
  };
}

// 表情包管理
function emoticon({ paths }) {
  const rName = 'emoticon';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.emoticon],
    path,
    rName,
    name: '表情包管理',
    component: './emoticonManage',
  };
}

// 维度管理
function dimensionManage({ paths }) {
  const rName = 'dimensionManage';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.dimensionManage],
    path,
    rName,
    name: '维度管理',
    component: './dimension',
  };
}

// 维度管理
function hotWordsManage({ paths }) {
  const rName = 'hotWordsManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.hotWords],
      path,
      rName,
      name: '热词管理',
      component: './hotWords',
    },
    {
      authority: [authEnum.hotWords],
      path: `${path}/commonQuestion`,
      rName: 'commonQuestion',
      name: '常用问句',
      hideInMenu: true,
      component: './commonQuestion',
    },
  ];
}

// 问答设置
function synonymsSetting({ paths }) {
  const rName = 'synonymsSetting';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.synonymsSetting],
    path,
    rName,
    name: '问答设置',
    component: './synonymsSetting',
  };
}

// 聊天库
function chatLibrary({ paths }) {
  const rName = 'chatLibrary';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.chatLibrary],
      path,
      rName,
      name: '聊天库',
      component: './chatLibrary',
    },
    {
      authority: [authEnum.chatLibrary],
      path: '/content/ask/chatLibrary/view',
      name: '聊天库查看',
      hideInMenu: true,
      rName: `${rName}_view`,
      component: './chatLibrary/chatForm/view',
    },
    {
      authority: authEnum.chatLibrary_edit_alias,
      path: '/content/ask/chatLibrary/add',
      name: '新增聊天库',
      hideInMenu: true,
      rName: `${rName}_add`,
      component: './chatLibrary/chatForm',
    },
    {
      authority: authEnum.chatLibrary_edit_alias,
      path: '/content/ask/chatLibrary/edit',
      name: '编辑聊天库',
      hideInMenu: true,
      rName: `${rName}_edit`,
      component: './chatLibrary/chatForm',
    },
  ];
}

// 热门问题
function hotQuestion({ paths }) {
  const rName = 'hotQuestion';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.hotQuestion],
      path,
      rName,
      name: '热门问题',
      component: './hotQuestion/hotQa',
    },
    {
      authority: [authEnum.hotQuestion],
      path: '/content/ask/hotQuestion/hotMatter',
      name: '热门事项',
      rName: 'hotMatter',
      hideInMenu: true,
      component: './hotQuestion/hotMatter',
    },
    {
      authority: [authEnum.hotQuestion],
      path: '/content/ask/hotQuestion/hotScene',
      name: '热门场景',
      rName: 'hotScene',
      hideInMenu: true,
      component: './hotQuestion/hotScene',
    },
    {
      authority: [authEnum.hotQuestion],
      path: '/content/ask/hotQuestion/hotPolicy',
      name: '热门政策',
      rName: 'hotPolicy',
      hideInMenu: true,
      component: './hotQuestion/hotPolicy',
    },
    {
      authority: [authEnum.hotQuestion],
      path: '/content/ask/hotQuestion/hotService',
      name: '热门服务',
      rName: 'hotService',
      hideInMenu: true,
      component: './hotQuestion/hotService',
    },
    {
      authority: [authEnum.hotQuestion],
      path: '/content/ask/hotQuestion/hotProject',
      name: '热门项目',
      rName: 'hotProject',
      hideInMenu: true,
      component: './hotQuestion/hotProject',
    },
  ];
}

// 刷新
function refresh({ paths }) {
  const rName = 'refresh';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.qaRefresh],
    path,
    rName,
    name: '刷新',
    component: './refresh',
  };
}

// 触发词管理
function triggerWords({ paths }) {
  const rName = 'triggerWords';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.triggerWords],
    path,
    rName,
    name: '触发词管理',
    component: './triggerWords',
  };
}

// 功能词管理
function functionWords({ paths }) {
  const rName = 'functionWords';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.functionWords],
    path,
    rName,
    name: '功能词管理',
    component: './functionWord',
  };
}

// 专业词管理
function professionalWords({ paths }) {
  const rName = 'professionalWords';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.professionalWords],
      path,
      rName,
      name: '专业词管理',
      component: './professionalWords',
    },
    {
      path: `${path}/bulk`,
      name: '专业词管理/批量删除',
      rName: `${rName}_bulk`,
      hideInMenu: true,
      component: './professionalWords/bulk',
    },
    {
      path: `${path}/create`,
      name: '新增专业词',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './professionalWords/CerateProfessionalWords',
    },
    {
      path: `${path}/edit/:id`,
      name: '编辑专业词',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './professionalWords/EditProfessionalWords',
    },
    {
      path: `${path}/view/:id`,
      name: '查看专业词',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './professionalWords/ViewProfessionalWords',
    },
  ];
}

// 垃圾词管理
function rubbishWords({ paths }) {
  const rName = 'rubbishWords';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.rubbishWords],
      path,
      rName,
      name: '垃圾词管理',
      component: './rubbishWords',
    },
    {
      authority: [authEnum.rubbishWords],
      path: `${path}/Maintain`,
      rName: `${rName}_maintain`,
      name: '垃圾词-词条类型维护',
      hideInMenu: true,
      component: './rubbishWords/WordsMaintain',
    },
  ];
}

// 对话管理
function dialogManager({ paths }) {
  const rName = 'dialogManager';
  const path = gPaths(paths, rName);
  return [
    {
      path,
      rName,
      name: '对话管理',
      component: './dialogManager',
    },
    {
      path: `${path}/:id`,
      rName: `${rName}_detail`,
      hideInMenu: true,
      component: './dialogStudios',
    },
  ];
}

// 用户档案库
function archivesLibMenu({ text, paths }) {
  const rName = 'archivesLibMenu';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.archiveManage],
    path,
    rName,
    name: '用户档案库',
    icon: 'FileSearchOutlined',
    routes: [
      {
        path: '/content/archivesLibMenu',
        redirect: `/content/archivesLibMenu/archivesLib`,
      },
      ..._.concat(
        routerRegisters['archivesLib']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['menuSetting']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['standardMaterial']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['standardFieldStore']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ]
  };
}

// 档案库
function archivesLib({ paths }) {
  const rName = 'archivesLib';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.archiveLib],
    path,
    rName,
    target: iframePagesEnum.ARCHIVESLIB,
    name: '档案库',
    component: './IframePages',
  };
}

// 菜单配置
function menuSetting({ paths }) {
  const rName = 'menuSetting';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.menuSetting],
    path,
    rName,
    name: '菜单配置',
    component: './menuSetting',
  };
}

// 标准材料管理
function standardMaterial({ paths }) {
  const rName = 'standardMaterial';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.standardMaterial],
      path,
      rName,
      name: '标准材料管理',
      component: './standardMaterial',
    },
    {
      authority: authEnum.standardMaterial_edit_alias,
      path: `${path}/new`,
      name: '新增标准材料库',
      rName: `${rName}_new`,
      hideInMenu: true,
      component: './standardMaterial/EditStandardMaterial',
    },
    {
      authority: authEnum.standardMaterial_edit_alias,
      path: `${path}/edit/:materialId`,
      name: '编辑标准材料库',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './standardMaterial/EditStandardMaterial',
    },
    {
      authority: [authEnum.standardMaterial],
      path: `${path}/view/:materialId`,
      name: '查看标准材料库',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './standardMaterial/ViewStandardMaterial',
    },
  ];
}

// 标准字段
function standardFieldStore({ paths }) {
  const rName = 'standardFieldStore';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.standardFieldStore],
      path,
      rName,
      name: '标准字段管理',
      component: './standardFieldStore',
    },
    {
      authority: authEnum.standardFieldStore_edit_alias,
      path: `${path}/create`,
      name: '新增标准字段',
      rName: `${rName}_create`,
      component: './standardFieldStore/fieldStoreForm',
      hideInMenu: true,
    },
    {
      authority: authEnum.standardFieldStore_edit_alias,
      path: `${path}/edit/:fieldId`,
      name: '编辑标准字段',
      rName: `${rName}_edit`,
      component: './standardFieldStore/EditStandardField',
      hideInMenu: true,
    },
    {
      authority: [authEnum.standardFieldStore],
      path: `${path}/view/:fieldId`,
      name: '查看标准字段',
      rName: `${rName}_view`,
      component: './standardFieldStore/ViewStandardField',
      hideInMenu: true,
    },
  ];
}

// 主题效能管理
function efficacy({ paths }) {
  const rName = 'efficacy';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.efficacy],
    path,
    rName,
    name: '主题效能管理',
    icon: 'RiseOutlined',
    routes: [
      {
        authority: [authEnum.themeOpen],
        path: `${path}/open`,
        name: '主题开通统计',
        rName: `${rName}_open`,
        component: './building',
      },
      {
        authority: [authEnum.themeDo],
        path: `${path}/do`,
        name: '主题办件统计',
        rName: `${rName}_do`,
        component: './building',
      },
      {
        component: './404',
      },
    ],
  };
}

// 知识库工单
function knowledgeLibWorkOrder({ text, paths }) {
  const rName = 'knowledgeLibWorkOrder';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.workOrder],
    path,
    rName,
    name: text('知识库工单'),
    icon: 'ExceptionOutlined',
    routes: [
      {
        path: '/content/knowledgeLibWorkOrder',
        redirect: `/content/knowledgeLibWorkOrder/commit`,
      },
      ..._.concat(
        routerRegisters['commit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['confirm']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['knowledge']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ]
  };
}

// 工单上报
function commit({ paths }) {
  const rName = 'commit';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.workOrderCommit],
      path,
      rName,
      name: '工单上报',
      component: './knowledgeLibWorkOrder/workOrderCommit',
    },
    {
      authority: [authEnum.workOrderCommit],
      path: `${path}/create`,
      name: '工单创建',
      rName: `${rName}_create`,
      component: './knowledgeLibWorkOrder/EditWorkOrder',
      hideInMenu: true,
    },
    {
      authority: [authEnum.workOrderCommit],
      path: `${path}/view/:workOrderId`,
      name: '工单上报列表/view',
      rName: `${rName}_view`,
      component: './knowledgeLibWorkOrder/ViewWorkOrder',
      hideInMenu: true,
    },
    {
      authority: [authEnum.workOrderCommit],
      path: `${path}/edit/:workOrderId`,
      name: '工单上报列表/编辑',
      rName: `${rName}_edit`,
      component: './knowledgeLibWorkOrder/workOrderCommit/CommitForm',
      hideInMenu: true,
    },
  ];
}

// 工单确认
function confirm({ paths }) {
  const rName = 'confirm';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.workOrderConfirm],
      path,
      rName,
      name: '工单确认',
      component: './knowledgeLibWorkOrder/workOrderConfirm',
    },
    {
      authority: [authEnum.workOrderConfirm],
      path: `${path}/view/:workOrderId`,
      name: '工单确认列表/查看',
      rName: `${rName}_view`,
      component: './knowledgeLibWorkOrder/ViewWorkOrder',
      hideInMenu: true,
    },
    {
      authority: [authEnum.workOrderConfirm],
      path: `${path}/edit/:workOrderId`,
      name: '工单确认列表/编辑',
      rName: `${rName}_edit`,
      component: './knowledgeLibWorkOrder/workOrderConfirm/AuditForm',
      hideInMenu: true,
    },
    {
      authority: [authEnum.workOrderConfirm],
      path: `${path}/audit/:workOrderId`,
      name: '工单审核',
      rName: `${rName}_audit`,
      component: './knowledgeLibWorkOrder/workOrderConfirm/AuditForm',
      audit: true,
      hideInMenu: true,
    },
  ];
}

// 知识库接口
function knowledge({ paths }) {
  const rName = 'knowledge';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.workOrderKnowledge],
    path,
    rName,
    name: '知识库接口',
    component: './knowledgeInter',
  };
}

// 用户画像库
function portraitMenu({ text, paths }) {
  const rName = 'portraitMenu';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.portraitMenu],
    path,
    rName,
    name: '用户画像库',
    icon: 'UserOutlined',
    routes: [
      {
        path,
        redirect: '/content/portraitMenu/tags',
      },
      ..._.concat(
        routerRegisters['tags']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['portraitSelf']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['portraitLegal']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['ruleManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['tableManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['minimalCondition']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['tagsAudit']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['tagsSync']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['outputModule']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['displayPosition']({ text, routerRegisters, paths: nextPaths }),
        {
          component: './404',
        },
      ),
      {
        component: './404',
      },
    ],
  };
}

// 标签管理
function tags({ paths }) {
  const rName = 'tags';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.tagManage],
      path,
      rName,
      name: '标签管理',
      component: './portraitTags',
    },
    {
      authority: authEnum.tagManage_edit_alias,
      path: `${path}/editTag`,
      name: '标签管理/新增',
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './portraitTags/CreatePortraitTagPage',
    },
    {
      authority: authEnum.tagManage_edit_alias,
      path: `${path}/editTag/:tagId`,
      name: '标签管理/编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './portraitTags/EditPortraitTagPage',
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/view/:tagId`,
      name: '标签管理/查看',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './portraitTags/ViewPortraitTagPage',
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/bulk`,
      name: '标签管理/批量',
      rName: `${rName}_bulk`,
      hideInMenu: true,
      component: './portraitTags/bulk',
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/bulkAdd`,
      name: '标签管理/批量新增',
      rName: `${rName}_bulkAdd`,
      hideInMenu: true,
      component: './portraitTags/bulk/bulkAdd',
    },
  ];
}

// 用户管理-个人
function portraitSelf({ paths }) {
  const rName = 'portraitSelf';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.portraitSelf],
      path,
      rName,
      name: '用户管理-个人',
      component: './portraitSelf',
    },
    {
      path: `${path}/view/:id`,
      name: '用户管理-个人-查看更多',
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './portraitSelf/compontents/ViewPortraitSelf',
    },
    {
      path: `${path}/edit/:id`,
      name: '用户管理-个人-编辑',
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './portraitSelf/EditPortraitSelf',
    },
    {
      path: `${path}/bulk`,
      name: '用户管理-个人-批量操作',
      rName: `${rName}_bulk`,
      hideInMenu: true,
      component: './portraitSelf/bulk',
    },
  ];
}

// 用户管理-法人
function portraitLegal({ paths }) {
  const rName = 'portraitLegal';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.portraitLegal],
      path,
      rName,
      name: '用户管理-法人',
      component: './portraitLegal',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '用户管理-法人-查看更多',
      hideInMenu: true,
      component: './portraitLegal/compontents/ViewPortraitLegal',
    },
    {
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '用户管理-法人-编辑',
      hideInMenu: true,
      component: './portraitLegal/EditPortraitLegal',
    },
    {
      path: `${path}/bulk`,
      rName: `${rName}_bulk`,
      name: '用户管理-个人-批量操作',
      hideInMenu: true,
      component: './portraitSelf/bulk',
    },
  ];
}

// 规则管理
function ruleManage({ paths }) {
  const rName = 'ruleManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.ruleManage],
      path,
      rName,
      name: '规则管理',
      component: './ruleManage',
    },
    {
      authority: [authEnum.ruleManage],
      path: `${path}/funcEditor`,
      rName: `${rName}_edit`,
      component: './ruleManage/FuncEditor',
      hideInMenu: true,
    },
    {
      authority: [authEnum.ruleManage],
      path: `${path}/funcCreate`,
      rName: `${rName}_create`,
      component: './ruleManage/FuncEditor',
      name: '新增函数',
      hideInMenu: true,
    },
    {
      authority: [authEnum.ruleManage],
      path: `${path}/funcView`,
      rName: `${rName}_view`,
      component: './ruleManage/FuncEditor',
      name: '查看函数',
      hideInMenu: true,
    },
    {
      authority: [authEnum.ruleManage],
      path: `${path}/condition`,
      rName: `${rName}_condition`,
      name: '条件管理',
      component: './condition',
      hideInMenu: true,
    },
  ];
}

// 库表管理
function tableManage({ paths }) {
  const rName = 'tableManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.tableManage],
      path,
      rName,
      name: '库表管理',
      component: './tableManage',
    },
    {
      authority: [authEnum.tableManage],
      path: `${path}/view/:tableId`,
      rName: `${rName}_view`,
      name: '库表查看',
      component: './tableManage/ViewTableManage',
      hideInMenu: true,
    },
    {
      authority: authEnum.tableManage_edit_alias,
      path: `${path}/edit/:tableId`,
      rName: `${rName}_edit`,
      name: '库表编辑',
      component: './tableManage/EditTableManage',
      hideInMenu: true,
    },
    {
      authority: authEnum.tableManage_edit_alias,
      path: `${path}/new`,
      rName: `${rName}_new`,
      name: '库表新增',
      component: './tableManage/EditTableManage',
      hideInMenu: true,
    },
  ];
}

// 最小条件
function minimalCondition({ paths }) {
  const rName = 'minimalCondition';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.minimalCondition],
      path,
      rName,
      name: '最小条件',
      component: './minimalCondition',
    },
    {
      path: `${path}/bulk`,
      rName: `${rName}_bulk`,
      name: '最小条件批量操作',
      component: './minimalCondition/bulk',
      hideInMenu: true,
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '最小条件/查看',
      component: './minimalCondition/ViewMinimalCondition',
      hideInMenu: true,
    },
    {
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '最小条件/编辑',
      component: './minimalCondition/EditMinimalCondition',
      hideInMenu: true,
    },
  ];
}

// 标签审核
function tagsAudit({ paths }) {
  const rName = 'tagsAudit';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.tagAudit],
      path,
      rName,
      name: '标签审核',
      component: './portraitTagsAudit',
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/view/:tagId`,
      rName: `${rName}_view`,
      name: '查看审核标签的详情',
      component: './portraitTagsAudit/ViewPortraitTagDetail',
      hideInMenu: true,
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/review/:tagId`,
      rName: `${rName}_review`,
      name: '审核标签的详情',
      component: './portraitTagsAudit/ReviewPortraitTagDetail',
      hideInMenu: true,
    },
    {
      authority: [authEnum.tagManage],
      path: `${path}/edit/:tagId`,
      rName: `${rName}_edit`,
      name: '编辑审核标签的内容',
      component: './portraitTagsAudit/EditPortraitTagDetail',
      hideInMenu: true,
    },
  ];
}

// 标签同步
function tagsSync({ paths }) {
  const rName = 'tagsSync';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.tagSync],
      path,
      rName,
      name: '标签同步',
      component: './portraitTagsSync',
    },
    {
      authority: [authEnum.tagSync],
      path: `${path}/:pageTab`,
      rName: `${rName}_pageTab`,
      name: '标签同步/列表',
      component: './portraitTagsSync/TableContentWrap',
      hideInMenu: true,
    },
  ];
}

// 输出管理
function outputModule({ paths }) {
  const rName = 'outputModule';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.outputModule],
      path,
      rName,
      name: '输出管理',
      component: './outputModule',
    },
    {
      authority: authEnum.outputModule_edit_alias,
      path: `${path}/add`,
      rName: `${rName}_add`,
      name: '输出模块/新增',
      hideInMenu: true,
      component: './outputModule/outputModuleForm',
    },
    {
      authority: authEnum.outputModule_edit_alias,
      path: `${path}/edit`,
      rName: `${rName}_edit`,
      name: '输出模块/编辑',
      hideInMenu: true,
      component: './outputModule/outputModuleForm',
    },
    {
      authority: [authEnum.outputModule],
      path: `${path}/view`,
      rName: `${rName}_view`,
      name: '输出模块/查看',
      hideInMenu: true,
      component: './outputModule/outputModuleForm',
    },
  ];
}

// 参数管理
function displayPosition({ paths }) {
  const rName = 'displayPosition';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.paramsManage],
      path,
      rName,
      name: '参数管理',
      component: './displayPosition/components/sourceManage',
    },
    {
      path: `${path}/freshRegular`,
      rName: `${rName}_freshRegular`,
      name: '规则刷新',
      hideInMenu: true,
      component: './displayPosition/components/FreshRegular',
    },
    {
      path: `${path}/sourceManage`,
      rName: `${rName}_sourceManage`,
      name: '来源管理',
      hideInMenu: true,
      component: './displayPosition/components/sourceManage',
    },
  ];
}

// 场景用数
function sceneDataReuse({ text, paths }) {
  const rName = 'sceneDataReuse';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.sceneData],
    path,
    rName,
    name: '场景用数',
    icon: 'BorderOuterOutlined',
    routes: [
      {
        path,
        redirect: '/content/sceneDataReuse/sceneDataReuseManage',
      },
      ..._.concat(
        routerRegisters['sceneDataReuseManage']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

// 场景用数管理
function sceneDataReuseManage({ paths }) {
  const rName = 'sceneDataReuseManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.sceneDataManage],
      path,
      rName,
      name: '场景用数管理',
      component: './sceneDataUse',
    },
    {
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '场景用数新增',
      hideInMenu: true,
      component: './sceneDataUse/EditSceneData',
    },
    {
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '场景用数编辑',
      hideInMenu: true,
      component: './sceneDataUse/EditSceneData',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '场景用数查看',
      hideInMenu: true,
      component: './sceneDataUse/ViewSceneData',
    },
  ];
}

// 推荐管理
function recommendationMenu({ text, paths }) {
  const rName = 'recommendationMenu';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.recommendManage],
    path,
    rName,
    name: '推荐管理',
    icon: 'FunctionOutlined',
    routes: [
      {
        path,
        redirect: '/content/recommendationMenu/modules',
      },
      ..._.concat(
        routerRegisters['modules']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['strategy']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['suggestTest']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

// 模块管理
function modules({ paths }) {
  const rName = 'modules';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.modules],
      path,
      rName,
      name: '模块管理',
      component: './modulesManage',
    },
    {
      authority: authEnum.modules_edit_alias,
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '新增模块管理',
      hideInMenu: true,
      component: './modulesManage/PreModuleForm',
    },
    {
      authority: authEnum.modules_edit_alias,
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      name: '编辑模块管理',
      hideInMenu: true,
      component: './modulesManage/EditModulePage',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '查看模块管理',
      hideInMenu: true,
      component: './modulesManage/ViewModulePage',
    },
  ];
}

// 策略管理
function strategy({ paths }) {
  const rName = 'strategy';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.strategy],
      path,
      rName,
      name: '策略管理',
      component: './strategyManage',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      name: '策略管理查看',
      hideInMenu: true,
      component: './strategyManage/ViewStrategy',
    },
  ];
}

// 策略管理
function suggestTest({ paths }) {
  const rName = 'suggestTest';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.suggestTest],
    path,
    rName,
    name: '推荐测试',
    component: './suggestTest',
  };
}

// 消息中心
function messageMenu({ text, paths }) {
  const rName = 'messageMenu';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.messageMenu],
    path,
    rName,
    name: '消息中心',
    icon: 'MessageOutlined',
    routes: [
      {
        path,
        redirect: '/content/messageMenu/message',
      },
      ..._.concat(
        routerRegisters['message']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['messageManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['warningManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['messageTemplate']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['messageConfig']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ],
  };
}

// 消息管理
function message({ paths }) {
  const rName = 'message';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.message],
      path,
      rName,
      name: '消息管理',
      component: './message',
    },
    {
      authority: [authEnum.message],
      path: `${path}/view`,
      rName: `${rName}_view`,
      name: '消息查看',
      hideInMenu: true,
      component: './message/handleMessageForm/getMessageFormData',
    },
    {
      authority: authEnum.message_edit_alias,
      path: `${path}/edit`,
      rName: `${rName}_edit`,
      name: '消息编辑',
      hideInMenu: true,
      component: './message/handleMessageForm/getMessageFormData',
    },
    {
      authority: authEnum.message_edit_alias,
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '消息创建',
      hideInMenu: true,
      component: './message/handleMessageForm/getMessageFormData',
    },
    {
      authority: authEnum.message_edit_alias,
      path: `${path}/copy`,
      rName: `${rName}_copy`,
      name: '消息复制',
      hideInMenu: true,
      component: './message/handleMessageForm/getMessageFormData',
    },
  ];
}

// 消息列表
function messageManage({ paths }) {
  const rName = 'messageManage';
  const path = gPaths(paths, rName);
  return [
    {
      path,
      rName,
      name: '消息列表',
      component: './messageManage',
    },
    {
      path: `${path}/edit`,
      rName: `${rName}_edit`,
      name: '编辑消息',
      hideInMenu: true,
      component: './messageManage/EditMessage',
    },
    {
      path: `${path}/view`,
      rName: `${rName}_view`,
      name: '查看消息',
      hideInMenu: true,
      component: './messageManage/EditMessage',
    },
    {
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '创建消息',
      hideInMenu: true,
      component: './messageManage/EditMessage',
    },
    {
      path: `${path}/copy`,
      rName: `${rName}_copy`,
      name: '复制消息',
      hideInMenu: true,
      component: './messageManage/EditMessage',
    },
  ];
}

// 提醒列表
function warningManage({ paths }) {
  const rName = 'warningManage';
  const path = gPaths(paths, rName);
  return [
    {
      path,
      rName,
      name: '提醒列表',
      component: './warningManage',
    },
    {
      path: `${path}/create`,
      rName: `${rName}_create`,
      name: '新增提醒',
      hideInMenu: true,
      component: './warningManage/EditWarning',
    },
    {
      path: `${path}/edit`,
      rName: `${rName}_edit`,
      name: '编辑提醒',
      hideInMenu: true,
      component: './warningManage/EditWarning',
    },
    {
      path: `${path}/view`,
      rName: `${rName}_view`,
      name: '查看提醒',
      hideInMenu: true,
      component: './warningManage/EditWarning',
    },
    {
      path: `${path}/copy`,
      rName: `${rName}_copy`,
      name: '复制提醒',
      hideInMenu: true,
      component: './warningManage/EditWarning',
    },
  ];
}

// 消息模板
function messageTemplate({ paths }) {
  const rName = 'messageTemplate';
  const path = gPaths(paths, rName);
  return [
    {
      path,
      rName,
      name: '消息模板',
      component: './messageTemplate',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './messageTemplate/ViewMessageTemplate',
    },
    {
      path: `${path}/edit`,
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './messageTemplate/EditMessageTemplate',
    },
    {
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './messageTemplate/EditMessageTemplate',
    },
  ];
}

// 消息设置
function messageConfig({ paths }) {
  const rName = 'messageConfig';
  const path = gPaths(paths, rName);
  return [
    {
      path,
      rName,
      name: '消息设置',
      component: './messageConfig/MessageDivision',
    },
    {
      path: `${path}/noticeStyle`,
      rName: `${rName}_noticeStyle`,
      name: '提醒样式',
      hideInMenu: true,
      component: './messageConfig/NoticeStyle',
    },
    {
      path: `${path}/messageImg`,
      rName: `${rName}_messageImg`,
      name: '消息配图',
      hideInMenu: true,
      component: './messageConfig/MessageImg',
    },
    {
      path: `${path}/authMethod`,
      rName: `${rName}_authMethod`,
      name: '认证方式',
      hideInMenu: true,
      component: './messageConfig/AuthMethod',
    },
    {
      path: `${path}/otherConfig`,
      rName: `${rName}_otherConfig`,
      name: '其他设置',
      hideInMenu: true,
      component: './messageConfig/OtherConfig',
    },
  ];
}

// 证照
function certification({ text, paths }) {
  const rName = 'certification';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    path,
    rName,
    authority: authEnum.certification,
    name: '证照管理',
    icon: 'FileProtectOutlined',
    routes: [
      {
        path,
        redirect: '/content/certification/certificationManage',
      },
      ..._.concat(
        routerRegisters['certificationManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['certificationSync']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ]
  };
}

// 证照管理
function certificationManage({ text, paths }) {
  const rName = 'certificationManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.certificationManage],
      path,
      rName,
      name: '证照管理',
      component: './certificationManage',
    },
    {
      path: `${path}/view/:id`,
      rName: `${rName}_view`,
      hideInMenu: true,
      component: './certificationManage/ViewCertificationManage',
    },
    {
      path: `${path}/edit`,
      rName: `${rName}_create`,
      hideInMenu: true,
      component: './certificationManage/EditCertificationManage',
    },
    {
      path: `${path}/edit/:id`,
      rName: `${rName}_edit`,
      hideInMenu: true,
      component: './certificationManage/EditCertificationManage',
    },
  ];
}

// 证照同步
function certificationSync({ text, paths }) {
  const rName = 'certificationSync';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    name: '证照同步',
    component: './certificationSync',
  };
}

// 工具
function tool({ text, paths }) {
  const rName = 'tool';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    path,
    rName,
    authority: authEnum.tool,
    name: '工具菜单',
    icon: 'ToolOutlined',
    routes: [
      {
        path,
        redirect: '/content/tool/dict',
      },
      ..._.concat(
        routerRegisters['dict']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ]
  };
}

// 字典管理
function dict({ paths }) {
  const rName = 'dict';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.dictManage],
    path,
    rName,
    name: '字典管理',
    component: './dictManage',
  };
}

// 字典管理
function logRecord({ paths }) {
  const rName = 'logRecord';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.dictManage],
    path,
    rName,
    name: '日志监控管理',
    component: './logRecords',
  };
}

// 统计信息
function summaryInfo({ paths }) {
  const rName = 'summaryInfo';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.summaryInfo],
    path,
    rName,
    name: '统计信息',
    icon: 'BarChartOutlined',
    routes: summaryInfoRoutes({ paths: [...paths, rName] }),
  };
}

// 应用运营
function app({ text, paths }) {
  const rName = 'app';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.app],
    path,
    rName,
    name: '应用运营',
    header: true,
    icon: 'CloudOutlined',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [
          {
            path,
            redirect: '/app/appManager/applicationAudit',
          },
          ..._.concat(
            routerRegisters['appManager']({ text, routerRegisters, paths: nextPaths }),
          ),
          {
            component: './404',
          },
        ]
      },
      {
        component: './404',
      },
    ]
  };
}

// 主题应用管理
function appManager({ paths }) {
  const rName = 'appManager';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.appManager],
    path,
    rName,
    name: '主题应用接入',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path,
        redirect: '/app/appManager/applicationAudit',
      },
      {
        authority: [authEnum.appRegister],
        path: `${path}/appRegister`,
        rName: 'appRegister',
        name: '应用注册',
        component: './appRegister',
      },
      {
        authority: [authEnum.applicationAudit],
        path: `${path}/applicationAudit`,
        rName: 'applicationAudit',
        name: '应用审核',
        component: './applicationAudit',
      },
      {
        component: './404',
      },
    ],
  };
}

// 模型运营
function model({ text, paths }) {
  const rName = 'model';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.model],
    path,
    rName,
    name: '模型运营',
    header: true,
    icon: 'BuildOutlined',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [
          {
            path,
            redirect: '/model/modelManager/commonModel',
          },
          ..._.concat(
            routerRegisters['modelManager']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['questionnaire']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['oneform']({ text, routerRegisters, paths: nextPaths }),
          ),
          {
            component: './404',
          },
        ]
      },
      {
        component: './404',
      },
    ]
  };
}

// 模型管理
function modelManager({ paths }) {
  const rName = 'modelManager';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.modelManager],
    path,
    rName,
    name: '模型管理',
    icon: 'BlockOutlined',
    routes: [
      {
        path,
        redirect: '/model/modelManager/commonModel',
      },
      {
        authority: [authEnum.commonModel],
        path: `${path}/commonModel`,
        name: '公共模型',
        component: './commonModel',
      },
      {
        authority: [authEnum.subscription],
        path: `${path}/subscription`,
        name: '订阅管理',
        component: './subscription',
      },
      {
        component: './404',
      },
    ],
  };
}

// 问卷表单
function questionnaire({ paths }) {
  const rName = 'questionnaire';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    icon: 'BulbOutlined',
    name: '问卷表单',
    component: './designQuestionnaire',
  };
}

// 主题表单
function oneform({ paths }) {
  const rName = 'oneform';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    icon: 'BulbOutlined',
    name: '主题表单',
    component: './designOneForm',
  };
}

// 系统管理
function system({ text, paths }) {
  const rName = 'system';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.system],
    path,
    rName,
    name: '系统管理',
    header: true,
    icon: 'SettingOutlined',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/PageLayout',
        routes: [
          {
            path,
            redirect: '/system/manager/users',
          },
          ..._.concat(
            routerRegisters['manager']({ text, routerRegisters, paths: nextPaths }),
            routerRegisters['systemConfig']({ text, routerRegisters, paths: nextPaths }),
          ),
          {
            component: './404',
          },
        ]
      },
      {
        component: './404',
      },
    ]
  };
}

// 系统管理
function manager({ text, paths }) {
  const rName = 'manager';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    path,
    rName,
    name: '系统管理',
    icon: 'SettingOutlined',
    authority: [authEnum.systemManage],
    routes: [
      {
        path,
        redirect: '/system/manager/users',
      },
      ..._.concat(
        routerRegisters['users']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['department']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['roles']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['logRecord']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['taskManage']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ]
  };
}

// 账号管理
function users({ paths }) {
  const rName = 'users';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.users],
    path,
    rName,
    name: '账号管理',
    component: './userManager/users',
  };
}

// 部门管理
function department({ paths }) {
  const rName = 'department';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    name: '部门管理',
    authority: [authEnum.department],
    component: './userManager/department',
  };
}

// 角色管理
function roles({ paths }) {
  const rName = 'roles';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.role],
    path,
    rName,
    name: '角色管理',
    component: './userManager/roles',
  };
}

// 产品手册
function operatingManual({ paths }) {
  const rName = 'operatingManual';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.operatingManual],
    path,
    rName,
    name: '产品手册',
    component: './operatingManual',
  };
}

// 任务管理
function taskManage({ paths }) {
  const rName = 'taskManage';
  const path = gPaths(paths, rName);
  return [
    {
      authority: [authEnum.taskManage],
      path,
      rName,
      name: '任务管理',
      component: './taskManage',
    }, {
      path: `${path}/logs`,
      rName: `${rName}_logs`,
      name: '任务日志',
      component: './taskLogs',
      hideInMenu: true,
    },
  ];
}

// 系统配置
function systemConfig({ text, paths }) {
  const rName = 'systemConfig';
  const path = gPaths(paths, rName);
  const nextPaths = [...paths, rName];
  return {
    authority: [authEnum.systemConfig],
    path,
    rName,
    name: '系统配置',
    icon: 'SlidersOutlined',
    routes: [
      {
        path,
        redirect: '/system/systemConfig/params',
      },
      ..._.concat(
        routerRegisters['params']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['auditChain']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['dictDepartmentManage']({ text, routerRegisters, paths: nextPaths }),
        routerRegisters['subsystem']({ text, routerRegisters, paths: nextPaths }),
      ),
      {
        component: './404',
      },
    ]
  };
}

// 系统参数配置
function params({ paths }) {
  const rName = 'params';
  const path = gPaths(paths, rName);
  return {
    path,
    rName,
    name: '系统参数配置',
    component: './systemParamsConfig',
  };
}

// 审核链配置
function auditChain({ paths }) {
  const rName = 'auditChain';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.auditChain],
    path,
    rName,
    name: '审核链配置',
    component: './auditChain',
  };
}

// 字典配置
function dictDepartmentManage({ paths }) {
  const rName = 'dictDepartmentManage';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.departmentDict],
    path,
    rName,
    name: '字典配置',
    component: './dictDepartmentManage',
  };
}

// 子系统配置
function subsystem({ paths }) {
  const rName = 'subsystem';
  const path = gPaths(paths, rName);
  return {
    authority: [authEnum.subsystem],
    path,
    rName,
    name: '子系统配置',
    component: './subsystem',
  };
}

const routerRegisters = {
  content, connect, themeAccess, themeAudit, infoLibrary, do: _do, matters, materialSplit, scenes,
  scenesQA, conditions, scenesAudit, oneFormManager, oneMatter, policyKnowledgeLib, policyContent,
  policyGraph, policyWords, institutionManage, article, service, projectManage, policyProjectSync, synonyms,
  policyExplain, hotline, matterHandleGuide, smartQa, reviewPoint, ask, emoticon, dimensionManage, hotWordsManage,
  synonymsSetting, chatLibrary, hotQuestion, refresh, triggerWords, functionWords, professionalWords,
  rubbishWords, dialogManager, archivesLibMenu, archivesLib, menuSetting, standardMaterial, standardFieldStore,
  efficacy, knowledgeLibWorkOrder, commit, confirm, knowledge, portraitMenu, tags, portraitSelf, portraitLegal,
  ruleManage, tableManage, minimalCondition, tagsAudit, tagsSync, outputModule, displayPosition, sceneDataReuse,
  sceneDataReuseManage, recommendationMenu, modules, strategy, suggestTest, messageMenu, message, messageManage,
  warningManage, messageTemplate, messageConfig,
  certification, certificationManage, certificationSync,
  tool, dict, summaryInfo,

  app, appManager,

  model, modelManager, questionnaire, oneform,

  system, manager, users, department, roles, operatingManual, taskManage, systemConfig, params, auditChain,
  dictDepartmentManage, subsystem, logRecord,

  test,
};

function generate(text, { homePage, entry = [] }, routerRegisters = routerRegisters) {
  return [
    {
      path: '/',
      rName: '/',
      redirect: homePage,
    },
    {
      path: '/login',
      rName: 'login',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/redirect',
      rName: 'redirect',
      component: './redirectPage',
    },
    {
      path: '/testLayout',
      component: './testLayout',
    },
    ...transport(
      { routerRegisters, routers: entry, text }),
    {
      component: './404',
    },
  ];
}

/*const aa = generate({}, {
    homePage: '/content/policyKnowledgeLib/policyContent',
    entry: ['content', 'app', 'model', 'system']
  },
  routerRegisters);*/

module.exports = {

  routerRegisters,

  generate,

  defaultGenerate: function ({
                               text = {},
                               entry = ['content', 'app', 'model', 'system', 'test'],
                               homePage = '/content/policyKnowledgeLib/policyContent',
                               menuRegisters = routerRegisters,
                             }) {
    return generate(adaptText(text), { homePage, entry }, menuRegisters);
  }

};
