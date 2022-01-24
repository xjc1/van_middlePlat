module.exports = {
  namespace: 'portrait',

  logicType: [
    ['role', 0, '限定条件'],
    ['function', 1, '函数'],
    ['multiLevel', 2, '函数多级'],
  ],

  isUse: [
    ['noUse', 0, '否'],
    ['use', 1, '是'],
  ],

  isLinkUser: [
    ['no', false, '否'],
    ['yes', true, '是'],
  ],

  linkUser: [
    ['no', 0, '未关联'],
    ['yes', 1, '已关联'],
  ],

  applyScenario: [
    ['MATTER', 1, '事项'],
    ['POLICY', 4, '政策'],
    ['SERVICE', 3, '服务'],
    ['PROJECT', 6, '项目'],
    ['ARTICLE', 5, '文章'],
    ['MESSAGE', 7, '消息中心'],
    ['OUTPUT', 10, '输出模块'],
    ['MENUCONFIG', 11, '菜单配置'],
    ['SCENE_GUIDE', 12, '引导问卷'],
    ['SCENE_CONDITION', 13, '办理条件'],
  ],

  auditState: [
    ['WAITING', 0, '待审核'],
    ['PASSED', 1, '审核通过'],
    ['REFUSE', 2, '审核驳回'],
    ['INTERRUPT', 3, '已作废'],
  ],

  updateStatus: [
    ['CREATE', 1, '新增'],
    ['MODIFIED', 2, '修改'],
    ['DELETE', 3, '删除'],
  ],
  rowType: [
    ['TAG', 0, '标签名称'],
    ['TYPE', 1, '标签分类'],
  ],
  colType: [
    ['REGION', 0, '行政区划'],
    ['RULE', 1, '关联规则'],
    ['USER', 2, '关联用户'],
    ['SOURCE', 3, '来源'],
    ['SCENE', 4, '应用场景'],
  ],
  refreshStatus: [
    ['RUNNING', 0, '统计中'],
    ['SUCCESS', 1, '成功'],
    ['FAIL', 2, '失败'],
  ],
};
