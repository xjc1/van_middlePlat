const fs = require('fs');
const ejs = require('ejs');
const Axios = require('axios');
const { SERVER } = require('../../../config/setting');
const _ = require('lodash');

module.exports = async function(path) {
  const {
    data: { data },
  } = await Axios.request({
    method: 'get',
    url: `${SERVER}/uesop/api/sys/configs`,
  });
  const nextSystemConfigs = _.reduce(
    data,
    (result, { code: pCode, nextLayer = [] }) => {
      _.forEach(nextLayer, ({ code, name }) => {
        result.push(`['${code}', '${code}', '${name}'],`);
      });
      return result;
    },
    [],
  );

  const configTempEjs = `
module.exports = {
    namespace: 'system',
    configs: [
      <% for (var i = 1; i <= nextSystemConfigs.length;  i++ ) { %>
      <%- nextSystemConfigs[i] %> 
      <% } %>
    ]
}
      `;

  return ejs.render(configTempEjs, { nextSystemConfigs });
};
