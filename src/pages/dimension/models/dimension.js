
import { DIMENSION } from '@/services/api';

const Model = {
  namespace: 'dimension',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    * fetchList({ payload, condition }, { put }) {
      const {  content: list,
        size: pageSize,
        totalElements: total,
        number: page, } = yield DIMENSION.getDimensionListUsingPOST({body: condition, params: payload});
        yield put({
          type: 'saveList',
          payload: {
            list,
            total,
            page,
            pageSize,
            condition,
          },
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

    saveList(state, { payload }) {
      return { ...state, focusItem: null, ...payload };
    },
  },
};
export default Model;
  