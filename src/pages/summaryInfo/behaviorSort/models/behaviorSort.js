import Apiv1 from '@/services/apiv1';
import _ from 'lodash';
import { utils } from '@/components/tis_ui';


const { behaviorRoutes } = require('../../../../../config/summaryInfoRoutes');

const { IDGenerator } = utils;

const sortIdGenerator = new IDGenerator('sortID');

const Model = {
  namespace: 'behaviorSort',
  state: { message: [], query: {} },
  effects: {
    *fetchData({ payload: { query = {} } }, { put }) {
      const { message = [] } = yield Apiv1.getsummaryInfo({
        params: { method: behaviorRoutes.behaviorSort.method.list, ...query },
      });
      yield put({
        type: 'saveData',
        message: _.map(message, (item) => ({
          ...item,
          id: sortIdGenerator.next(),
        })),
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
