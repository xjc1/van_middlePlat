import { parse, stringify } from 'qs';
import 'isomorphic-fetch';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }),
      );
    }

    ownKeys.forEach(function(key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function(module) {
  function _typeof2(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof2 = function _typeof2(obj) {
        return typeof obj;
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }
    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

// ????????????????????????????????????????????????
function compose(middlewares) {
  if (!Array.isArray(middlewares)) throw new TypeError('Middlewares must be an array!');
  var middlewaresLen = middlewares.length;

  for (var i = 0; i < middlewaresLen; i++) {
    if (typeof middlewares[i] !== 'function') {
      throw new TypeError('Middleware must be componsed of function');
    }
  }

  return function wrapMiddlewares(params, next) {
    var index = -1;

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(
          new Error('next() should not be called multiple times in one middleware!'),
        );
      }

      index = i;
      var fn = middlewares[i] || next;
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(
          fn(params, function() {
            return dispatch(i + 1);
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}

var Onion =
  /*#__PURE__*/
  (function() {
    function Onion(defaultMiddlewares) {
      classCallCheck(this, Onion);

      if (!Array.isArray(defaultMiddlewares))
        throw new TypeError('Default middlewares must be an array!');
      this.defaultMiddlewares = toConsumableArray(defaultMiddlewares);
      this.middlewares = [];
    }

    createClass(Onion, [
      {
        key: 'use',
        // ???????????????????????????
        value: function use(newMiddleware) {
          var opts =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {
                  global: false,
                  core: false,
                  defaultInstance: false,
                };
          var core = false;
          var global = false;
          var defaultInstance = false;

          if (typeof opts === 'number') {
            if (process && process.env && process.env.NODE_ENV === 'development') {
              console.warn(
                'use() options should be object, number property would be deprecated in future???please update use() options to "{ core: true }".',
              );
            }

            core = true;
            global = false;
          } else if (_typeof_1(opts) === 'object' && opts) {
            global = opts.global || false;
            core = opts.core || false;
            defaultInstance = opts.defaultInstance || false;
          } // ???????????????

          if (global) {
            Onion.globalMiddlewares.splice(
              Onion.globalMiddlewares.length - Onion.defaultGlobalMiddlewaresLength,
              0,
              newMiddleware,
            );
            return;
          } // ???????????????

          if (core) {
            Onion.coreMiddlewares.splice(
              Onion.coreMiddlewares.length - Onion.defaultCoreMiddlewaresLength,
              0,
              newMiddleware,
            );
            return;
          } // ??????????????????????????????????????????

          if (defaultInstance) {
            this.defaultMiddlewares.push(newMiddleware);
            return;
          } // ???????????????

          this.middlewares.push(newMiddleware);
        },
      },
      {
        key: 'execute',
        value: function execute() {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var fn = compose(
            [].concat(
              toConsumableArray(this.middlewares),
              toConsumableArray(this.defaultMiddlewares),
              toConsumableArray(Onion.globalMiddlewares),
              toConsumableArray(Onion.coreMiddlewares),
            ),
          );
          return fn(params);
        },
      },
    ]);

    return Onion;
  })();

Onion.globalMiddlewares = [];
Onion.defaultGlobalMiddlewaresLength = 0;
Onion.coreMiddlewares = [];
Onion.defaultCoreMiddlewaresLength = 0;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === 'object' || typeof call === 'function')) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function(module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function(module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1;
}

var isNativeFunction = _isNativeFunction;

var construct = createCommonjsModule(function(module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
});

var wrapNativeSuper = createCommonjsModule(function(module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === 'function' ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== 'function') {
        throw new TypeError('Super expression must either be null or a function');
      }

      if (typeof _cache !== 'undefined') {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
});

var MapCache =
  /*#__PURE__*/
  (function() {
    function MapCache(options) {
      classCallCheck(this, MapCache);

      this.cache = new Map();
      this.timer = {};
      this.extendOptions(options);
    }

    createClass(MapCache, [
      {
        key: 'extendOptions',
        value: function extendOptions(options) {
          this.maxCache = options.maxCache || 0;
        },
      },
      {
        key: 'get',
        value: function get(key) {
          return this.cache.get(JSON.stringify(key));
        },
      },
      {
        key: 'set',
        value: function set(key, value) {
          var _this = this;

          var ttl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60000;

          // ???????????????????????????, ??????????????????????????????.
          if (this.maxCache > 0 && this.cache.size >= this.maxCache) {
            var deleteKey = toConsumableArray(this.cache.keys())[0];

            this.cache.delete(deleteKey);

            if (this.timer[deleteKey]) {
              clearTimeout(this.timer[deleteKey]);
            }
          }

          var cacheKey = JSON.stringify(key);
          this.cache.set(cacheKey, value);

          if (ttl > 0) {
            this.timer[cacheKey] = setTimeout(function() {
              _this.cache.delete(cacheKey);

              delete _this.timer[cacheKey];
            }, ttl);
          }
        },
      },
      {
        key: 'delete',
        value: function _delete(key) {
          var cacheKey = JSON.stringify(key);
          delete this.timer[cacheKey];
          return this.cache.delete(cacheKey);
        },
      },
      {
        key: 'clear',
        value: function clear() {
          this.timer = {};
          return this.cache.clear();
        },
      },
    ]);

    return MapCache;
  })();
/**
 * ????????????
 */

var RequestError =
  /*#__PURE__*/
  (function(_Error) {
    inherits(RequestError, _Error);

    function RequestError(text, request) {
      var _this2;

      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'RequestError';

      classCallCheck(this, RequestError);

      _this2 = possibleConstructorReturn(this, getPrototypeOf(RequestError).call(this, text));
      _this2.name = 'RequestError';
      _this2.request = request;
      _this2.type = type;
      return _this2;
    }

    return RequestError;
  })(wrapNativeSuper(Error));
/**
 * ????????????
 */

var ResponseError =
  /*#__PURE__*/
  (function(_Error2) {
    inherits(ResponseError, _Error2);

    function ResponseError(response, text, data, request) {
      var _this3;

      var type =
        arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'ResponseError';

      classCallCheck(this, ResponseError);

      _this3 = possibleConstructorReturn(
        this,
        getPrototypeOf(ResponseError).call(this, text || response.statusText),
      );
      _this3.name = 'ResponseError';
      _this3.data = data;
      _this3.response = response;
      _this3.request = request;
      _this3.type = type;
      return _this3;
    }

    return ResponseError;
  })(wrapNativeSuper(Error));
/**
 * http://gitlab.alipay-inc.com/KBSJ/gxt/blob/release_gxt_S8928905_20180531/src/util/request.js#L63
 * ??????gbk
 */

function readerGBK(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();

    reader.onload = function() {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsText(file, 'GBK'); // setup GBK decoding
  });
}
/**
 * ?????????JSON.parse
 */

function safeJsonParse(data) {
  var throwErrIfParseFail =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var response = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var request = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  try {
    return JSON.parse(data, (key, value) => {
      return value === null ? undefined : value;
    });
  } catch (e) {
    if (throwErrIfParseFail) {
      throw new ResponseError(response, 'JSON.parse fail', data, request, 'ParseError');
    }
  } // eslint-disable-line no-empty

  return data;
}
function timeout2Throw(msec, request) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new RequestError('timeout of '.concat(msec, 'ms exceeded'), request, 'Timeout'));
    }, msec);
  });
} // If request options contain 'cancelToken', reject request when token has been canceled

function cancel2Throw(opt) {
  return new Promise(function(_, reject) {
    if (opt.cancelToken) {
      opt.cancelToken.promise.then(function(cancel) {
        reject(cancel);
      });
    }
  });
}
var toString = Object.prototype.toString; // Check env is browser or node

function getEnv() {
  var env; // Only Node.JS has a process variable that is of [[Class]] process

  if (typeof process !== 'undefined' && toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    env = 'NODE';
  }

  if (typeof XMLHttpRequest !== 'undefined') {
    env = 'BROWSER';
  }

  return env;
}
function isArray(val) {
  return _typeof_1(val) === 'object' && Object.prototype.toString.call(val) === '[object Array]';
}
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
function isDate(val) {
  return _typeof_1(val) === 'object' && Object.prototype.toString.call(val) === '[object Date]';
}
function isObject(val) {
  return val !== null && _typeof_1(val) === 'object';
}
function forEach2ObjArr(target, callback) {
  if (!target) return;

  if (_typeof_1(target) !== 'object') {
    target = [target];
  }

  if (isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      callback.call(null, target[i], i, target);
    }
  } else {
    for (var key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        callback.call(null, target[key], key, target);
      }
    }
  }
}
function getParamObject(val) {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), {
      strictNullHandling: true,
    });
  }

  if (typeof val === 'string') {
    return [val];
  }

  return val;
}
function reqStringify(val) {
  return stringify(val, {
    arrayFormat: 'repeat',
    strictNullHandling: true,
  });
}
function mergeRequestOptions(options, options2Merge) {
  return objectSpread({}, options, options2Merge, {
    headers: objectSpread({}, options.headers, options2Merge.headers),
    params: objectSpread({}, getParamObject(options.params), getParamObject(options2Merge.params)),
    method: (options2Merge.method || options.method || 'get').toLowerCase(),
  });
}

// ???????????????
var addfix = function addfix(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var prefix = options.prefix,
    suffix = options.suffix;

  if (prefix) {
    url = ''.concat(prefix).concat(url);
  }

  if (suffix) {
    url = ''.concat(url).concat(suffix);
  }

  return {
    url: url,
    options: options,
  };
};

var warnedCoreType = false; // ????????????????????????????????????????????? get ????????????

function __defaultValidateCache(url, options) {
  var _options$method = options.method,
    method = _options$method === void 0 ? 'get' : _options$method;
  return method.toLowerCase() === 'get';
}

function fetchMiddleware(ctx, next) {
  if (!ctx) return next();
  var _ctx$req = ctx.req;
  _ctx$req = _ctx$req === void 0 ? {} : _ctx$req;
  var _ctx$req$options = _ctx$req.options,
    options = _ctx$req$options === void 0 ? {} : _ctx$req$options,
    _ctx$req$url = _ctx$req.url,
    url = _ctx$req$url === void 0 ? '' : _ctx$req$url,
    cache = ctx.cache,
    responseInterceptors = ctx.responseInterceptors;

  var _options$timeout = options.timeout,
    timeout = _options$timeout === void 0 ? 0 : _options$timeout,
    _options$__umiRequest = options.__umiRequestCoreType__,
    __umiRequestCoreType__ = _options$__umiRequest === void 0 ? 'normal' : _options$__umiRequest,
    _options$useCache = options.useCache,
    useCache = _options$useCache === void 0 ? false : _options$useCache,
    _options$method2 = options.method,
    method = _options$method2 === void 0 ? 'get' : _options$method2,
    params = options.params,
    ttl = options.ttl,
    _options$validateCach = options.validateCache,
    validateCache =
      _options$validateCach === void 0 ? __defaultValidateCache : _options$validateCach;

  if (__umiRequestCoreType__ !== 'normal') {
    if (
      process &&
      process.env &&
      process.env.NODE_ENV === 'development' &&
      warnedCoreType === false
    ) {
      warnedCoreType = true;
      console.warn(
        '__umiRequestCoreType__ is a internal property that use in umi-request, change its value would affect the behavior of request! It only use when you want to extend or use request core.',
      );
    }

    return next();
  }

  var adapter = fetch;

  if (!adapter) {
    throw new Error('Global fetch not exist!');
  } // ???????????????????????????????????????

  var isBrowser = getEnv() === 'BROWSER';
  var needCache = validateCache(url, options) && useCache && isBrowser;

  if (needCache) {
    var responseCache = cache.get({
      url: url,
      params: params,
      method: method,
    });

    if (responseCache) {
      responseCache = responseCache.clone();
      responseCache.useCache = true;
      ctx.res = responseCache;
      return next();
    }
  }

  var response; // ?????????????????????????????????

  if (timeout > 0) {
    response = Promise.race([
      cancel2Throw(options),
      adapter(url, options),
      timeout2Throw(timeout, ctx.req),
    ]);
  } else {
    response = Promise.race([cancel2Throw(options), adapter(url, options)]);
  } // ??????????????? response.interceptor

  responseInterceptors.forEach(function(handler) {
    response = response.then(function(res) {
      // Fix multiple clones not working, issue: https://github.com/github/fetch/issues/504
      var clonedRes = typeof res.clone === 'function' ? res.clone() : res;
      return handler(clonedRes, options);
    });
  });
  return response.then(function(res) {
    // ?????????????????????
    if (needCache) {
      if (res.status === 200) {
        var copy = res.clone();
        copy.useCache = true;
        cache.set(
          {
            url: url,
            params: params,
            method: method,
          },
          copy,
          ttl,
        );
      }
    }

    ctx.res = res;
    return next();
  });
}

function parseResponseMiddleware(ctx, next) {
  var copy;
  return next()
    .then(function() {
      if (!ctx) return;
      var _ctx$res = ctx.res,
        res = _ctx$res === void 0 ? {} : _ctx$res,
        _ctx$req = ctx.req,
        req = _ctx$req === void 0 ? {} : _ctx$req;

      var _ref = req || {},
        _ref$options = _ref.options;

      _ref$options = _ref$options === void 0 ? {} : _ref$options;
      var _ref$options$response = _ref$options.responseType,
        responseType = _ref$options$response === void 0 ? 'json' : _ref$options$response,
        _ref$options$charset = _ref$options.charset,
        charset = _ref$options$charset === void 0 ? 'utf8' : _ref$options$charset,
        _ref$options$getRespo = _ref$options.getResponse,
        _ref$options$throwErr = _ref$options.throwErrIfParseFail,
        throwErrIfParseFail = _ref$options$throwErr === void 0 ? false : _ref$options$throwErr,
        _ref$options$parseRes = _ref$options.parseResponse,
        parseResponse = _ref$options$parseRes === void 0 ? true : _ref$options$parseRes;

      if (!parseResponse) {
        return;
      }

      if (!res || !res.clone) {
        return;
      } // ???????????????????????? response ???????????? node ??????????????? response ?????????????????????https://github.com/bitinn/node-fetch/issues/553

      copy = getEnv() === 'BROWSER' ? res.clone() : res;
      copy.useCache = res.useCache || false; // ????????????

      if (charset === 'gbk') {
        try {
          return res
            .blob()
            .then(readerGBK)
            .then(function(d) {
              return safeJsonParse(d, false, copy, req);
            });
        } catch (e) {
          throw new ResponseError(copy, e.message, null, req, 'ParseError');
        }
      } else if (responseType === 'json') {
        return res.text().then(function(d) {
          return safeJsonParse(d, throwErrIfParseFail, copy, req);
        });
      }

      try {
        // ?????????text, blob, arrayBuffer, formData
        return res[responseType]();
      } catch (e) {
        throw new ResponseError(copy, 'responseType not support', null, req, 'ParseError');
      }
    })
    .then(function(body) {
      if (!ctx) return;
      var _ctx$res2 = ctx.res,
        _ctx$req2 = ctx.req,
        req = _ctx$req2 === void 0 ? {} : _ctx$req2;

      var _ref2 = req || {},
        _ref2$options = _ref2.options;

      _ref2$options = _ref2$options === void 0 ? {} : _ref2$options;
      var _ref2$options$getResp = _ref2$options.getResponse,
        getResponse = _ref2$options$getResp === void 0 ? false : _ref2$options$getResp;

      if (!copy) {
        return;
      }

      if (copy.status >= 200 && copy.status < 300) {
        // ?????????response, ?????????????????????
        if (getResponse) {
          ctx.res = {
            data: body,
            response: copy,
          };
          return;
        }

        ctx.res = body;
        return;
      }

      throw new ResponseError(copy, 'http error', body, req, 'HttpError');
    })
    .catch(function(e) {
      if (e instanceof RequestError || e instanceof ResponseError) {
        throw e;
      } // ???????????????????????????

      var req = ctx.req,
        res = ctx.res;
      e.request = e.request || req;
      e.response = e.response || res;
      e.type = e.type || e.name;
      e.data = e.data || undefined;
      throw e;
    });
}

function simplePostMiddleware(ctx, next) {
  if (!ctx) return next();
  var _ctx$req = ctx.req;
  _ctx$req = _ctx$req === void 0 ? {} : _ctx$req;
  var _ctx$req$options = _ctx$req.options,
    options = _ctx$req$options === void 0 ? {} : _ctx$req$options;
  var _options$method = options.method,
    method = _options$method === void 0 ? 'get' : _options$method;

  if (['post', 'put', 'patch', 'delete'].indexOf(method.toLowerCase()) === -1) {
    return next();
  }

  var _options$requestType = options.requestType,
    requestType = _options$requestType === void 0 ? 'json' : _options$requestType,
    data = options.data; // ???????????????axios????????????data, ??????????????????????????????, ??????body stringify??????

  if (data) {
    var dataType = Object.prototype.toString.call(data);

    if (dataType === '[object Object]' || dataType === '[object Array]') {
      if (requestType === 'json') {
        options.headers = objectSpread(
          {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          options.headers,
        );
        options.body = JSON.stringify(data);
      } else if (requestType === 'form') {
        options.headers = objectSpread(
          {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          options.headers,
        );
        options.body = reqStringify(data);
      }
    } else {
      // ?????? requestType ?????????header
      options.headers = objectSpread(
        {
          Accept: 'application/json',
        },
        options.headers,
      );
      options.body = data;
    }
  }

  ctx.req.options = options;
  return next();
}

function paramsSerialize(params, paramsSerializer) {
  var serializedParams;
  var jsonStringifiedParams; // ????????????????????????????????? method ?????????????????????

  if (params) {
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      if (isArray(params)) {
        jsonStringifiedParams = [];
        forEach2ObjArr(params, function(item) {
          if (item === null || typeof item === 'undefined') {
            jsonStringifiedParams.push(item);
          } else {
            jsonStringifiedParams.push(isObject(item) ? JSON.stringify(item) : item);
          }
        }); // a: [1,2,3] => a=1&a=2&a=3

        serializedParams = reqStringify(jsonStringifiedParams);
      } else {
        jsonStringifiedParams = {};
        forEach2ObjArr(params, function(value, key) {
          var jsonStringifiedValue = value;

          if (value === null || typeof value === 'undefined') {
            jsonStringifiedParams[key] = value;
          } else if (isDate(value)) {
            jsonStringifiedValue = value.toISOString();
          } else if (isArray(value)) {
            jsonStringifiedValue = value;
          } else if (isObject(value)) {
            jsonStringifiedValue = JSON.stringify(value);
          }

          jsonStringifiedParams[key] = jsonStringifiedValue;
        });
        var tmp = reqStringify(jsonStringifiedParams);
        serializedParams = tmp;
      }
    }
  }

  return serializedParams;
} // ????????????????????????????????? query ????????? post ??????

function simpleGetMiddleware(ctx, next) {
  if (!ctx) return next();
  var _ctx$req = ctx.req;
  _ctx$req = _ctx$req === void 0 ? {} : _ctx$req;
  var _ctx$req$options = _ctx$req.options,
    options = _ctx$req$options === void 0 ? {} : _ctx$req$options;
  var paramsSerializer = options.paramsSerializer,
    params = options.params;
  var _ctx$req2 = ctx.req;
  _ctx$req2 = _ctx$req2 === void 0 ? {} : _ctx$req2;
  var _ctx$req2$url = _ctx$req2.url,
    url = _ctx$req2$url === void 0 ? '' : _ctx$req2$url; // ??? method ????????????

  options.method = options.method ? options.method.toUpperCase() : 'GET'; // ?????? credentials ???????????? same-origin???????????????????????????????????????????????????????????????????????? cookies ?????????????????????
  // - omit: ????????????cookies.
  // - same-origin: ?????????URL?????????????????????????????? cookies??? HTTP Basic authentication ???????????????.(??????????????????,??????????????????????????????safari 11?????????omit???safari 12?????????)
  // - include: ??????????????????????????????,??????????????????????????????????????? cookies??? HTTP Basic authentication ???????????????.

  options.credentials = options.credentials || 'same-origin'; // ????????????axios ??????????????????, ??????method?????????, ?????????.

  var serializedParams = paramsSerialize(params, paramsSerializer);
  ctx.req.originUrl = url;

  if (serializedParams) {
    var urlSign = url.indexOf('?') !== -1 ? '&' : '?';
    ctx.req.url = ''
      .concat(url)
      .concat(urlSign)
      .concat(serializedParams);
  }

  ctx.req.options = options;
  return next();
}

var globalMiddlewares = [simplePostMiddleware, simpleGetMiddleware, parseResponseMiddleware];
var coreMiddlewares = [fetchMiddleware];
Onion.globalMiddlewares = globalMiddlewares;
Onion.defaultGlobalMiddlewaresLength = globalMiddlewares.length;
Onion.coreMiddlewares = coreMiddlewares;
Onion.defaultCoreMiddlewaresLength = coreMiddlewares.length;

var Core =
  /*#__PURE__*/
  (function() {
    function Core(initOptions) {
      classCallCheck(this, Core);

      this.onion = new Onion([]);
      this.fetchIndex = 0; // ???????????????????????????????????????

      this.mapCache = new MapCache(initOptions);
      this.initOptions = initOptions;
      this.instanceRequestInterceptors = [];
      this.instanceResponseInterceptors = [];
    } // ????????????????????????

    createClass(
      Core,
      [
        {
          key: 'use',
          value: function use(newMiddleware) {
            var opt =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                    global: false,
                    core: false,
                  };
            this.onion.use(newMiddleware, opt);
            return this;
          },
        },
        {
          key: 'extendOptions',
          value: function extendOptions(options) {
            this.initOptions = mergeRequestOptions(this.initOptions, options);
            this.mapCache.extendOptions(options);
          }, // ????????????????????????
        },
        {
          key: 'dealRequestInterceptors',
          value: function dealRequestInterceptors(ctx) {
            var reducer = function reducer(p1, p2) {
              return p1.then(function() {
                var ret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                ctx.req.url = ret.url || ctx.req.url;
                ctx.req.options = ret.options || ctx.req.options;
                return p2(ctx.req.url, ctx.req.options);
              });
            };

            var allInterceptors = [].concat(
              toConsumableArray(Core.requestInterceptors),
              toConsumableArray(this.instanceRequestInterceptors),
            );
            return allInterceptors.reduce(reducer, Promise.resolve()).then(function() {
              var ret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              ctx.req.url = ret.url || ctx.req.url;
              ctx.req.options = ret.options || ctx.req.options;
              return Promise.resolve();
            });
          },
        },
        {
          key: 'request',
          value: function request(url, options) {
            var _this = this;

            var onion = this.onion;
            var obj = {
              req: {
                url: url,
                options: options,
              },
              res: null,
              cache: this.mapCache,
              responseInterceptors: [].concat(
                toConsumableArray(Core.responseInterceptors),
                toConsumableArray(this.instanceResponseInterceptors),
              ),
            };

            if (typeof url !== 'string') {
              throw new Error('url MUST be a string');
            }

            return new Promise(function(resolve, reject) {
              _this
                .dealRequestInterceptors(obj)
                .then(function() {
                  return onion.execute(obj);
                })
                .then(function() {
                  resolve(obj.res);
                })
                .catch(function(error) {
                  var errorHandler = obj.req.options.errorHandler;

                  if (errorHandler) {
                    try {
                      var data = errorHandler(error);
                      resolve(data);
                    } catch (e) {
                      reject(e);
                    }
                  } else {
                    reject(error);
                  }
                });
            });
          },
        },
      ],
      [
        {
          key: 'requestUse',
          // ??????????????? ?????? { global: true } ????????????????????????
          value: function requestUse(handler) {
            var opt =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                    global: true,
                  };
            if (typeof handler !== 'function') throw new TypeError('Interceptor must be function!');

            if (opt.global) {
              Core.requestInterceptors.push(handler);
            } else {
              this.instanceRequestInterceptors.push(handler);
            }
          }, // ??????????????? ?????? { global: true } ????????????????????????
        },
        {
          key: 'responseUse',
          value: function responseUse(handler) {
            var opt =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                    global: true,
                  };
            if (typeof handler !== 'function') throw new TypeError('Interceptor must be function!');

            if (opt.global) {
              Core.responseInterceptors.push(handler);
            } else {
              this.instanceResponseInterceptors.push(handler);
            }
          },
        },
      ],
    );

    return Core;
  })();

Core.requestInterceptors = [addfix];
Core.responseInterceptors = [];

/**
 * ????????? ?????????????????? ?????????????????? Cancel ??????????????????
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return this.message ? 'Cancel: '.concat(this.message) : 'Cancel';
};

Cancel.prototype.__CANCEL__ = true;

/**
 * ?????? CancelToken ?????????????????????
 *
 * @class
 * @param {Function} executor The executor function.
 */

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // ???????????????????????????
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * ????????????????????????????????? Cancel ??????
 */

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * ?????? source ????????? CancelToken ??????????????? CancelToken ?????????
 */

CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel,
  };
};

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

var request = function request() {
  var initOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var coreInstance = new Core(initOptions);

  var umiInstance = function umiInstance(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var mergeOptions = mergeRequestOptions(coreInstance.initOptions, options);
    return coreInstance.request(url, mergeOptions);
  }; // ?????????

  umiInstance.use = coreInstance.use.bind(coreInstance);
  umiInstance.fetchIndex = coreInstance.fetchIndex; // ?????????

  umiInstance.interceptors = {
    request: {
      use: Core.requestUse.bind(coreInstance),
    },
    response: {
      use: Core.responseUse.bind(coreInstance),
    },
  }; // ?????????????????? reguest.get request.post ??????

  var METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
  METHODS.forEach(function(method) {
    umiInstance[method] = function(url, options) {
      return umiInstance(
        url,
        objectSpread({}, options, {
          method: method,
        }),
      );
    };
  });
  umiInstance.Cancel = Cancel;
  umiInstance.CancelToken = CancelToken;
  umiInstance.isCancel = isCancel;
  umiInstance.extendOptions = coreInstance.extendOptions.bind(coreInstance); // ?????????????????????????????????????????????????????????

  umiInstance.middlewares = {
    instance: coreInstance.onion.middlewares,
    defaultInstance: coreInstance.onion.defaultMiddlewares,
    global: Onion.globalMiddlewares,
    core: Onion.coreMiddlewares,
  };
  return umiInstance;
};
/**
 * extend ???????????????ky, ???????????????????????????.
 * initOpions ???????????????
 * @param {number} maxCache ???????????????
 * @param {string} prefix url??????
 * @param {function} errorHandler ????????????????????????
 * @param {object} headers ?????????headers
 */

var extend = function extend(initOptions) {
  return request(initOptions);
};
/**
 * ?????? fetch ????????????????????????????????????
 */

var fetch$1 = request({
  parseResponse: false,
});
var request$1 = request({});

export default request$1;
export { Onion, RequestError, ResponseError, extend, fetch$1 as fetch };
