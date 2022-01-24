import { MESSAGESTATISTIC } from '@/services/api';

const Model = {
  namespace: 'messageListStatistic',
  state: { listInfo: {} },
  effects: {
    *fetchData({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content,
        totalElements: total,
        number: pageNum,
        size: pageSize,
        ...others
      } = yield MESSAGESTATISTIC.getMessagePictureUsingPOST({
        params: {
          page,
          size,
        },
        body: query,
      });
      yield put({
        type: 'saveData',
        listInfo: {
          content,
          total,
          pageNum,
          pageSize,
          ...others,
        },
      });
    },
  },
  reducers: {
    saveData(state, { listInfo = {} }) {
      return { ...state, listInfo };
    },
  },
};
export default Model;
