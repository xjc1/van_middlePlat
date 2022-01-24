module.exports = {
  namespace: 'material',

  type: [
    ['standard', '0', '通用材料'],
    ['unStandard', '1', '分组材料'],
  ],
  source: [
    ['free', 0, '免提交'],
    ['self', 1, '自备'],
  ],

  shareSource: [
    ['cert', '0', '电子证照库'],
    ['third', '1', '第三方接口'],
    ['tis', '2', 'tis档案库(自行)'],
  ],

  status: [
    ['add', 0, '新增'],
    ['update', 1, '更新'],
    ['delete', 2, '删除'],
  ],
  auditStatus: [
    ['all', -1, '全部'],
    ['fail', 0, '未通过'],
    ['pass', 1, '通过'],
  ],
};
