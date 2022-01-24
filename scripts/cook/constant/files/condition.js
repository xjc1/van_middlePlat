module.exports = {
  namespace: 'condition',
  type: [
    ['order', 0, '排序'],
    ['define', 1, '限定'],
  ],

  object: [
    ['personal', 0, '个人'],
    ['legal', 1, '法人'],
  ],

  applyType: [['suggest', 0, '推荐']],

  reviewType: [
    ['NEED_REVIEW', 'need_review', '我审核的'],
    // "我提交的" 表示当前部门所属人员提交的
    ['CURRENT_DEPT', 'current_dept', '我提交的'],
  ],
};
