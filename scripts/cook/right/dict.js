const permissions = require('./permissions');

module.exports = {
  // {名称, 是否有效{ VALID, INVALID }, 子项}
  login: { name: '登录', status: 'INVALID' },

  content: {
    name: '内容运营',
    status: 'VALID',
    children: {
      themeManage: {
        name: '主题接入管理',
        status: 'VALID',
        children: {
          // 业务梳理
          themeAccess: permissions.themeAccess,
          // 梳理确认
          themeAudit: permissions.themeAudit,
          // 基本信息库
          infoLibrary: permissions.infoLibrary,
        },
      },

      themeOperation: {
        name: '主题管理',
        status: 'VALID',
        children: {
          // 事项管理
          matters: permissions.matters,
          // 事项同步
          mattersSync: permissions.mattersSync,
          // 材料拆解
          materialSplit: permissions.materialSplit,
          // 主题管理
          scenes: permissions.scenes,
          // 主题审核
          scenesAudit: permissions.scenesAudit,

          // 一表管理
          oneFormManager: permissions.oneFormManager,
          // 主题专栏（ 一事联办）
          oneMatter: permissions.oneMatter,
        },
      },

      policyKnowledgeLib: {
        name: '政务知识库',
        status: 'VALID',
        children: {
          // 政策内容
          policyContent: permissions.policyContent,
          // 政策图谱
          policyGraph: permissions.policyGraph,
          // 百科词条
          policyWord: permissions.policyWord,
          // 部门信息(机构管理)
          institutionManage: permissions.institutionManage,
          // 文章管理
          article: permissions.article,
          // 服务管理 (便民服务)
          service: permissions.service,
          // 项目管理
          projectManage: permissions.projectManage,
          // 政策项目同步
          policyProjectSync: permissions.policyProjectSync,
          // 问答管理
          synonyms: permissions.synonyms,
          // 政策解读
          policyExplain: permissions.policyExplain,
          // 热线电话
          hotline: permissions.hotline,
          // 网上办事指引
          matterHandleGuide: permissions.matterHandleGuide,
          // 智能小申
          smartQa: permissions.smartQa,
        },
      },

      // 审查要素库
      reviewPoint: permissions.reviewPoint,

      qaManage: {
        name: '问答运营',
        status: 'VALID',
        children: {
          //表情包管理
          emoticon: permissions.emoticon,

          // 维度管理
          dimensionManage: permissions.dimensionManage,
          // 热词管理
          hotWords: permissions.hotWords,
          // 问答设置
          synonymsSetting: permissions.synonymsSetting,
          // 聊天库
          chatLibrary: permissions.chatLibrary,
          // 热门问题
          hotQuestion: permissions.hotQuestion,
          // 刷新
          qaRefresh: permissions.qaRefresh,
          // 触发词
          triggerWords: permissions.triggerWords,
          // 功能词
          functionWords: permissions.functionWords,
          // 专业词
          professionalWords: permissions.professionalWords,
          // 垃圾词
          rubbishWords: permissions.rubbishWords,
        },
      },

      archiveManage: {
        name: '用户档案库',
        status: 'VALID',
        children: {
          // 档案库
          archiveLib: permissions.archiveLib,

          // 菜单配置
          menuSetting: permissions.menuSetting,

          // 标准材料管理
          standardMaterial: permissions.standardMaterial,
          // 标准字段管理
          standardFieldStore: permissions.standardFieldStore,
        },
      },

      efficacy: {
        name: '主题效能管理',
        status: 'VALID',
        children: {
          // 主题开通统计
          themeOpen: permissions.themeOpen,
          // 主题办件统计
          themeDo: permissions.themeDo,
        },
      },

      workOrder: {
        name: '知识库工单',
        status: 'VALID',
        children: {
          // 工单上报
          workOrderCommit: permissions.workOrderCommit,
          // 工单确认
          workOrderConfirm: permissions.workOrderConfirm,
          // 知识库接口
          workOrderKnowledge: permissions.workOrderKnowledge,
        },
      },

      portraitMenu: {
        name: '用户画像库',
        status: 'VALID',
        children: {
          // 标签管理
          tagManage: permissions.tagManage,
          // 用户管理-个人
          portraitSelf: permissions.portraitSelf,
          // 用户管理-法人
          portraitLegal: permissions.portraitLegal,
          // 规则管理
          ruleManage: permissions.ruleManage,
          // 库表管理
          tableManage: permissions.tableManage,
          // 最小条件
          minimalCondition: permissions.minimalCondition,
          // 标签审核
          tagAudit: permissions.tagAudit,
          // 标签同步
          tagSync: permissions.tagSync,
          // 输出管理
          outputModule: permissions.outputModule,
          // 推荐测试
          recommendTest: permissions.recommendTest,
          // 参数管理
          paramsManage: permissions.paramsManage,
        },
      },

      sceneData: {
        name: '场景用数',
        status: 'VALID',
        children: {
          // 场景用数管理
          sceneDataManage: permissions.sceneDatManage,
        },
      },

      recommendManage: {
        name: '推荐管理',
        status: 'VALID',
        children: {
          // 模块管理
          modules: permissions.modules,
          // 策略管理
          strategy: permissions.strategy,
          // 推荐测试
          suggestTest: permissions.suggestTest,
        },
      },

      messageMenu: {
        name: '消息中心',
        status: 'VALID',
        children: {
          // 消息管理
          message: permissions.message,
        },
      },

      certification: {
        name: '证照管理',
        status: 'VALID',
        children: {
          // 消息管理
          certificationManage: permissions.certificationManage,
          certificationSync: permissions.certificationSync,
        },
      },

      tool: {
        name: '工具菜单',
        status: 'VALID',
        children: {
          // 字典管理
          dictManage: permissions.dictManage,
        },
      },
      summaryInfo: {
        name: '统计信息',
        status: 'VALID',
        children: {},
      },
    },
  },

  app: {
    name: '应用运营',
    status: 'VALID',
    children: {
      appManager: {
        name: '主题应用接入',
        status: 'VALID',
        children: {
          // 应用注册
          appRegister: permissions.appRegister,
          // 应用审核
          applicationAudit: permissions.applicationAudit,
        },
      },
    },
  },

  model: {
    name: '模型运营',
    status: 'VALID',
    children: {
      modelManager: {
        name: '模型管理',
        status: 'VALID',
        children: {
          // 公共模型
          commonModel: permissions.commonModel,
          // 订阅管理
          subscription: permissions.subscription,
        },
      },
    },
  },

  system: {
    name: '系统',
    status: 'VALID',
    children: {
      systemManage: {
        name: '系统管理',
        status: 'VALID',
        children: {
          // 账号管理
          users: permissions.users,
          // 角色管理
          role: permissions.role,
          // 部门管理
          department: permissions.department,
          // 产品手册
          operatingManual: permissions.operatingManual,
          // 日志监控管理
          logRecord: permissions.logRecord,
          // 任务管理
          taskManage: permissions.taskManage,
        },
      },
      systemConfig: {
        name: '系统配置',
        status: 'VALID',
        children: {
          // 主题配置
          themeConfig: permissions.themeConfig,
          // 登录配置
          loginConfig: permissions.loginConfig,
          // 审核链配置
          auditChain: permissions.auditChain,
          // 字典权限配置
          departmentDict: permissions.departmentDict,
          // 子系统权限配置
          subsystem: permissions.subsystem,
        },
      },
    },
  },
};
