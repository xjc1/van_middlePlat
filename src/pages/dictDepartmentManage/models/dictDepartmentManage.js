import { CORE } from '@/services/api';

const Model = {
  namespace: 'dictDepartmentManage',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield CORE.findAllDictAuthUsingGET({
        params: { page, size, ...query },
      });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
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

    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },
  },
};
export default Model;
