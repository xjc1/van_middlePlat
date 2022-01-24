import { UNION, DICT } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import _ from 'lodash';
import { Id2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'oneMatter',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    dictNames: { },
  },
  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Id2Name(
        UNION.getUnionProcessListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params,
            body,
          }),
        ),
         'category.id'
      );

      // 翻译行政区划
      const translateRegions = yield DICT.translateDictByCodesUsingPOST({
        body: {
          rootCode: 'SH00XZQH',
          childCodes: _.flatMapDeep(list.map(({ regions = '' }) => regions.split(','))),
        },
      });

      const handledList = list.map(item => {
        const { regions = '' } = item;
        return {
          ...item,
          regions: regions.split(',').map(code => translateRegions[code]),
        }
      });

      yield put({
        type: 'saveList',
        list: handledList,
        total,
        dictNames,
        pageSize,
        pageNum,
      });
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, dictNames };
    },
  },
};
export default Model;
