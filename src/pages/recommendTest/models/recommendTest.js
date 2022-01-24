
import { ONEFORM } from '@/services/api';
import {message} from 'antd'

const Model = {
  namespace: 'recommendTest',
  state: {
   data:null,
  },

  effects: {
    * queryResult({ body = {}, params={} }, { put }) {
      try{
        const resp = yield ONEFORM.qaDebugSuggestUsingPOST({body,params});
        yield put({
          type: 'saveResult',
          data: resp
        });
      }catch (e){
        message.error('测试失败，失败原因：' + e.msg)
      }

    }
  },
  reducers: {
    saveResult(state, { data }) {
      return { ...state, data };
    }
  },
};
export default Model;
