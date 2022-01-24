import { KERNEL } from '@/services/api';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'portraitTags',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    query: {},
  },
  effects: {
    *fetchList({ params, body }, { put, select }) {
      const { query } = yield select(_ => _.portraitTags);
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield KERNEL.getPortraitTagPageListUsingPOST(
        TrackTool.cacheAndGetQuery({
          params,
          body: { ...body, ...query },
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
      return { ...state, list, total, pageSize, pageNum };
    },
    setQuery(state, { query }) {
      return { ...state, query };
    },
  },
};
export default Model;
