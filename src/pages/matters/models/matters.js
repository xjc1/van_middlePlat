import { MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'matters',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    dictNames: { SH00XZQH: {} },
  },
  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        MATTER.listMatterUsingPOST(
          TrackTool.cacheAndGetQuery({
            params,
            body,
          }),
        ),
        ['SH00XZQH', 'regions'],
      );
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
    },
  },

  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, dictNames, focusItem: null };
    },
  },
};
export default Model;
