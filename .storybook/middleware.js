const { createProxyMiddleware } = require('http-proxy-middleware');
const proxys = require('../config/proxy');

module.exports = function expressMiddleware(router) {
  for (let proxysKey in proxys) {
    router.use(proxysKey, createProxyMiddleware(proxys[proxysKey]));
  }
};
