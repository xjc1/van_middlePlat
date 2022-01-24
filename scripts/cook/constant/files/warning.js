module.exports = {
  namespace: 'warning',

  type: [
    ['scene', 0, '主题'],
    ['matter', 1, '事项'],
    ['convenience', 3, '服务'],
    ['policyLibrary', 4, '政策'],
    ['article', 5, '文章'],
    ['project', 6, '项目'],
    ['message', 7, '消息'],
    ['link', 8, '链接'],
    ['text', 9, '纯文本'],
    ['customize', 10, '自定义'],
  ],

  format: [
    ['default', 0, '默认'],
    ['customize', 1, '自定义'],
    ['pagePath', 2, '页面路径'],
    ['outsideApp', 3, '外部应用'],
  ],
  pictureType: [
    ['pictureLib', 0, '图库'],
    ['customize', 1, '自定义'],
  ],
};
