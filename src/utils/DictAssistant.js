import _ from 'lodash';
import React from 'react';
import Apiv1 from '../services/apiv1';
import { POLICYWORDS, DICT } from '@/services/api';
import CodeInfo from '../components/bussinessComponents/Dict/DictLabel';

class DictAssistant {
  constructor() {
    console.info('init DictAssistant');
  }

  handleCharacterEscape(value) {
    if (value) {
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    return '';
  }

  fetchChildrenDictNoMemo = code =>
    new Promise((resolve, reject) => {
      Apiv1.getChildDictionary(code, resolve, reject);
    });

  fetchChildrenDictWithMemo = _.memoize(
    code =>
      new Promise((resolve, reject) => {
        Apiv1.getChildDictionary(code, resolve, reject);
      }),
  );

  fetchTreeDictWithMemo = _.memoize(
    code =>
      new Promise((resolve, reject) => {
        Apiv1.getTreeDictionary(code, resolve, reject);
      }),
  );

  item2treeNode = (roots, group) => {
    return _.map(roots, ({ code, name }) => ({
      value: code,
      title: name,
      icon: <CodeInfo code={code} />,
      children: group[code] && this.item2treeNode(group[code], group),
    }));
  };

  fetchTreeDictWithFormat = dict => {
    return new Promise((resolve, reject) => {
      this.fetchTreeDictWithMemo(dict)
        .then(data => {
          const groups = _.groupBy(data, 'parentcode');
          let result = [];
          // 多个字典
          if (_.isArray(dict)) {
            dict.forEach(ditCode => {
              const dictRootItem = _.find(data, { code: ditCode });
              if (dictRootItem) {
                result.push({
                  value: ditCode,
                  label: dictRootItem.name + 11,
                  suffixIcon: <CodeInfo code={ditCode} />,
                  children: this.item2treeNode(groups[ditCode], groups, {}),
                });
              }
            });
          } else {
            result = this.item2treeNode(groups[dict], groups, {});
          }
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  fetchDictsWithMemo = _.memoize(
    code =>
      new Promise((resolve, reject) => {
        Apiv1.getDictsionary(code, resolve, reject);
      }),
  );

  fetchDictByIdWithMemo = _.memoize(
    id =>
      new Promise((resolve, reject) => {
        Apiv1.getDictionaryUseId(id, resolve, reject);
      }),
  );

  queryPolicyWordsWithMemo = _.memoize(
    value =>
      new Promise((resolve, reject) => {
        POLICYWORDS.getPolicyWordsListForLinkedUsingGET({
          params: { name: value, size: 200 },
        }).then(rows => {
          resolve(_.map(rows, ({ id, name }) => ({ key: id, label: name })));
        });
      }),
  );

  getPolicyWordWithMemo = _.memoize(
    code =>
      new Promise((resolve, reject) => {
        Apiv1.getPolicyWords({
          condition: { _id: code },
          projection: { name: 1, _id: 1 },
        }).then(({ body: { rows } }) => {
          resolve(_.map(rows, ({ _id, name }) => ({ key: _id, label: name })));
        });
      }),
  );

  fetchDictsWithMemo(...codes) {
    return Promise.all(_.map(codes, code => this.fetchChildrenDictWithMemo(code)))
      .then(datas => {
        return _.reduce(
          codes,
          (result, key, index) => {
            result[key] = datas[index];
            return result;
          },
          {},
        );
      })
      .catch(err => {
        console.info(err);
      });
  }

  // 中台树形字典格式化
  dictTreeFormat = dictData => {
    const nextDictData = _.isArray(dictData) ? dictData : [dictData];
    return nextDictData.map(item => {
      const { name, code, childrens = [], ...others } = item;
      return {
        title: name,
        value: code,
        children: this.dictTreeFormat(childrens),
        ...others,
      };
    });
  };

  subTree = (fn, arrName = 'children') => {
    return function(...params) {
      return fn(...params).then(nextData => {
        const [firstData = {}] = nextData;
        const { [arrName]: children = [] } = firstData;
        return children;
      });
    };
  };

  // 获取字典用中台给的字典接口获取当前层级及子层级并且格式化数据
  fetchDictsTreeByMidGround = (dictCode, rootCode) => {
    return new Promise((resolve, reject) => {
      DICT.findTreeByCodeUsingGET({ params: { code: dictCode, rootCode } })
        .then((data = {}) => {
          // 没有数据返回空值
          if (JSON.stringify(data) === '{}') {
            resolve([]);
          } else {
            const nextData = this.dictTreeFormat(data);
            resolve(nextData);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  fetchDictsTreeByMidGroundWithMemo = _.memoize(rootCodeAndDictCode => {
    const [rootCode, dictCode] = _.split(rootCodeAndDictCode, ',');
    return this.fetchDictsTreeByMidGround(rootCode, dictCode);
  });
}

export default new DictAssistant();
