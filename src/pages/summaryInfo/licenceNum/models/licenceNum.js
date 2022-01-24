import Apiv1 from '@/services/apiv1';

const { licenceRoutes } = require('../../../../../config/summaryInfoRoutes');

const Model = {
  namespace: 'licenceNum',
  state: { message: null, query: {} },
  effects: {
    *fetchData({ payload: { query = {} } }, { put }) {
      const { message = {} } = yield Apiv1.getsummaryInfo({
        params: { method: licenceRoutes.licence.method.list, ...query },
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
