import { CORE } from '@/services/api';

const Model = {
  namespace: 'matterSync',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
  },
  effects: {
    *fetchList({ params }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield CORE.listDataSyncRecordUsingGET({ params });
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
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },
  },
};
export default Model;
