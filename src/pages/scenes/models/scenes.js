/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import { SCENE, MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import _ from 'lodash';

const Model = {
  namespace: 'scenes',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    currentPage: 1,
    focusItem: null,
    dictNames: [],
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
        SCENE.getSceneListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params,
            body,
          }),
        ),
        ['SH00XZQH', 'regions'],
        ['FRSJFL1000', 'type.code'],
        ['1000', 'type.code'],
        ['ZTLX', 'sceneType'],
      );

      // 考虑三级分类为多根的情况
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
        threeType: item.type
          .reduce((pre, { code }) => {
            return pre + threeTypeDictNames[code] + '/';
          }, '')
          .slice(0, -1),
        region: dictNames.SH00XZQH[item.regions],
        sceneType_cn: dictNames.ZTLX[item.sceneType],
      }));

      yield put({
        type: 'saveList',
        list: handledList,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
    },

    *fetchMatterList({ params = {}, body = {} }, { put }) {
      const res = yield Code2Name(MATTER.listMatterUsingPOST({ params, body }), [
        'SH00XZQH',
        'regions',
      ]);
      yield put({
        type: 'saveMatterList',
        matterList: res.content,
        dictNames: res.dictNames,
      });
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, dictNames, focusItem: null };
    },
  },
};
export default Model;
