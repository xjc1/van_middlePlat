module.exports = {
  namespace: 'modules',

  contentType: [
    ['SCENE', 0, '主题'],
    ['MATTER', 1, '事项'],
    ['SERVICE', 3, '服务'],
    ['POLICY', 4, '政策'],
    ['POLICY_PROJECT', 9, '项目'],
    ['ARTICLE', 11, '文章'],
  ],

  mixType: [
    ['CONTENT', 0, '内容类型排序'],
    ['PERCENT', 1, '百分比混合'],
  ],

  coverage: [
    ['ALL', 0, '全量'],
    ['CUSTOMIZE', 1, '自定义'],
  ],
  specialType: [
    ['TOP', 0, '置顶'],
    ['COMMON', 1, '通用'],
  ],
};
