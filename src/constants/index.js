// 主题接入Excel模板文件下载地址
export const themeExcelUrl = '/uesop/file/市州业务主题梳理模板.xlsx';

// 主题接入Word模板文件下载地址
export const themeWordUrl = '/uesop/file/jointAffairsTemplate.docx';

// 标签管理导入模板下载地址
export const portraitTagExcelUrl = '/kernel/portraitTag/template';

// 标签管理导入地址
export const portraitImportUrl = '/kernel/portraitTag/import';

// 用户标签导入模板下载地址
export const userTagExcelUrl = '/kernel/portraitTag/personTemplate';

// 个人用户标签导入地址
export const selfTagImportUrl = '/kernel/portraitTag/personalImport';

// 法人用户标签导入地址
export const legalTagImportUrl = '/kernel/portraitTag/legalImport';

// 事项标签导入模板下载地址
export const matterTagExcelUrl = '/matter/portraitTagImportTemplate';
// 事项标签导入地址
export const matterTagImportlUrl = '/matter/portraitTagImport';

// 事项管理 前置事项导入模板地址
export const preMatterTemplateUrl = '/matter/preMatterImportTemplate';

// 事项管理 前置事项导入模板地址
export const preMatterUrl = '/matter/preMatterImport';

// 事项管理 表单拆解 导入模板地址
export const matterFormTemplateUrl = '/matterForms/exportTemplate';
// 事项管理 表单拆解 表单导入地址
export const matterFormImportUrl = '/matterForms/import';
// 事项管理 表单拆解 表单导出地址
export const matterFormAsyncExportUrl = '/matterForms/asyncExport';
// 事项管理 表单拆解 表单同步导出地址
export const matterFormExportUrl = '/matterForms/export';

// 政策标签模板下载
export const policyTagExcelUrl = '/policy/portraitTagImportTemplate';
// 政策画像标签导入
export const policyTagImportUrl = '/policy/portraitTagImport';

// 机构模板下载
export const institutionTemplateUrl = '/kernel/institution/importTemp';
// 机构数据导入
export const institutionImportUrl = '/kernel/institution/import';
// 机构数据导出
export const institutionExportUrl = '/kernel/institution/export';

// 字典模板下载
export const dictTemplateUrl = '/dict/outputExcelTemplate';
// 字典数据导入
export const dictImportUrl = '/dict/importExcel';
// 字典数据导出
export const dictExportUrl = '/dict/outputExcel';

// 文章导出地址
export const articleExportUrl = '/article/export';

// 标签管理 批量查询模板下载
export const portraitTagBulkExcelUrl = '/kernel/portraitTags/bulkEditImportTemplate';
// 标签管理 批量查询文件导入地址
export const portraitTagBulkImportUrl = '/kernel/portraitTags/bulkEditImport';

// 垃圾词管理 excel导入地址
export const rubbishImportlUrl = '/bannedWord/import';
// 垃圾词管理 词条库导出地址
export const rubbishExportUrl = '/bannedWord/export';
// 垃圾词管理 模板下载地址
export const rubbishTemplateUrl = '/bannedWord/getTemplate';

// 问答管理 问答导入地址
export const synonymsImportUrl = '/kernel/synonym/importExcel';
// 问答管理 模板下载地址
export const synonymsTemplateUrl = '/kernel/synonym/outputExcelTemplate';

// 审查要素库 特别程序导出
export const specialStepExportUrl = '/specialStep/exportExcel';
// 审查要素库 特别程序导入
export const specialStepImportUrl = '/specialStep/import';
// 审查要素库 特别程序模板下载
export const specialStepTemplateUrl = '/specialStep/outputExcelTemplate';

// 审查要素库 申请材料导出
export const applyMaterialExportUrl = '/applyMaterial/exportExcel';
// 审查要素库 申请材料导入
export const applyMaterialImportUrl = '/applyMaterial/import';
// 审查要素库 申请材料模板下载
export const applyMaterialTemplateUrl = '/applyMaterial/outputExcelTemplate';

// 审查要素库 申请条件导出
export const applyConditionExportUrl = '/applyCondition/exportExcel';
// 审查要素库 申请条件导入
export const applyConditionImportUrl = '/applyCondition/import';
// 审查要素库 申请条件模板下载
export const applyConditionTemplateUrl = '/applyCondition/outputExcelTemplate';

// 审查要素库 填报表单导出
export const formCheckPointExportUrl = '/formCheckPoint/export';
// 审查要素库 填报表单导入
export const formCheckPointImportUrl = '/formCheckPoint/import';
// 审查要素库 填报表单模板下载
export const formCheckPointTemplateUrl = '/formCheckPoint/export';

// 专业词导入模板
export const professionalWordsTemplateUrl = '/professionalWord/getTemplate';

// 专业词导出
export const professionalWordsExportUrl = '/professionalWord/export';

// 专业词导入
export const professionalWordsImport = '/professionalWord/import';

/**
 * 主题接入不同状态颜色
 *  audiStatus: [
    ['submit', 0, '待提交'],
    ['audit', 1, '待审核'],
    ['success', 2, '已通过'],
    ['refuse', 3, '已退回'],
  ],
 */
export const statusColor = {
  0: 'yellow',
  1: 'blue',
  2: 'green',
  3: 'red',
};

// 面向对象字典的key对应
export const objectDict = {
  person: 'DXLX0001001',
  legalPerson: 'DXLX0001002',
  personAndLegalPerson: 'DXLX0001003',
};

// 超管重置密码 默认密码

export const defaultPwd = 'Abc123';

// 超级管理员权限标识

export const adminPermission = 'admin';

// 默认请求前缀地址
export const defaultBaseUrl = '/uesop/api';

// 统计信息请求地址
export const summaryInfoUrl = `${defaultBaseUrl}/logManage/count/geStatistics`;

// 统计信息方法
export const summaryInfoMethod = {
  getSynonymsSummary: 'M01', // 问答记录数
  exportSynonymsSummary: 'M09', // 问答记录导出
  getHotQuestionSummary: 'M12', // 热门问题统计
  getQaSatisfactionSummary: 'M18', // 问答满意度统计
  getFootPrintSummary: 'M04', // 足迹数
  getFootPrintEveryDaySummary: 'M05', // 每日足迹数
  getLoginSummary: 'M03', // 登录数
  getLoginSummaryEveryDay: 'M04', // 每日登录数
  getLoginRepeatRate: 'M11', // 用户重复登录率
  getSort: 'M05', // 点击排序
  exportScenes: 'M10', // 导出主题记录数据
  getUserSummary: 'M07', // 注册，新增，男女，各年龄段用户数
  getLicenseSummary: 'M8', // 证照统计
  getOneFormSummary: 'M06', // 提交办理量
};
