// 每个叶子节点
module.exports = {
  // {名称, 是否有效{ VALID, INVALID }, 子项}
  scenes: {
    name: '主题管理',
    desc: '主题查看、引导问卷查看',
    status: 'VALID',
    children: {
      // view: { name: '主题查看', status:'VALID', key: 'scenes_view', desc: '主题查看、引导问卷查看'},
      // create: { name: '主题创建', status:'INVALID', key: 'scenes_create'},
      edit: {
        name: '主题编辑',
        status: 'VALID',
        key: 'scenes_edit',
        alias: ['scenes_bluk', 'scenes_delete'],
        desc: '主题创建、编辑、预览、主题复制、引导问卷编辑',
      },
      bulk: {
        name: '主题批量',
        status: 'VALID',
        key: 'scenes_bluk',
        desc: '批量操作、包含主题编辑',
      },
      delete: {
        name: '主题删除',
        status: 'VALID',
        key: 'scenes_delete',
        desc: '主题删除、包含主题编辑',
      },
      table: {
        name: '主题一表',
        status: 'VALID',
        key: 'scenes_table',
        desc: '引导问卷-一表和规则页、引导问卷-节点字段页',
      },
      publish: { name: '主题发布', status: 'VALID', key: 'scenes_publish', desc: '上/下架' },
      operate: { name: '主题运营', status: 'VALID', key: 'scenes_operate', desc: '标注、相似问' },
    },
    hasLeaf: true, // 将children加到权限列表
  },

  scenesAudit: {
    name: '主题审核',
    status: 'VALID',
    children: {
      create: { name: '审核创建', status: 'INVALID', key: 'scenesAudit_create' },
      edit: { name: '审核编辑', status: 'INVALID', key: 'scenesAudit_edit' },
      delete: { name: '审核删除', status: 'INVALID', key: 'scenesAudit_delete' },
    },
    hasLeaf: true,
  },

  oneFormManager: {
    name: '一表管理',
    status: 'VALID',
    children: {
      create: { name: '一表管理创建', status: 'INVALID', key: 'oneFormManager_create' },
      edit: { name: '一表管理编辑', status: 'INVALID', key: 'oneFormManager_edit' },
      delete: { name: '一表管理删除', status: 'INVALID', key: 'oneFormManager_delete' },
    },
    hasLeaf: true,
  },
  oneMatter: {
    name: '主题专栏',
    desc: '联办事项查看',
    status: 'VALID',
    children: {
      edit: {
        name: '联办事项编辑',
        status: 'VALID',
        key: 'oneMatter_edit',
        alias: ['oneMatter_delete', 'oneMatter_publish'],
        desc: '联办事项创建、编辑、置顶',
      },
      delete: {
        name: '联办事项删除',
        status: 'VALID',
        key: 'oneMatter_delete',
        desc: '联办事项删除、包含联办事项编辑',
      },
      publish: {
        name: '联办事项发布',
        status: 'VALID',
        key: 'oneMatter_publish',
        desc: '上/下架、包含联办事项编辑',
      },
      operate: {
        name: '联办事项运营',
        status: 'VALID',
        key: 'oneMatter_operate',
        desc: '主题显示',
      },
    },
    hasLeaf: true,
  },
  themeAccess: {
    name: '业务梳理',
    status: 'VALID',
    children: {
      create: { name: '业务梳理创建', status: 'INVALID', key: 'themeAccess_create' },
      edit: { name: '业务梳理编辑', status: 'INVALID', key: 'themeAccess_edit' },
      delete: { name: '业务梳理删除', status: 'INVALID', key: 'themeAccess_delete' },
    },
    hasLeaf: true,
  },
  themeAudit: {
    name: '梳理确认',
    status: 'VALID',
    children: {
      create: { name: '梳理确认创建', status: 'INVALID', key: 'themeAudit_create' },
      edit: { name: '梳理确认编辑', status: 'INVALID', key: 'themeAudit_edit' },
      delete: { name: '梳理确认删除', status: 'INVALID', key: 'themeAudit_delete' },
    },
    hasLeaf: true,
  },

  infoLibrary: {
    name: '基本信息库',
    status: 'VALID',
    children: {
      create: { name: '基本信息库创建', status: 'INVALID', key: 'infoLibrary_create' },
      edit: { name: '基本信息库编辑', status: 'INVALID', key: 'infoLibrary_edit' },
      delete: { name: '基本信息库删除', status: 'INVALID', key: 'infoLibrary_delete' },
    },
    hasLeaf: true,
  },

  synonyms: {
    name: '常见问题',
    desc: '问答查看',
    status: 'VALID',
    children: {
      edit: {
        name: '问答编辑',
        status: 'VALID',
        key: 'synonyms_edit',
        alias: ['synonyms_delete', 'synonyms_publish'],
        desc: '问答创建、编辑',
      },
      delete: {
        name: '问答删除',
        status: 'VALID',
        key: 'synonyms_delete',
        desc: '问答删除、包含问答编辑',
      },
      publish: {
        name: '问答发布',
        status: 'VALID',
        key: 'synonyms_publish',
        desc: '上/下架、包含用户编辑',
      },
      operate: {
        name: '问答运营',
        status: 'VALID',
        key: 'synonyms_operate',
        desc: '修改标注、相似问',
      },
    },
    hasLeaf: true,
  },
  dimensionManage: {
    name: '维度管理',
    desc: '维度查看',
    status: 'VALID',
    children: {
      edit: {
        name: '维度编辑',
        status: 'VALID',
        key: 'dimensionManage_edit',
        alias: ['dimensionManage_delete'],
        desc: '维度创建、编辑',
      },
      delete: {
        name: '维度删除',
        status: 'VALID',
        key: 'dimensionManage_delete',
        desc: '维度创建、包含维度编辑',
      },
    },
    hasLeaf: true,
  },
  hotWords: {
    name: '热词管理',
    desc: '热词查看',
    status: 'VALID',
    children: {
      edit: {
        name: '热词编辑',
        status: 'VALID',
        key: 'hotWords_edit',
        alias: ['hotWords_delete'],
        desc: '热词创建、编辑',
      },
      delete: {
        name: '热词删除',
        status: 'VALID',
        key: 'hotWords_delete',
        desc: '热词删除、包含热词编辑',
      },
    },
    hasLeaf: true,
  },

  institutionManage: {
    name: '部门信息',
    desc: '机构查看',
    status: 'VALID',
    children: {
      edit: {
        name: '机构编辑',
        status: 'VALID',
        key: 'institutionManage_edit',
        alias: ['institutionManage_delete', 'institutionManage_publish'],
        desc: '机构新增、编辑',
      },
      delete: {
        name: '机构删除',
        status: 'VALID',
        key: 'institutionManage_delete',
        desc: '机构删除、包含机构编辑',
      },
      publish: {
        name: '机构发布',
        status: 'VALID',
        key: 'institutionManage_publish',
        desc: '机构上下架、包含机构编辑',
      },
      operate: {
        name: '机构运营',
        status: 'VALID',
        key: 'institutionManage_operate',
        desc: '机构相似问',
      },
    },
    hasLeaf: true,
  },

  synonymsSetting: {
    name: '问答设置',
    desc: '问答设置查看',
    status: 'VALID',
    children: {
      edit: {
        name: '问答编辑',
        status: 'VALID',
        key: 'synonymsSetting_edit',
        alias: ['synonymsSetting_delete'],
        desc: '问答新增、编辑',
      },
      delete: {
        name: '问答删除',
        status: 'VALID',
        key: 'synonymsSetting_delete',
        desc: '问答删除、包含问答编辑',
      },
    },
    hasLeaf: true,
  },

  hotQuestion: {
    name: '热门问题',
    desc: '热门问题查看',
    status: 'VALID',
    children: {
      edit: {
        name: '热门问题编辑',
        status: 'VALID',
        key: 'hotQuestion_edit',
        alias: ['hotQuestion_delete'],
        desc: '热门问题创建、编辑',
      },
      delete: {
        name: '热门问题删除',
        status: 'VALID',
        key: 'hotQuestion_delete',
        desc: '热门问题删除、包含热门问题编辑',
      },
    },
    hasLeaf: true,
  },

  qaRefresh: {
    name: '刷新',
    desc: '刷新问答端、刷新shell端',
    status: 'VALID',
    children: {
      allRefresh: {
        name: '全部刷新',
        status: 'INVALID',
        key: 'qaRefresh_allRefresh',
      },
    },
  },

  triggerWords: {
    name: '触发词管理',
    desc: '触发词查看',
    status: 'VALID',
    children: {
      edit: {
        name: '触发词编辑',
        status: 'VALID',
        key: 'triggerWords_edit',
        alias: ['triggerWords_delete', 'triggerWords_publish'],
        desc: '热门问题创建、编辑',
      },
      delete: {
        name: '触发词删除',
        status: 'VALID',
        key: 'triggerWords_delete',
        desc: '触发词删除、包含触发词编辑',
      },
      publish: {
        name: '触发词发布',
        status: 'VALID',
        key: 'triggerWords_publish',
        desc: '触发词上/下架、包含触发词编辑',
      },
    },
    hasLeaf: true,
  },

  rubbishWords: {
    name: '垃圾词管理',
    desc: '垃圾词查看',
    status: 'VALID',
    children: {
      edit: {
        name: '触发词编辑',
        status: 'VALID',
        key: 'rubbishWords_edit',
        alias: ['rubbishWords_delete'],
        desc: '垃圾词创建、编辑',
      },
      delete: {
        name: '垃圾词删除',
        status: 'VALID',
        key: 'rubbishWords_delete',
        desc: '垃圾词删除、包含垃圾词编辑',
      },
    },
    hasLeaf: true,
  },

  chatLibrary: {
    name: '聊天库',
    status: 'VALID',
    desc: '聊天库查看',
    children: {
      edit: {
        name: '聊天库编辑',
        desc: '聊天库新增、编辑',
        status: 'VALID',
        key: 'chatLibrary_edit',
        alias: ['chatLibrary_delete'],
      },
      delete: {
        name: '聊天库删除',
        desc: '聊天库删除、包含聊天库编辑',
        status: 'VALID',
        key: 'chatLibrary_delete',
      },
      publish: {
        name: '聊天库发布',
        status: 'VALID',
        key: 'chatLibrary_publish',
        desc: '聊天库上下架、包含聊天库编辑',
      },
    },
    hasLeaf: true,
  },

  matters: {
    name: '事项管理',
    status: 'VALID',
    desc: '事项查看、关联主题查看',
    children: {
      edit: {
        name: '事项基本信息编辑',
        status: 'VALID',
        key: 'matters_edit',
        alias: ['matters_bluk', 'matters_delete', 'matters_publish', 'matters_editmore'],
        desc: '事项基本信息创建、编辑',
      },
      editmore: {
        name: '事项拓展信息编辑',
        status: 'VALID',
        key: 'matters_editmore',
        desc: '审批事项结果、事项拓展信息、事项推荐信息',
      },
      split: {
        name: '材料拆解',
        status: 'VALID',
        key: 'matters_split',
        desc: '材料拆解',
      },
      origin: {
        name: '原始材料拆解',
        status: 'VALID',
        key: 'matters_origin',
        desc: '原始材料添加、删除、编辑',
      },
      bulk: {
        name: '事项批量',
        status: 'VALID',
        key: 'matters_bluk',
        desc: '批量操作、包含事项基本信息、拓展信息编辑',
      },
      delete: {
        name: '事项删除',
        status: 'VALID',
        key: 'matters_delete',
        desc: '事项删除、包含事项基本信息、拓展信息编辑',
      },
      publish: {
        name: '事项发布',
        status: 'VALID',
        key: 'matters_publish',
        desc: '上/下架、包含事项基本信息、拓展信息编辑',
      },
      operate: {
        name: '事项运营',
        status: 'VALID',
        key: 'matters_operate',
        desc: '标注、完成、相似问',
      },
    },
    hasLeaf: true, // 将children加到权限列表
  },
  mattersSync: {
    name: '事项同步',
    desc: '事项同步记录查看、一键同步',
    status: 'VALID',
    children: {
      sync: {
        name: '一键同步',
        status: 'INVALID',
        key: 'mattersSync_sync',
      },
    },
    hasLeaf: true,
  },
  materialSplit: {
    name: '材料拆解',
    desc: '拆解材料查看，拆解材料导出，查看审核意见',
    status: 'VALID',
    children: {
      edit: {
        name: '拆解材料编辑',
        status: 'VALID',
        key: 'materialSplit_edit',
        desc: '拆解材料新增，拆解材料编辑，审核状态编辑',
        alias: ['materialSplit_delete'],
      },
      delete: {
        name: '拆解材料删除',
        status: 'VALID',
        key: 'materialSplit_delete',
        desc: '拆解材料删除，包含拆解材料编辑',
      },
    },
    hasLeaf: true,
  },
  policyContent: {
    name: '政策原文',
    desc: '政策查看、导出、列配置',
    status: 'VALID',
    children: {
      edit: {
        name: '政策编辑',
        status: 'VALID',
        key: 'policyContent_edit',
        alias: ['policyContent_delete', 'policyContent_publish'],
        desc: '政策创建、编辑、模板下载、Excel导入',
      },
      delete: {
        name: '政策删除',
        status: 'VALID',
        key: 'policyContent_delete',
        desc: '政策删除，包含政策编辑',
      },
      publish: {
        name: '政策发布',
        status: 'VALID',
        key: 'policyContent_publish',
        desc: '上/下架、包含政策编辑',
      },
      operate: {
        name: '政策运营',
        status: 'VALID',
        key: 'policyContent_operate',
        desc: '相似问',
      },
    },
    hasLeaf: true,
  },
  policyGraph: {
    name: '政策图谱',
    desc: '政策图谱',
    status: 'VALID',
  },
  policyWord: {
    name: '政务百科词条',
    desc: '百科词条查看',
    status: 'VALID',
    children: {
      edit: {
        name: '词条编辑',
        status: 'VALID',
        key: 'policyWord_edit',
        alias: ['policyWord_delete', 'policyWord_publish'],
        desc: '百科词条创建、编辑',
      },
      delete: {
        name: '词条删除',
        status: 'VALID',
        key: 'policyWord_delete',
        desc: '百科词条删除、包含词条编辑',
      },
      publish: {
        name: '词条发布',
        status: 'VALID',
        key: 'policyWord_publish',
        desc: '上/下架、包含词条编辑',
      },
      operate: {
        name: '词条运营',
        status: 'VALID',
        key: 'policyWord_operate',
        desc: '相似问',
      },
    },
    hasLeaf: true,
  },
  article: {
    name: '通知公告',
    desc: '文章查看',
    status: 'VALID',
    children: {
      edit: {
        name: '文章编辑',
        status: 'VALID',
        key: 'article_edit',
        alias: ['article_delete', 'article_publish'],
        desc: '文章创建、编辑、模板下载、Excel导入',
      },
      delete: {
        name: '文章删除',
        status: 'VALID',
        key: 'article_delete',
        desc: '文章删除、包含文章编辑',
      },
      publish: {
        name: '文章发布',
        status: 'VALID',
        key: 'article_publish',
        desc: '上/下架、包含文章编辑',
      },
    },
    hasLeaf: true,
  },

  themeOpen: {
    name: '主题开通统计',
    status: 'VALID',
    children: {
      create: { name: '主题开通创建', status: 'INVALID', key: 'themeOpen_create' },
      edit: { name: '主题开通编辑', status: 'INVALID', key: 'themeOpen_edit' },
      delete: { name: '开通删除', status: 'INVALID', key: 'themeOpen_delete' },
    },
    hasLeaf: true,
  },

  themeDo: {
    name: '主题办件统计',
    status: 'VALID',
    children: {
      create: { name: '主题办件创建', status: 'INVALID', key: 'themeDo_create' },
      edit: { name: '主题办件编辑', status: 'INVALID', key: 'themeDo_edit' },
      delete: { name: '主题办件删除', status: 'INVALID', key: 'themeDo_delete' },
    },
    hasLeaf: true,
  },

  portaitManage: {
    name: '画像管理',
    status: 'VALID',
    children: {
      create: { name: '画像管理创建', status: 'INVALID', key: 'portaitManage_create' },
      edit: { name: '画像管理编辑', status: 'INVALID', key: 'portaitManage_edit' },
      delete: { name: '画像管理删除', status: 'INVALID', key: 'portaitManage_delete' },
    },
    hasLeaf: true,
  },

  workOrderCommit: {
    name: '工单上报',
    status: 'VALID',
    children: {
      create: { name: '工单上报创建', status: 'INVALID', key: 'workOrderCommit_create' },
      edit: { name: '工单上报编辑', status: 'INVALID', key: 'workOrderCommit_edit' },
      delete: { name: '工单上报删除', status: 'INVALID', key: 'workOrderCommit_delete' },
    },
    hasLeaf: true,
  },

  workOrderConfirm: {
    name: '工单确认',
    status: 'VALID',
    children: {
      create: { name: '工单确认创建', status: 'INVALID', key: 'workOrderConfirm_create' },
      edit: { name: '工单确认编辑', status: 'INVALID', key: 'workOrderConfirm_edit' },
      delete: { name: '工单确认删除', status: 'INVALID', key: 'workOrderConfirm_delete' },
    },
    hasLeaf: true,
  },

  workOrderKnowledge: {
    name: '知识库接口',
    status: 'VALID',
    children: {
      create: { name: '知识库接口创建', status: 'INVALID', key: 'workOrderKnowledge_create' },
      edit: { name: '知识库接口编辑', status: 'INVALID', key: 'workOrderKnowledge_edit' },
      delete: { name: '知识库接口删除', status: 'INVALID', key: 'workOrderKnowledge_delete' },
    },
    hasLeaf: true,
  },

  tagManage: {
    name: '标签管理',
    desc: '标签查看',
    status: 'VALID',
    children: {
      edit: {
        name: '标签编辑',
        status: 'VALID',
        key: 'tagManage_edit',
        alias: ['tagManage_delete'],
        desc: '标签创建、编辑',
      },
      delete: {
        name: '标签删除',
        status: 'VALID',
        key: 'tagManage_delete',
        desc: '标签删除、包含标签编辑',
      },
      expandInfo: {
        name: '拓展信息',
        status: 'VALID',
        key: 'tagManage_detail_expandInfo',
        desc: '标签详情页面的基本信息分栏',
      },
      reviewRecord: {
        name: '审核记录',
        status: 'VALID',
        key: 'tagManage_detail_reviewRecord',
        desc: '标签详情页的审核记录分栏',
      },
    },
    hasLeaf: true,
  },

  tagAudit: {
    name: '标签审核',
    desc: '标签审核',
    status: 'VALID',
    children: {
      expandInfo: {
        name: '拓展信息',
        status: 'VALID',
        key: 'tagAudit_detail_expandInfo',
        desc: '标签详情页面的基本信息分栏',
      },
      reviewRecord: {
        name: '审核记录',
        status: 'VALID',
        key: 'tagAudit_detail_reviewRecord',
        desc: '标签详情页的审核记录分栏',
      },
    },
    hasLeaf: true,
  },
  tagSync: {
    name: '标签同步',
    desc: '标签同步',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  portraitLegal: {
    name: '用户管理-法人',
    status: 'VALID',
    children: {
      create: { name: '用户管理创建', status: 'INVALID', key: 'portraitLegal_create' },
      edit: { name: '用户管理编辑', status: 'INVALID', key: 'portraitLegal_edit' },
      delete: { name: '用户管理删除', status: 'INVALID', key: 'portraitLegal_delete' },
    },
    hasLeaf: true,
  },

  portraitSelf: {
    name: '用户管理-个人',
    status: 'VALID',
    children: {
      create: { name: '用户管理创建', status: 'INVALID', key: 'portraitSelf_create' },
      edit: { name: '用户管理编辑', status: 'INVALID', key: 'portraitSelf_edit' },
      delete: { name: '用户管理删除', status: 'INVALID', key: 'portraitSelf_delete' },
    },
    hasLeaf: true,
  },

  ruleManage: {
    name: '规则管理',
    status: 'VALID',
    children: {
      conditionView: {
        name: '查看(限定条件)',
        status: 'VALID',
        key: 'ruleManage_conditionView',
        alias: ['ruleManage_conditionEdit', 'ruleManage_conditionDelete'],
      },
      conditionEdit: {
        name: '编辑(限定条件)',
        desc: '限定条件新增、编辑，包含限定条件查看',
        status: 'VALID',
        key: 'ruleManage_conditionEdit',
        alias: ['ruleManage_conditionDelete'],
      },
      conditionDelete: {
        name: '删除(限定条件)',
        desc: '限定条件删除，包含限定条件编辑',
        status: 'VALID',
        key: 'ruleManage_conditionDelete',
      },
      funView: {
        name: '查看(函数)',
        status: 'VALID',
        key: 'ruleManage_funView',
        alias: ['ruleManage_funEdit', 'ruleManage_funPublish'],
      },
      funEdit: {
        name: '编辑(函数)',
        desc: '函数新增、编辑，包含函数查看',
        status: 'VALID',
        key: 'ruleManage_funEdit',
        alias: ['ruleManage_funPublish'],
      },
      funPublish: {
        name: '上下架(函数)',
        desc: '函数上下架，包含函数编辑',
        status: 'VALID',
        key: 'ruleManage_funPublish',
      },
    },
    hasLeaf: true,
  },

  recommendTest: {
    name: '推荐测试',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  paramsManage: {
    name: '参数管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  message: {
    name: '消息管理',
    desc: '消息查看',
    status: 'VALID',
    children: {
      edit: {
        name: '消息编辑',
        status: 'VALID',
        key: 'message_edit',
        alias: ['message_delete', 'message_publish'],
        desc: '消息创建、编辑、复制',
      },
      delete: {
        name: '消息删除',
        status: 'VALID',
        key: 'message_delete',
        desc: '消息删除、包含消息编辑',
      },
      publish: {
        name: '消息发布',
        status: 'VALID',
        key: 'message_publish',
        desc: '上/下架、包含消息编辑',
      },
    },
    hasLeaf: true,
  },
  service: {
    name: '服务管理',
    desc: '服务查看、导出',
    status: 'VALID',
    children: {
      edit: {
        name: '服务编辑',
        status: 'VALID',
        key: 'service_edit',
        alias: ['service_delete', 'service_publish'],
        desc: '服务新增、编辑',
      },
      bulk: {
        name: '服务批量',
        status: 'VALID',
        key: 'service_bulk',
        desc: '服务批量、包含服务编辑',
      },
      delete: {
        name: '服务删除',
        status: 'VALID',
        key: 'service_delete',
        desc: '服务删除、包含服务编辑',
      },
      publish: {
        name: '服务发布',
        status: 'VALID',
        key: 'service_publish',
        desc: '上/下架、包含服务编辑',
      },
      operate: {
        name: '服务运营',
        status: 'VALID',
        key: 'service_operate',
        desc: '修改标注、相似问',
      },
    },
    hasLeaf: true,
  },

  projectManage: {
    name: '申报项目',
    desc: '项目查看',
    status: 'VALID',
    children: {
      edit: {
        name: '项目编辑',
        status: 'VALID',
        key: 'projectManage_edit',
        alias: ['projectManage_delete', 'projectManage_publish', 'projectManage_operate'],
        desc: '项目新增、编辑、体检',
      },
      delete: {
        name: '项目删除',
        status: 'VALID',
        key: 'projectManage_delete',
        desc: '项目删除、包含项目编辑',
      },
      publish: {
        name: '项目发布',
        status: 'VALID',
        key: 'projectManage_publish',
        desc: '项目上下架、计算配置保存',
      },
      operate: {
        name: '项目运营',
        status: 'VALID',
        key: 'projectManage_operate',
        desc: '计算配置保存',
      },
    },
    hasLeaf: true,
  },

  policyProjectSync: {
    name: '政策项目同步',
    desc: '政策项目同步查看',
    status: 'VALID',
    children: {
      edit: {
        name: '政策项目同步编辑',
        status: 'INVALID',
        key: 'policyProjectSync_edit',
        alias: ['policyProjectSync_delete'],
        desc: '政策项目同步新增、编辑',
      },
      delete: {
        name: '政策项目同步删除',
        status: 'INVALID',
        key: 'policyProjectSync_delete',
        desc: '政策项目同步删除、包含政策项目同步编辑',
      },
    },
    hasLeaf: true,
  },

  standardFieldStore: {
    name: '标准字段管理',
    desc: '标准字段查看、导出',
    status: 'VALID',
    children: {
      edit: {
        name: '标准字段编辑',
        status: 'VALID',
        key: 'standardFieldStore_edit',
        alias: ['standardFieldStore_delete'],
        desc: '标准字段新增、编辑、模板下载、导入',
      },
      delete: {
        name: '标准字段删除',
        status: 'VALID',
        key: 'standardFieldStore_delete',
        desc: '标准字段删除、包含标准字段编辑',
      },
    },
    hasLeaf: true,
  },

  standardMaterial: {
    name: '标准材料管理',
    desc: '标准材料查看、导出',
    status: 'VALID',
    children: {
      edit: {
        name: '标准材料编辑',
        status: 'VALID',
        key: 'standardMaterial_edit',
        alias: ['standardMaterial_delete'],
        desc: '标准材料新增、编辑、模板下载、导入',
      },
      delete: {
        name: '标准材料删除',
        status: 'VALID',
        key: 'standardMaterial_delete',
        desc: '标准材料删除、包含标准材料编辑',
      },
      publish: {
        name: '标准材料发布',
        status: 'VALID',
        key: 'standardMaterial_publish',
        desc: '标准材料上下架、包含标准材料编辑',
      },
    },
    hasLeaf: true,
  },

  emoticon: {
    name: '表情包管理',
    desc: '表情包查看',
    status: 'VALID',
    children: {
      edit: {
        name: '表情包编辑',
        status: 'VALID',
        key: 'emoticon_edit',
        alias: ['emoticon_delete', 'emoticon_publish'],
        desc: '表情包编辑、新增',
      },
      delete: {
        name: '表情包删除',
        status: 'VALID',
        key: 'emoticon_delete',
        desc: '表情包删除、包含表情包编辑',
      },
      publish: {
        name: '表情包发布',
        status: 'VALID',
        key: 'emoticon_publish',
        desc: '表情包上下架、包含表情包编辑',
      },
    },
    hasLeaf: true,
  },

  functionWords: {
    name: '功能词管理',
    desc: '功能词查看、导出',
    status: 'VALID',
    children: {
      edit: {
        name: '功能词编辑',
        status: 'VALID',
        key: 'functionWords_edit',
        alias: ['functionWords_delete'],
        desc: '功能词编辑、新增、模板下载、导入',
      },
      delete: {
        name: '功能词删除',
        status: 'VALID',
        key: 'functionWords_delete',
        desc: '功能词删除、包含功能词编辑',
      },
    },
    hasLeaf: true,
  },

  tableManage: {
    name: '库表管理',
    desc: '库表查看',
    status: 'VALID',
    children: {
      edit: {
        name: '编辑',
        status: 'VALID',
        key: 'tableManage_edit',
        alias: ['tableManage_delete'],
        desc: '库表编辑、新增',
      },
      delete: {
        name: '库表删除',
        status: 'VALID',
        key: 'tableManage_delete',
        desc: '库表删除、包含库表编辑',
      },
    },
    hasLeaf: true,
  },

  minimalCondition: {
    name: '最小条件',
    desc: '最小条件',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  reviewPoint: {
    name: '审查要素库',
    desc: '审查要素查看',
    status: 'VALID',
    children: {
      edit: {
        name: '审查要素编辑',
        status: 'VALID',
        key: 'reviewPoint_edit',
        desc: '特别程序、申请条件、申请材料、填报表单列表',
      },
    },
    hasLeaf: true,
  },

  outputModule: {
    name: '输出管理',
    desc: '输出模块查看',
    status: 'VALID',
    children: {
      edit: {
        name: '输出模块编辑',
        status: 'VALID',
        key: 'outputModule_edit',
        alias: ['outputModule_delete'],
        desc: '输出模块编辑、新增',
      },
      delete: {
        name: '输出模块删除',
        status: 'VALID',
        key: 'outputModule_delete',
        desc: '输出模块删除、包含输出模块编辑',
      },
    },
    hasLeaf: true,
  },

  condition: {
    name: '条件管理',
    desc: '条件查看',
    status: 'VALID',
    children: {
      edit: {
        name: '条件管理编辑',
        status: 'VALID',
        key: 'condition_edit',
        alias: ['condition_delete'],
        desc: '条件新增、编辑',
      },
      delete: {
        name: '条件管理删除',
        status: 'VALID',
        key: 'condition_delete',
        desc: '条件删除、包含条件编辑',
      },
    },
    hasLeaf: true,
  },

  dictManage: {
    name: '字典管理',
    desc: '字典查看',
    status: 'VALID',
    children: {
      edit: {
        name: '字典编辑',
        status: 'INVALID',
        key: 'dictManage_edit',
        alias: ['dictManage_delete'],
        desc: '字典新增、编辑',
      },
      delete: {
        name: '字典删除',
        status: 'INVALID',
        key: 'dictManage_delete',
        desc: '字典删除、包含字典编辑',
      },
    },
    hasLeaf: true,
  },

  appRegister: {
    name: '应用注册',
    status: 'VALID',
    children: {
      create: { name: '应用创建', status: 'INVALID', key: 'appRegister_create' },
      edit: { name: '应用编辑', status: 'INVALID', key: 'appRegister_edit' },
      delete: { name: '应用删除', status: 'INVALID', key: 'appRegister_delete' },
    },
    hasLeaf: true,
  },
  applicationAudit: {
    name: '应用审核',
    status: 'VALID',
    children: {
      create: { name: '审核创建', status: 'INVALID', key: 'applicationAudit_create' },
      edit: { name: '审核编辑', status: 'INVALID', key: 'applicationAudit_edit' },
      delete: { name: '审核删除', status: 'INVALID', key: 'applicationAudit_delete' },
    },
    hasLeaf: true,
  },
  commonModel: {
    name: '公共模型',
    status: 'VALID',
    children: {
      create: { name: '模型创建', status: 'INVALID', key: 'commonModel_create' },
      edit: { name: '模型编辑', status: 'INVALID', key: 'commonModel_edit' },
      delete: { name: '模型删除', status: 'INVALID', key: 'commonModel_delete' },
    },
    hasLeaf: true,
  },
  subscription: {
    name: '订阅管理',
    status: 'VALID',
    children: {
      create: { name: '订阅创建', status: 'INVALID', key: 'subscription_create' },
      edit: { name: '订阅编辑', status: 'INVALID', key: 'subscription_edit' },
      delete: { name: '订阅删除', status: 'INVALID', key: 'subscription_delete' },
    },
    hasLeaf: true,
  },

  users: {
    name: '账号管理',
    status: 'VALID',
    children: {
      create: { name: '账号创建', status: 'INVALID', key: 'users_create' },
      edit: { name: '账号编辑', status: 'INVALID', key: 'users_edit' },
      delete: { name: '账号删除', status: 'INVALID', key: 'users_delete' },
    },
    hasLeaf: true,
  },
  role: {
    name: '角色管理',
    status: 'VALID',
    children: {
      create: { name: '角色创建', status: 'INVALID', key: 'role_create' },
      edit: { name: '角色编辑', status: 'INVALID', key: 'role_edit' },
      delete: { name: '角色删除', status: 'INVALID', key: 'role_delete' },
    },
    hasLeaf: true,
  },
  department: {
    name: '部门管理',
    status: 'VALID',
    children: {
      create: { name: '部门创建', status: 'INVALID', key: 'department_create' },
      edit: { name: '部门编辑', status: 'INVALID', key: 'department_edit' },
      delete: { name: '部门删除', status: 'INVALID', key: 'department_delete' },
    },
    hasLeaf: true,
  },

  operatingManual: {
    name: '产品手册',
    status: 'VALID',
    children: {
      create: { name: '手册创建', status: 'INVALID', key: 'operatingManual_create' },
      edit: { name: '手册编辑', status: 'INVALID', key: 'operatingManual_edit' },
      delete: { name: '手册删除', status: 'INVALID', key: 'operatingManual_delete' },
    },
    hasLeaf: true,
  },

  taskManage: {
    name: '任务管理',
    status: 'VALID',
    children: {
      create: { name: '任务创建', status: 'INVALID', key: 'taskManage_create' },
      edit: { name: '任务编辑', status: 'INVALID', key: 'taskManage_edit' },
      delete: { name: '任务删除', status: 'INVALID', key: 'taskManage_delete' },
    },
    hasLeaf: true,
  },

  themeConfig: {
    name: '主题配置',
    status: 'VALID',
    children: {
      create: { name: '配置创建', status: 'INVALID', key: 'themeConfig_create' },
      edit: { name: '配置编辑', status: 'INVALID', key: 'themeConfig_edit' },
      delete: { name: '配置删除', status: 'INVALID', key: 'themeConfig_delete' },
    },
    hasLeaf: true,
  },

  auditChain: {
    name: '审核链配置',
    status: 'VALID',
    children: {
      config: { name: '配置审核链', status: 'INVALID', key: 'auditChain_config' },
      clear: { name: '清除配置', status: 'INVALID', key: 'auditChain_clear' },
    },
    hasLeaf: true,
  },

  loginConfig: {
    name: '登录配置',
    status: 'VALID',
    children: {
      edit: { name: '登录配置编辑', status: 'INVALID', key: 'loginConfig_edit' },
    },
    hasLeaf: true,
  },

  archiveLib: {
    name: '档案库',
    desc: '档案库查看',
    status: 'VALID',
    hasLeaf: true, // 将children加到权限列表
    children: {
      edit: { name: '档案库编辑', status: 'VALID', desc: '档案库编辑', key: 'archiveLib_edit' },
    },
  },

  menuSetting: {
    name: '菜单配置', // 千人千面菜单配置
    desc: '菜单查看',
    status: 'VALID',
    hasLeaf: true, // 将children加到权限列表
    children: {
      edit: {
        name: '菜单编辑',
        status: 'VALID',
        alias: ['menuSetting_delete', 'menuSetting_publish'],
        desc: '菜单编辑、新增',
        key: 'menuSetting_edit',
      },
      delete: {
        name: '菜单删除',
        status: 'VALID',
        desc: '菜单删除、包含菜单编辑',
        key: 'menuSetting_delete',
      },
      publish: {
        name: '菜单发布',
        status: 'VALID',
        desc: '菜单上/下架、包含菜单编辑',
        key: 'menuSetting_publish',
      },
    },
  },
  departmentDict: {
    name: '字典配置',
    desc: '字典权限配置',
    status: 'VALID',
    hasLeaf: true, // 将children加到权限列表
    children: {
      edit: {
        name: '字典配置编辑',
        status: 'VALID',
        alias: ['departmentDict_delete'],
        desc: '字典配置编辑、新增',
        key: 'departmentDict_edit',
      },
      delete: {
        name: '字典配置删除',
        status: 'VALID',
        desc: '字典配置删除、包含编辑',
        key: 'departmentDict_delete',
      },
    },
  },
  subsystem: {
    name: '子系统',
    desc: '子系统配置',
    status: 'VALID',
  },
  modules: {
    name: '模块管理',
    desc: '模块查看',
    status: 'VALID',
    children: {
      edit: {
        name: '模块编辑',
        status: 'VALID',
        key: 'modules_edit',
        alias: ['modules_delete'],
        desc: '模块编辑',
      },
      delete: {
        name: '模块删除',
        status: 'VALID',
        key: 'modules_delete',
        desc: '模块删除、包含模块编辑',
      },
    },
    hasLeaf: true,
  },
  strategy: {
    name: '策略管理',
    desc: '策略管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },
  suggestTest: {
    name: '推荐测试',
    desc: '推荐测试',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },
  professionalWords: {
    name: '专业词管理',
    desc: '专业词管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },
  sceneDatManage: {
    name: '场景用数管理',
    desc: '场景用数管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },
  policyExplain: {
    name: '政策解读',
    desc: '政策解读',
    status: 'VALID',
    children: {
      edit: {
        name: '政策解读编辑',
        status: 'VALID',
        key: 'policyExplain_edit',
        alias: ['policyExplain_delete', 'policyExplain_publish'],
        desc: '政策解读创建、编辑',
      },
      delete: {
        name: '政策解读删除',
        status: 'VALID',
        key: 'policyExplain_delete',
        desc: '政策解读删除、包含政策解读编辑',
      },
      publish: {
        name: '政策解读发布',
        status: 'VALID',
        key: 'policyExplain_publish',
        desc: '政策解读上/下架、包含政策解读编辑',
      },
      operate: {
        name: '政策解读运营',
        status: 'VALID',
        key: 'policyExplain_operate',
        desc: '政策解读相似问',
      },
    },
    hasLeaf: true,
  },
  hotline: {
    name: '热线电话',
    desc: '热线电话',
    status: 'VALID',
    children: {
      edit: {
        name: '热线电话编辑',
        status: 'VALID',
        key: 'hotline_edit',
        alias: ['hotline_delete', 'hotline_publish'],
        desc: '热线电话创建、编辑',
      },
      delete: {
        name: '热线电话删除',
        status: 'VALID',
        key: 'hotline_delete',
        desc: '热线电话删除、包含热线电话编辑',
      },
      publish: {
        name: '热线电话发布',
        status: 'VALID',
        key: 'hotline_publish',
        desc: '热线电话上/下架、包含热线电话编辑',
      },
      operate: {
        name: '热线电话运营',
        status: 'VALID',
        key: 'hotline_operate',
        desc: '热线电话相似问',
      },
    },
    hasLeaf: true,
  },
  matterHandleGuide: {
    name: '网上办事指引',
    desc: '网上办事指引',
    status: 'VALID',
    children: {
      edit: {
        name: '网上办事编辑',
        status: 'VALID',
        key: 'matterHandleGuide_edit',
        alias: ['matterHandleGuide_delete', 'matterHandleGuide_publish'],
        desc: '网上办事创建、编辑',
      },
      delete: {
        name: '网上办事删除',
        status: 'VALID',
        key: 'matterHandleGuide_delete',
        desc: '网上办事删除、包含网上办事编辑',
      },
      publish: {
        name: '网上办事发布',
        status: 'VALID',
        key: 'matterHandleGuide_publish',
        desc: '网上办事上/下架、包含网上办事编辑',
      },
      operate: {
        name: '网上办事运营',
        status: 'VALID',
        key: 'matterHandleGuide_operate',
        desc: '网上办事相似问',
      },
    },
    hasLeaf: true,
  },

  smartQa: {
    name: '智能小申',
    desc: '智能小申',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  logRecord: {
    name: '日志监控管理',
    desc: '日志监控管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  certificationManage: {
    name: '证照管理',
    desc: '证照管理',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  },

  certificationSync: {
    name: '证照同步',
    desc: '证照同步',
    status: 'VALID',
    children: {},
    hasLeaf: true,
  }
};
