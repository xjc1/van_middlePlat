import { KERNEL } from '@/services/api';

const Model = {
  namespace: 'auditChain',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
  },
  effects: {
    *fetchList({ params = {}, body = {} }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield KERNEL.getChainListUsingPOST({
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
