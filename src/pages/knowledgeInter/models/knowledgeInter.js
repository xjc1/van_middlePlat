
import { CORE } from '@/services/api';

const Model = {
  namespace: 'knowledgeInter',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    query: {},
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    * fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const { content: list, totalElements: total, size: pageSize, number: pageNum } = yield CORE.listKnowledgeStoreInterfaceUsingGET({
        params: { page, size, ...query },
        // body: query
      });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        query,
      })
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, pageSize, pageNum, query }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, query };
    }
  },
};
export default Model;
  