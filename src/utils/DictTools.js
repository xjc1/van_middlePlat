import _ from 'lodash';
import { DICT } from '@/services/api';

function digValue([name, ...others], item, set) {
  if (_.isNil(item)) {
    return;
  }
  if (_.isArray(item[name]) && others.length !== 0) {
    // 处理 [{code:'x'},{code:'y'}]的情况
    _.forEach(item[name], sub => {
      digValue(others, sub, set);
    });
  } else if (_.isArray(item[name]) && others.length === 0) {
    //  处理 ['x','y', 'z']的情况
    _.forEach(item[name], it => {
      // eslint-disable-next-line no-unused-expressions
      _.isString(it) && set.add(it);
    });
  } else if (others.length === 0) {
    // eslint-disable-next-line no-unused-expressions
    _.isString(item[name]) && set.add(item[name]);
  } else {
    digValue(others, item[name], set);
  }
}

function Code2Name(fetchList, ...codePath) {
  return new Promise(resolve => {
    fetchList.then((data = []) => {
      const cleanData = _.isArray(data) ? { content: data } : data;
      const { content = [], ...others } = cleanData;
      const payload = _.map(codePath, ([root, name]) => {
        const names = _.split(name, '.');
        const paramsSet = _.reduce(
          content,
          (result, item) => {
            digValue(names, item, result);
            return result;
          },
          new Set(),
        );

        return {
          rootCode: root,
          childCodes: Array.from(paramsSet),
        };
      });
      DICT.batchTranslateDictByCodesUsingPOST({
        body: {
          translateItems: payload,
        },
      }).then(res => {
        resolve({
          content,
          dictNames: res,
          ...others,
        });
      });
    });
  });
}

function Id2Name(fetchList, ...idPathArray) {
  return new Promise(resolve => {
    fetchList.then(({ content = [], ...others }) => {
      const payload = _.map(idPathArray, name => {
        const names = _.split(name, '.');
        const paramsSet = _.reduce(
          content,
          (result, item) => {
            digValue(names, item, result);
            return result;
          },
          new Set(),
        );

        return Array.from(paramsSet);
      });
      DICT.batchTranslateDictByIdsUsingPOST({
        body: _.intersection(...payload),
      }).then(res => {
        resolve({
          content,
          dictNames: res,
          ...others,
        });
      });
    });
  });
}

export { Code2Name, Id2Name };
