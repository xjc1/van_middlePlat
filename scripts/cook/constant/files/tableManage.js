module.exports = {
  namespace: 'tableManage',
  tableType: [
    ['CUSTOM', 0, '自定义'],
    ['TIS', 1, 'TIS表单'],
    ['TENANT', 2, '租户'],
    ['TIS_CUSTOM', 3, '自定义+TIS'],
    ['INTERFACE', 4, '接口'],
  ],
  multipleValues: [
    ['ONE', 'one', '任意一条'],
    ['ALL', 'all', '全部'],
    ['LATEST_ONE', 'latestOne', '最新更新的一条'],
    ['COUNT', 'count', '计算总条数'],
  ],
};
