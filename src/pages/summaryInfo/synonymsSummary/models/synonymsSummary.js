import Apiv1 from '@/services/apiv1';

const { synonymsRoutes } = require('../../../../../config/summaryInfoRoutes');

const Model = {
  namespace: 'synonymsSummary',
  state: {
    message: {},
    query: { userType: 'all' },
  },
  effects: {
    *fetchList({ payload: { query = {} } }, { put }) {
      const { message = {} } = yield Apiv1.getsummaryInfo({
        params: { method: synonymsRoutes.synonyms.method.list, ...query },
      });
      yield put({
        type: 'saveList',
        message,
        query,
      });
    },
  },
  reducers: {
    saveList(state, { message = {}, query = {} }) {
      return { ...state, message, query };
    },
  },
};
export default Model;
