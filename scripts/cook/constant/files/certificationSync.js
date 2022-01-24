module.exports = {
  namespace: 'certificationSync',
  status: [
    ['ing', 0, '同步中'],
    ['success', 1, '成功'],
    ['fail', 2, '失败'],
  ],
  type:[
    ['all', -1, '全部'],
    ['article', 1, '文章'],
    ['project', 2, '项目'],
    ['policy', 3, '政策'],
    ['projectSummary', 4, '项目一览'],
  ],
  change: [
    ['create', 1, '创建'],
    ['modify', 2, '修改'],
    ['delete', 3, '删除'],
  ]
};
