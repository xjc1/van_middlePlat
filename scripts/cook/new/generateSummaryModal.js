const summaryInfoType = {
  list: '列表',
  total: '总览',
};

function initDataByType(type) {
  let initdata = {};
  switch (type) {
    case summaryInfoType.list: {
      initdata = { message: [], query: {} };
      break;
    }
    case summaryInfoType.total: {
      initdata = { message: {}, query: {} };
      break;
    }
    default:
      break;
  }
  return JSON.stringify(initdata);
}

function generateModel(name, upperFirstName, type) {
  const initState = initDataByType(type);
  return `
import Apiv1 from '@/services/apiv1';
import { summaryInfoMethod } from '@/constants';
  
  const Model = {
    namespace: '${name}',
    state: ${initState},
    effects: {
      * fetchData({ payload: { query = {} } }, { put }) {
        const {  message } = yield Apiv1.getsummaryInfo({
            params: { method: summaryInfoMethod.getSynonymsSummary, ...query },
          });
        yield put({
          type: 'saveData',
          message,
          query,
        })
      },
    },
    reducers: {  
      saveData(state, { message, query }) {
        return { ...state, message, query };
      }
    },
  };
  export default Model;
    `;
}

module.exports = generateModel;
