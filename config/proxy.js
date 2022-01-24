const _ = require('lodash');
const { SERVER } = require('./setting');

function formatProxies(apiPrefix = '', proxyMap = {}) {
  return _.reduce(
    proxyMap,
    (pre, config, urlCommonPath) => {
      if (typeof config === 'string') {
        return {
          ...pre,
          [`${apiPrefix}${urlCommonPath}`]: {
            target: config,
            pathRewrite: apiPrefix
              ? {
                  [`^${apiPrefix}`]: '/',
                }
              : {},
          },
        };
      }
      return {
        ...pre,
        [`${apiPrefix}${urlCommonPath}`]: config,
      };
    },
    {},
  );
}

module.exports = (prefix = '') => ({
  // '/server/api/': {
  //   target: 'https://preview.pro.ant.design/',
  //   changeOrigin: true,
  //   pathRewrite: { '^/server': '' },
  // },
  ...formatProxies(prefix, {
    '/kernel/**': 'http://10.10.20.66:8081/',
    '/uesop/api/**': SERVER,
    '/auth/**': SERVER,
    '/api/v1.0/**': 'http://10.10.22.234:3080/',
    // 文件上传接口
    '/fsc_upload/**': 'http://10.10.22.234:3080',
    '/fsc_download/**': 'http://10.10.22.234:3080',
    '/fsc_delete/**': SERVER,
    '/uesop/file/**': SERVER,
    // qa version
    '/webqa/version': SERVER,
    // 统计信息
    '/logManage/count/geStatistics': 'http://2y235o6650.51mypc.cn:23212',
  }),
});
