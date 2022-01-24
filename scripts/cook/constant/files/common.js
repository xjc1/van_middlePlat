module.exports = {
  namespace: 'common',
  yesNo: [
    ['yes', 1, '是'],
    ['no', 0, '否'],
  ],
  have: [
    ['yes', 1, '有'],
    ['no', 0, '无'],
  ],
  needUnNeed: [
    ['need', 1, '需要'],
    ['unNeed', 0, '不需要'],
  ],
  status: [
    ['VALID', 1, '有效'],
    ['INVALID', 0, '无效'],
  ],

  review: [
    ['pending', 0, '待审核'],
    ['resolve', 1, '已审核'],
    ['reject', 2, '已驳回'],
  ],

  shelf: [
    ['upper', 0, '上架'],
    ['lower', 1, '下架'],
  ],

  upDownStatus: [
    ['up', 1, '上架'],
    ['down', 0, '下架'],
  ],

  auditState: [
    ['unaudited', 0, '未审核'],
    ['audited', 1, '已审核'],
    ['refused', 2, '已驳回'],
  ],

  absence: [
    ['yes', true, '是'],
    ['no', false, '否'],
  ],

  materialAbsence: [
    ['yes', 1, '是'],
    ['no', 0, '否'],
  ],

  strategyType: [
    ['suggest', 'suggest', '推荐策略'],
    ['group', 'group', '分组策略'],
  ],

  objectType: [
    ['personal', '个人#', '个人'],
    ['legalPerson', '法人#', '法人'],
    ['personalLegalPerson', '个人#法人#', '个人/法人'],
  ],

  display: [
    ['hidden', 0, '隐藏'],
    ['visible', 1, '显示'],
  ],

  onTop: [
    ['no', 0, '否'],
    ['yes', 1, '是'],
  ],

  categories: [
    ['cater', '1', '餐饮服务'],
    ['education', '2', '教育培训'],
    ['finance', '3', '金融服务'],
    ['medical', '4', '医疗卫生'],
    ['entertainment', '5', '文化娱乐'],
    ['tech', '6', '科技创新'],
    ['life', '7', '居家生活'],
    ['sports', '8', '体育健身'],
    ['retail', '9', '批发零售'],
    ['traffic', '10', '交通运输'],
  ],

  isUse: [
    ['yes', 1, '可用'],
    ['no', 0, '不可用'],
  ],

  auditType: [
    ['SCENE', 0, '主题'],
    ['MATTER', 1, '事项'],
    ['QA', 2, '问答'],
    ['SERVICE', 3, '服务'],
    ['POLICY', 4, '政策'],
    ['PORTRAIT', 9, '画像'],
    ['OTHER', -1, '其它'],
  ],

  syncStatus: [
    ['IN_PROGRESS', 0, '同步中'],
    ['SUCCESSFUL', 1, '成功'],
    ['FAILED', 2, '失败'],
  ],

  switch: [
    ['OFF', 0, '关'],
    ['ON', 1, '开'],
  ],

  repeat: [
    ['SKIP', 0, '跳过'],
    ['COVER', 1, '覆盖'],
  ],

  syncRecordsType: [
    ['ALL', 1, '全部'],
    ['ARTICLE', 2, '文章'],
    ['POLICY', 3, '政策'],
    ['PROJECT', 4, '项目一览'],
    ['MATTER', 5, '事项'],
    ['PORTRAIT_TAG', 6, '画像标签'],
  ],

  sortType: [
    ['ascend', 0, '升序'],
    ['descend', 1, '降序'],
  ],

  periodic: [
    ['daily', 1, '日'],
    ['weekly', 7, '周'],
    ['monthly', 31, '月'],
  ],

  relationType: [
    ['AND', 'and', '且'],
    ['OR', 'or', '或'],
  ],

  contentType: [
    ['SCENE', 0, '主题'],
    ['MATTER', 1, '事项'],
    ['QUESTION', 2, '问答'],
    ['SERVICE', 3, '服务'],
    ['POLICY', 4, '政策'],
    ['WIKI', 6, '百科'],
    ['PROJECT', 9, '项目'],
    ['ARTICLE', 11, '文章'],
  ],

  applicationType: [
    ['search', 1, '搜索 '],
    ['qa', 2, '问答'],
    ['recommend', 3, '推荐'],
  ],

  scenesQARequiredType: [
    ['empty', '1', '空'],
    ['yes', '2', '是'],
    ['no', '3', '否'],
  ],
  timeType: [
    ['long', 'long', '长期'],
    ['short', 'short', '短期'],
  ],
  updateStatus:[
    ['add',0,'新增'],
    ['update',1,'更新']
  ]
};
