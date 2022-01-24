import { KERNEL } from '../services/api';

const Model = {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    focusItem: null,
    query: {},
  },
  effects: {
    *fetchList({ payload }, { put, select }) {
      const departmentId = yield select(({ users }) => users.focusDepartmentId);
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield KERNEL.listUserUsingGET({ params: { departmentId, ...payload } });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        query: {},
      });
    },

    *fetchAndFilterList({ payload: { query, page, size } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number,
      } = yield KERNEL.listUserUsingGET({ params: { ...query, page, size } });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum: number,
        query,
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

    saveList(state, { list, total, pageSize, pageNum, query }) {
      return { ...state, list, total, pageSize, pageNum, query, focusItem: null };
    },
  },
};
export default Model;
