import _ from 'lodash';
import { oneFormEvents } from '@/utils/constantEnum';

export default class ScriptTmp {
  scripts = [];

  preEventsScript = [];

  linkScript = [];

  dataSource = [];

  apis = [];

  constructor(apis) {
    this.apis = apis;
  }

  static specialSet(obj, fieldId, ctx) {
    switch (ctx) {
      case '$value': {
        _.set(obj, fieldId, '-*-$value-*-');
        break;
      }
      case '$linkValue': {
        _.set(obj, fieldId, '-*-$linkValue-*-');
        break;
      }
      default: {
        _.set(obj, fieldId, `-*-$ctx.${ctx}-*-`);
        break;
      }
    }
  }

  static cleanParams(params) {
    return _.reduce(
      params,
      (result, { request, ctx }) => {
        if (ctx && request) {
          const [fieldId, fieldType] = _.split(request, '__');
          switch (fieldType) {
            case 'body':
              ScriptTmp.specialSet(result.body, fieldId, ctx);
              break;
            case 'query':
              ScriptTmp.specialSet(result.params, fieldId, ctx);
              break;
            default:
              break;
          }
        }
        return result;
      },
      { body: {}, params: {} },
    );
  }

  static cleanResponseStr(ctxField) {
    return _.map(ctxField, ({ consumer, publisher }) => {
      return publisher ? `$ctx.${consumer} =  data.${publisher};` : '';
    });
  }

  static cleanReturnObj(select, $value) {
    if (select && select.value && select.label) {
      const { value, label } = select;
      const [parent, vkey] = _.split(value, '.');
      const [parent2, lKey] = _.split(label, '.');
      return `
return _.map(data.${parent}, (obj, index) => {
     return {
        value: obj.${vkey},
        label: obj.${lKey},
     }
});`;
    }

    if ($value) {
      return `
return data.${$value};     
      `;
    }
    return 'return data; ';
  }

  static cleanTemp(temp) {
    return temp.replaceAll('"-*-', '').replaceAll('-*-"', '');
  }

  scanDatasource(name, dataSource) {
    if (dataSource) {
      switch (dataSource.dataSourceType) {
        case 'dynamic': {
          const { api } = dataSource;
          const apiInstance = _.find(this.apis, { id: api });
          const { url, method } = apiInstance;
          if (url && method) {
            this.dataSource.push(ScriptTmp.apiCode(name, dataSource, apiInstance));
          }
          break;
        }
        default:
          break;
      }
    }
  }

  static apiCode(fxName, apiDescription, apiInstance) {
    const { ctxField, reqFields, select, $value } = apiDescription;
    const { url, method } = apiInstance;
    const requestParams = ScriptTmp.cleanParams(reqFields);
    const ctxSetterStr = ScriptTmp.cleanResponseStr(ctxField);
    const returnStr = ScriptTmp.cleanReturnObj(select, $value);
    return `
${fxName}(_ref){
    var $http = _ref.$http,
        $ctx = _ref.$ctx,
        $value = _ref.$value,
        $linkValue = _ref.$linkValue,
        _ = _ref._,
        _ref$$preUrl = _ref.$preUrl,
        $preUrl = _ref$$preUrl === void 0 ? '' : _ref$$preUrl;
    return $http.request({
      url: $preUrl+ '${url}',
      method: '${method}',
      params: ${JSON.stringify(requestParams.params)},
      body: ${JSON.stringify(requestParams.body)},
    }).then(function (_ref2) {
      var data = _ref2.data;
      ${ctxSetterStr}
      ${returnStr}
    });
}
      `;
  }

  scanPreEvents({ preEvents }) {
    _.forEach(preEvents, preEvent => {
      const apiInstance = _.find(this.apis, { id: preEvent.api });
      const { url, method } = apiInstance;
      if (url && method) {
        this.preEventsScript.push(ScriptTmp.apiCode(preEvent.id, preEvent, apiInstance));
      }
    });
  }

  scanLinks(id, links) {
    _.forEach(links, ({ source, reqFields = {}, ctxField = {}, select = {}, api, oper, so }) => {
      if (source && api && so === 'reset' && oper === 'change') {
        const apiInstance = _.find(this.apis, { id: api });
        this.linkScript.push(
          ScriptTmp.apiCode(
            `${source}_${id}_${oper}_${so}`,
            {
              ctxField,
              reqFields,
              select,
            },
            apiInstance,
          ),
        );
      }
    });
  }

  scan(item) {
    const { dataSource, validator = {}, links = [], id } = item;
    this.scanDatasource(`${id}_${oneFormEvents.data}`, dataSource);
    this.scanValidator(`${id}_${oneFormEvents.validate}`, validator);
    this.scanLinks(id, links);
  }

  scanValidator(name, { remote }) {
    if (!_.isEmpty(remote)) {
      const apiInstance = _.find(this.apis, { id: remote.api });
      this.validateTmp(
        ScriptTmp.apiCode(
          name,
          {
            ...remote,
            $value: remote.validateField,
          },
          apiInstance,
        ),
      );
    }
  }

  validateTmp(script) {
    this.scripts.push(`${script}`);
  }

  getTemp() {
    return ScriptTmp.cleanTemp(`
    {
      preEvents: {
        ${_.join(this.preEventsScript, ',')}
      },
      dataSource: {
          ${_.join(this.dataSource, ',')}
      },
      validator: {
      ${_.join(this.scripts, ',')}
      },
      links: {
      ${_.join(this.linkScript, ',')}
      }
    }
    `);
  }

  test() {
    console.log('-> this.getTemp()', this.getTemp());
    try {
      // eslint-disable-next-line no-eval
      const testObj = eval(`(${this.getTemp()})`);
      console.log('-> testObj', testObj);
    } catch (e) {
      console.error('-> e', e);
    }
  }
}
