import { CORE } from '@/services/api';

const Model = {
  namespace: 'matterForm',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    matterId: null,
  },
  effects: {
    *addForm({ payload }, { put }) {
      yield CORE.createMatterFormUsingPOST({ body: payload });
      yield put({
        type: 'fetchList',
        params: { page: 0, size: 10 },
      });
    },

    *fetchList({ params }, { put }) {
      const { matterId } = params;
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield CORE.getMatterFormListUsingGET({ params });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
        matterId,
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
