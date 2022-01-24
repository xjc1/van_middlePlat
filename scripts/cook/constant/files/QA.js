module.exports = {
  namespace: 'qa',

  settingName: [
    ['GREETING', 'GREETING', '欢迎语'],
    ['NOANSWER', 'NOANSWER', '无答案回复'],
    ['SATISFACTION', 'SATISFACTION', '满意度'],
    ['VOICE', 'VOICE', '语音'],
  ],

  answerSource: [
    ['Knowledge', 'Knowledge', '引用知识点'],
    ['RichText', 'RichText', '自定义回复'],
    ['Service', 'Service', '服务调用'],
  ],

  answerSourceContent: [
    ['server', 2, '服务'],
    ['url', 1, '链接'],
  ],
};
