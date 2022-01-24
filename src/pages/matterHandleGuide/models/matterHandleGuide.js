import { CORE } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'matterHandleGuide',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
    dictNames: {},
    condition: {},
  },
  effects: {
    *fetchList({ payload: { page, size, query = {} } }, { put }) {
      const { status } = query;
      const { params } = TrackTool.cacheAndGetQuery({
        params: { ...query, page, size },
      });
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CORE.listMatterHandleGuidesUsingGET({
          params: { ...params, status: status === -1 ? undefined : status },
        }),
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
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
