module.exports = {
  namespace: 'message',

  pushType: [
    ['common', 0, '普通推送'],
    ['longTime', 1, '长期推送'],
  ],
  status: [
    ['prePush', 0, '未推送'],
    ['pushing', 1, '推送中'],
    ['pushed', 2, '已推送'],
    ['revoked', 3, '已撤回'],
    ['allRevoked', 4, '已全部撤回'],
  ],
  revokeStatus: [
    ['effective', 3, '撤回有效'],
    ['all', 4, '全部'],
  ],
  contentType: [
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
  configType: [
    ['classify', 1, '消息分类'],
    ['notice', 2, '提醒样式'],
    ['authMethod', 3, '认证方式'],
    ['historyConfig', 4, '历史数据'],
  ],

  sendType: [
    ['pull', 1, '消息列表'],
    ['push', 2, '消息推送'],
    ['pullAndPush', 3, '消息列表&消息推送'],
  ],

  sendTypeBack: [
    ['0', [], '无'],
    ['1', [1], '消息列表'],
    ['2', [2], '消息推送'],
    ['3', [1, 2], '全部'],
  ],

  useScence: [
    ['pull', 1, '消息列表'],
    ['push', 2, '消息推送'],
    ['notice', 3, '提醒列表'],
  ],

  historyType: [
    ['pull', 0, '拉取'],
    ['push', 1, '推送'],
  ]
};
