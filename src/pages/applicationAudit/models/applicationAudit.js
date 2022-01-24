import { KERNEL } from '@/services/api';

const Model = {
  namespace: 'applicationAudit',
  state: {
    list: [],
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    pageNumber: 0,
  },
  effects: {
    *fetchList({ payload }, { put }) {
      const {
        content,
        totalPages,
        totalElements,
        pageable,
      } = yield KERNEL.findAllApplicationUsingGET({ params: payload });

      yield put({
        type: 'saveList',
        list: content,
        totalPages,
        totalElements,
        pageSize: pageable.pageSize,
        pageNumber: pageable.pageNumber,
      });
    },
  },
  reducers: {
    saveList(state, { list, totalPages, totalElements, pageSize, pageNumber }) {
      return { ...state, list, totalPages, totalElements, pageSize, pageNumber };
    },
  },
};
export default Model;
