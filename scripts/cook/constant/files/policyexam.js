module.exports = {
  namespace: 'policyexam',

  necessary: [
    ['default', '0', '匹配度'],
    ['plus', '1', '匹配度/符合度'],
  ],

  isAccord: [
    ['none', 0, '不增加报告里'],
    ['yes', 2, '满足条件'],
    ['no', 1, '不满足条件'],
  ],
};
