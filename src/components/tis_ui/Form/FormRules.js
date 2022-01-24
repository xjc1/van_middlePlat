import _ from 'lodash';

export default {
  codeAndNum(message = '只能由数字和英文字符组成') {
    return {
      pattern: /^[A-Za-z0-9]+$/,
      message,
    };
  },

  pwd(message = '必须包含大小写字母和数字,长度8-16位') {
    return {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
      message,
    };
  },

  idNum(message = '身份证号码不符合规范') {
    return {
      pattern:
      // 支持一代/二代 15/18位数字
        /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
      message,
    };
  },
  url(message = 'url不符合规范') {
    return {
      pattern: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
      message,
    };
  },
  phone(message = '手机号不符合规范!') {
    return {
      pattern:
        '^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$',
      message,
    };
  },

  required(message = '必填事项!') {
    return {
      required: true,
      message,
    };
  },

  email(message = 'email不符合规范!') {
    return {
      type: 'email',
      message,
    };
  },

  json(message = '不满足json格式') {
    return {
      validator(notUse, value) {
        try {
          JSON.parse(value);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(new Error(message));
        }
      },
    };
  },

  isExist(strings = [], message = '此数已经存在') {
    return {
      validator(notUse, value) {
        if (_.includes(strings, value)) {
          return Promise.reject(new Error(message));
        }
        return Promise.resolve();
      },
    };
  }
};
