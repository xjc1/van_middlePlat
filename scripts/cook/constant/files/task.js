module.exports = {
  namespace: 'task',
  lastExecuteStatus: [
    ['SUCCESS', 0, '成功'],
    ['FAILED', 1, '失败'],
  ],
  createStatus: [
    ['RUN', 0, '启用'],
    ['PAUSE', 1, '暂停'],
  ],
  runingStatus: [
    ['SUCCESS', 0, '运行中'],
    ['FAILED', 1, '已暂停'],
  ],
};
