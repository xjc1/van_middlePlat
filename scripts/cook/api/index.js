'use strict';
const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const { SERVER } = require('../../../config/setting');


function generateService(pre = '/uesop/api', schema, fileName, whitelist) {
  let temp = `
/* eslint-disable  no-unused-expressions, no-underscore-dangle, no-func-assign */

// 本文件由代码生成，勿直接修改
import { notification } from "antd";
import Request, { codeMessage } from '@/utils/request';
import { EventCenter } from '@/components/tis_ui';
import _ from 'lodash';
const { BASE_URL = '' } = process.env;

function fail({ msg, status }) {
  notification.error({
    message: \`请求错误 \${status}\`,
    description: msg,
  });
  if (status === 401) {
    EventCenter.emit('401');
  }
};

window.addEventListener('unhandledrejection', event => {
    if(event instanceof  PromiseRejectionEvent){
        event.reason && event.reason._TYPE_ === 'apiError' && fail(event.reason)
    }
});

function mapClientType2String(clientType) {
  return Array.isArray(clientType) ? clientType.map(String) : String(clientType);
}

function formatResponse(response) {
  if (_.isNil(response)) return response;
  if (typeof response === 'object' && !Array.isArray(response)) {
    // 处理列表中终端类型的转换
    if (_.has(response, 'content[0].clientType')) {
      const { content } = response;
      return {
        ...response,
        content: content.map(it => {
          const { clientType = [] } = it;
          return {
            ...it,
            clientType: mapClientType2String(clientType),
          };
        }),
      };
    }
    // 处理详情中终端类型的转换
    if (_.has(response, 'clientType')) {
      const { clientType } = response;
      return { ...response, clientType: mapClientType2String(clientType) };
    }
  }
  return response;
}

let options = {
  preUrl: \`\${BASE_URL}${pre}\`,
  endPoint: '',
  send(url, options2, resolve, reject) {
    Request(url, options2)
      .then(res => {
        if (res.state === 1) {
          resolve(formatResponse(res.data));
        } else if (res.state === 0) {
          reject({
            _TYPE_: 'apiError',
            status: res.code,
            msg: res.msg,
          })
        } else {
          res.json().then(resJson => {
            const {
              data: { status, message },
            } = resJson;
            reject({
              _TYPE_: 'apiError',
              status,
              msg: message,
            });
          });
        }
      }).catch(error => {
        const { response: resp } = error;
      if (resp && resp.status && resp.status in codeMessage) {
        reject({
          _TYPE_: 'apiError',
          status: codeMessage[resp.status],
          msg: resp.statusText,
          data:resp,
        });
      } else {
        resp.json().then(respJson => {
          reject({
            _TYPE_: 'apiError',
            status: respJson.status,
            msg: respJson.message,
            data:respJson,
          });
        });
      }
    });
  },
};


function setting({fail: resetFail, ...nextOptions}) {
    options = {...options, ...nextOptions};
    fail = resetFail || fail;
}


export default setting;
export { fail };


`;
  const groupSchema = _.groupBy(schema, ({ url }) => {
    const [pre, ...paths] = url.split('/');
    return paths.length === 1 ? 'CORE' : paths[0];
  });

  if (whitelist) {
    _.forEach(groupSchema, (val, name) => {
      if (_.indexOf(whitelist, name) < 0) {
        Object.defineProperty(groupSchema, name, {
          enumerable: false,
        });
      }
    });
  }

  function generateReqest(
    { url, credentials = false, apiName, method },
    headerParam,
    pathParam,
    queryParam,
    bodyParam,
  ) {
    let apiUrl = url;
    let paramStr = [];
    const headers = ["'Content-Type': 'application/json;charset=utf-8'"];
    if (_.indexOf(headerParam, 'Authorization') >= 0) {
      headers.push("'Authorization': `Bearer ${localStorage.getItem('token')}`");
    }
    let options = [
      `method: '${method}'`,
      `
                headers: {
                          ${headers.join(',')}
                      }`,
    ];

    _.forEach(pathParam, name => {
      apiUrl = apiUrl.replace(`{${name}}`, '${' + `${name}` + '}');
      paramStr.push(name);
    });

    if (queryParam.length > 0 || bodyParam.length > 0) {
      const innerParams = [];
      if (queryParam.length > 0) {
        innerParams.push('params = {}');
      }
      if (bodyParam.length > 0) {
        innerParams.push('body = {}');
      }
      paramStr.push(`{${_.join(innerParams, ',')}}`);
    }

    if (queryParam.length > 0) {
      options.push(`
                params`);
    }

    if (bodyParam.length > 0) {
      options.push(`
                data: JSON.stringify(body)`);
    }

    // if (method !== 'GET') {
    //   paramStr.push('body = {}');
    //   options.push('data: JSON.stringify(body)');
    // } else {
    //   paramStr.push('params = {}');
    //   options.push(' params');
    // }

    credentials && options.push("credentials: 'include'");
    return `
    // ${_.join(queryParam, ' , ')}
    ${apiName}(${paramStr.join(',')}) {
        const {endPoint, preUrl, send } = options;
        const $url = \`\${endPoint}\${preUrl}${apiUrl}\`;
        return new Promise((resolve, reject) => {
            send($url, {
                ${options.join(',')}
            },resolve, reject);
        });
    },
    `;
  }

  _.forEach(groupSchema, (groupApis, k) => {
    const requestTemp = _.reduce(
      groupApis,
      (result, api) => {
        const { parameters, url } = api;
        const headerParam = _.chain(parameters)
          .filter({
            in: 'header',
            required: true,
          })
          .map(({ name }) => name)
          .value();
        const pathParam = _.chain(parameters)
          .filter({ in: 'path' })
          .map(({ name }) => name)
          .value();
        const bodyParam = _.chain(parameters)
          .filter({ in: 'body' })
          .map(({ name }) => name)
          .value();
        const queryParam = _.chain(parameters)
          .filter({ in: 'query' })
          .map(({ name }) => name)
          .value();
        result += ``;
        result += generateReqest(api, headerParam, pathParam, queryParam, bodyParam);
        return result;
      },
      '',
    );

    temp += `

const  ${k.toUpperCase().replace(/[\.\-]/g, '_')} =  {
    pre_path:   \`\${options.endPoint}\${options.preUrl}\`,

    ${requestTemp}

};

export {${k.toUpperCase().replace(/[\.\-]/g, '_')}};

`;
  });

  fs.writeFileSync(__dirname + `/../../../src/services/${fileName}.js`, temp);
}

module.exports = (pre, url = `${SERVER}/uesop/api/v2/api-docs`, fileName = 'api', whitelist) => {
  axios.get(url).then(({ data }) => {
    const { paths } = data;
    const schema = _.reduce(
      paths,
      (result, obj, key) => {
        _.forEach(obj, ({ operationId, summary, parameters }, method) => {
          result.push({
            url: key,
            method: _.upperCase(method),
            apiName: operationId.replace(/[_0-9]{2}$/, ''),
            operationId,
            parameters,
          });
        });
        return result;
      },
      [],
    );
    generateService(pre, schema, fileName, whitelist);
  });
};
