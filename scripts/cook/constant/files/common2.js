const USER_TYPE = {
  SELF: '1',
  LEGALPERSON: '2',
  SELF_AND_LEGALPERSON: '1,2',
};
module.exports = {
  terminalType: [
    ['pc', '1', 'PC'],
    ['soundBox', '2', '音箱'],
    ['selfTerminal', '3', '自助终端'],
    ['bot', '4', '机器人'],
    ['wx', '5', '微信端'],
    ['app', '6', 'APP'],
    ['wxApp', '7', '微信小程序'],
    ['zfbApp', '8', '支付宝小程序'],
    ['bdApp', '9', '百度小程序'],
  ],

  userType: [
    ['self', 1, '个人'],
    ['legalPerson', 2, '法人'],
  ],

  contentType: [
    ['text', 0, '纯文本'],
    ['richText', 1, '富文本'],
    ['originLink', 2, '原文链接'],
    ['defaultFormat', 3, '默认格式类型'],
  ],

  messageType: [['systemNotice', 1, '系统通知']],

  receivingRange: [
    ['allUser', 0, '全部用户'],
    ['specificUser', 1, '指定用户'],
    ['regions', 2, '行政区划'],
    ['tags', 3, '标签'],
  ],

  publishStatus: [
    ['notPublish', 0, '未发布'],
    ['publishing', 1, '发布中'],
    ['expired', 2, '已过期'],
  ],

  appUserType: [
    ['self', USER_TYPE.SELF, '个人'],
    ['legalPerson', USER_TYPE.LEGALPERSON, '法人'],
    ['selfAndLegalPerson', USER_TYPE.SELF_AND_LEGALPERSON, '个人/法人'],
  ],
  recommendAppUserType: [
    ['self', USER_TYPE.SELF, '个人'],
    ['legalPerson', USER_TYPE.LEGALPERSON, '法人'],
  ],
  pageStatus: [
    ['new', 0, '新增'],
    ['edit', 1, '编辑'],
    ['view', 2, '查看'],
    ['examine', 3, '审核'],
  ],

  audiStatus: [
    ['audit', 1, '待审核'],
    ['success', 2, '审核通过'],
    ['refuse', 3, '退回'],
  ],

  themeStatus: [
    ['submit', 0, '待提交'],
    ['audit', 1, '待审核'],
    ['success', 2, '已通过'],
    ['refuse', 3, '已退回'],
  ],
  cardingStatus: [
    ['draft', 0, '草案'],
    ['exposureDraft', 1, '征求意见稿'],
    ['confirm', 2, '最终确认稿'],
  ],

  dimensionMarkType: [
    ['scenes', 0, '主题'],
    ['matter', 1, '事项'],
    ['synonyms', 2, '问答'],
    ['convience', 3, '便民服务'],
  ],

  sourceType: [
    ['recordByHand', 0, '手动录入'],
    ['recordByAuto', 1, '自动导入'],
  ],
  implementationLevel: [
    ['province', 0, '省级'],
    ['city', 1, '市级'],
    ['district', 2, '区级'],
  ],
  tagsSourceType: [
    ['scene', 0, '主题'],
    ['matter', 1, '事项'],
    ['question', 2, '问答'],
    ['service', 3, '服务'],
    ['policy', 4, '政策'],
  ],
  sexType: [
    ['male', 0, '男'],
    ['female', 1, '女'],
  ],
  stringYesNo: [
    ['yes', '1', '是'],
    ['no', '0', '否'],
  ],
  themeGuideOptionStatus: [
    ['empty', 1, '空'],
    ['disabled', 2, '置灰'],
    ['hidden', 3, '隐藏'],
  ],
};
