module.exports = {
  namespace: 'oneForm',

  type: [
    ['questionnaire', 'questionnaire', '问卷表单'],
    ['oneForm', 'oneForm', '主题表单'],
  ],

  validateType: [
    ['default', 0, '内置校验'],
    ['regexp', 1, '正则校验'],
    ['method', 2, '函数校验'],
    ['api', 3, '接口校验'],
  ],

  action: [
    ['moveElement', 'moveElement', '表单拖拽'],
    ['addWrapper', 'addWrapper', '容器添加'],
    ['addField', 'addField', '表单添加'],
    ['addUnit', 'addUnit', '小组件添加'],
    ['setValidate', 'setValidate', '设置静态校验器'],
  ],

  events: [
    ['prefix', 'prefix', '前置事件'],
    ['postfix', 'postfix', '后置事件'],
    ['compute', 'compute', '计算事件'],
    ['validate', 'validate', '异步校验事件'],
    ['change', 'change', '监听表单值变化事件'],
    ['data', 'data', '获取异步数据'],
  ],

  linkRule: [
    ['change', 'change', '改变'],
    ['full', 'full', '有值'],
    ['empty', 'empty', '无值'],
    ['bigger', 'bigger', '大于'],
    ['equal', 'equal', '等于'],
    ['smaller', 'smaller', '小于'],
  ],

  linkEcho: [
    ['visible', 'visible', '可见'],
    ['hidden', 'hidden', '隐藏'],
    ['remove', 'remove', '删除'],
    ['disabled', 'disabled', '禁用'],
    ['usable', 'usable', '可用'],
    ['empty', 'empty', '清空内容'],
    ['filter', 'filter', '按组过滤数据源'],
    ['reset', 'reset', '重置数据源'],
  ],

  displayMode: [
    ['horizontal', 'horizontal', '水平'],
    ['vertical', 'vertical', '垂直'],
  ],

  widgetStatus: [
    ['visible', 'visible', '可见'],
    ['hidden', 'hidden', '隐藏'],
    ['disabled', 'disabled', '禁用'],
  ],

  wrapperStatus: [
    ['visible', 'visible', '可见'],
    ['hidden', 'hidden', '隐藏'],
  ],

  unitStatus: [
    ['visible', 'visible', '可见'],
    ['hidden', 'hidden', '隐藏'],
    ['disabled', 'disabled', '禁用'],
  ],
};
