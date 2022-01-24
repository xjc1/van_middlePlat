module.exports = {
  namespace: 'policy',

  upDownStatus: [
    ['up', 1, '上架'],
    ['down', 0, '下架'],
  ],

  projectSyncStatus: [
    ['inProgress', 0, '同步中'],
    ['complete', 1, '同步完成'],
    ['error', 2, '同步失败'],
  ],
  stringYesNo: [
    ['yes', '1', '是'],
    ['no', '0', '否'],
  ],
  checkDuplicateType: [
    ['policyName', '1', '政策名称、文号查重'],
    ['similarity1', '2', '原文相似度95%'],
    ['similarity2', '3', '原文相似度80%'],
    ['similarity3', '4', '原文相似度60%'],
  ],
  collectStatus: [
    ['collected', 1, '已录入'],
    ['not_collected', 0, '未录入'],
  ],
  graphAudit: [
    ['audited', 1, '已审核'],
    ['notAudit', 0, '未审核'],
  ],
  graphLinkType: [
    ['cover', 1, '覆盖'],
    ['append', 0, '追加'],
  ],
  graphLink: [
    ['unlink', 1, '未关联'],
    ['other', 0, '其他'],
  ]
};
