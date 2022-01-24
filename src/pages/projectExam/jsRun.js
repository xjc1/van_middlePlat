import _ from 'lodash';

/*

function run(params, ...others) {
  try {
    const fn = new Function(...params);
    const result = fn(...others);

    if (_.isNaN(result)) {
      return '无返回数据';
    }
    if (_.isObject(result)) {
      return JSON.stringify(result);
    }
    return String(result);
  } catch (e) {
    return e.toString();
  }
}
*/

function run(params, ...others) {
  try {
    const fn = new Function(...params);
    const result = fn(...others);

    if (_.isNaN(result)) {
      return '无返回数据';
    }
    if (_.isObject(result)) {
      return {
        data: result,
        str: JSON.stringify(result),
      };
    }
    return { data: result, str: String(result) };
  } catch (e) {
    return e.toString();
  }
}

export default run;
