module.exports = {
  namespace: 'scenes',

  type: [
    ['NORMAL_SCENES', 0, '普通主题'],
    ['CONNECT_SCENES', 1, '子主题'],
  ],

  auditState: [
    ['NEW', -1, '新建'],
    ['PEDDING', 0, '未审核'],
    ['RESOLVE', 1, '已审核'],
    ['REJECT', 2, '已退回'],
  ],

  isSmartType: [
    ['normal', '1', '一般主题'],
    ['smart', '0', '智能主题'],
    ['easyDo', '2', '好办主题'],
    ['oneCert', '3', '一业一证主题'],
    ['policy', '4', '政策申报主题'],
  ],
  dataUseSceneType: [
    ['policy', 0, '政务服务场景'],
    ['social', 1, '社会化场景'],
  ],
  dataUseType: [
    ['matter', 0, '事项用数'],
    ['custom', 1, '自定义用数'],
    ['verify', 2, '数据核验用数'],
  ],
  subjectType: [['person', '0', '个人']],
  publishStatus: [
    ['unPublish', 0, '未发布'],
    ['publish', 1, '已发布'],
  ],
  creationType: [
    ['province', 0, '省级统建'],
    ['city', 1, '市州自建'],
    ['specify', 2, '定标推广'],
  ],
};
