import Apiv1 from '@/services/apiv1';

const { oneformRoutes } = require('../../../../../config/summaryInfoRoutes');

const Model = {
  namespace: 'oneformNum',
  state: { message: {}, query: {} },
  effects: {
    *fetchData({ payload: { query = {} } }, { put }) {
      const { message = {} } = yield Apiv1.getsummaryInfo({
        params: { method: oneformRoutes.oneform.method.list, ...query },
      });
      yield put({
        type: 'saveData',
        message,
        query,
      });
    },
  },
  reducers: {
    saveData(state, { message, query }) {
      return { ...state, message, query };
    },
  },
};
export default Model;
