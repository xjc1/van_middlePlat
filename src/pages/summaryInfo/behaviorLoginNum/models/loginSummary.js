import Apiv1 from '@/services/apiv1';

const { behaviorRoutes } = require('../../../../../config/summaryInfoRoutes');

const Model = {
  namespace: 'behaviorLoginNum',
  state: { message: [], query: {} },
  effects: {
    *fetchData({ payload: { query = {} } }, { put }) {
      const { message = [] } = yield Apiv1.getsummaryInfo({
        params: { method: behaviorRoutes.behaviorLoginNum.method.list, ...query },
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
