/* eslint-disable dot-notation */
import { CONVENIENCE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import _ from 'lodash';

function translateDict(list = [], dict) {
  return list
    .map(({ code }) => dict[code])
    .filter(item => item)
    .join(' | ');
}

function joinDictName(list = []) {
  return list.map(({ name, code }) => name || code).join(' | ');
}

const Model = {
  namespace: 'service',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    currentPage: 1,
  },

  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        size: pageSize,
        totalElements: total,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CONVENIENCE.getConvenienceListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params,
            body,
          }),
        ),
        ['DXLX0001', 'objectType'],
        ['FRSJFL1000', 'threeType.code'],
        ['1000', 'threeType.code'],
        ['FWTJ001', 'recommendTag.code'],
        ['TYHY1000', 'currencyTag.code'],
        ['ZYRQ0001', 'occupationTag.code'],
      );
      const threeTypeDictNames = _.reduce(
        [dictNames['FRSJFL1000'], dictNames['1000']],
        (result, item) => {
          Object.entries(item).forEach(it => {
            const [key, val] = it;
            if (key !== val) {
              // eslint-disable-next-line no-param-reassign
              result[key] = val;
            }
          });
          return result;
        },
        {},
      );

      const handledList = list.map(item => ({
        ...item,
        objectType: dictNames['DXLX0001'][item.objectType],
        threeType: translateDict(item.threeType, threeTypeDictNames),
        myServices: joinDictName(item.myServices),
        recommendTag: translateDict(item.recommendTag, dictNames['FWTJ001']),
        currencyTag: translateDict(item.currencyTag, dictNames['TYHY1000']),
        occupationTag: translateDict(item.occupationTag, dictNames['ZYRQ0001']),
      }));

      yield put({
        type: 'saveList',
        list: handledList,
        total,
        pageNum,
        pageSize,
      });
    },
  },

  reducers: {
    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum };
    },
  },
};

export default Model;
