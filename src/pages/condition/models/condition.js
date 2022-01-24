import { CONDITION } from '@/services/api';

const Model = {
  namespace: 'condition',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield CONDITION.findAllConditionUsingPOST({
        params,
        body,
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
    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum };
    },
  },
};
export default Model;
