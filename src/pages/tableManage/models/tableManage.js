import { PORTRAIT } from '@/services/api';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'tableManage',
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
      } = yield PORTRAIT.getTableListUsingGET(
        TrackTool.cacheAndGetQuery({
          params: { ...query, page, size },
        }),
      );
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
