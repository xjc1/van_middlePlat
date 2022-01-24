import { MODULES } from '@/services/api';
import { message } from 'antd';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'recommendTest',
  state: {
    data: null,
    dictNames: { SH00XZQH: '' },
  },

  effects: {
    *queryResult({ body = {}, params = {} }, { put }) {
      try {
        const { suggest = [], userTags = [] } = yield MODULES.testModuleSuggestUsingPOST({
          body,
          params,
        });
        const { dictNames = {} } = yield Code2Name(Promise.resolve({ content: suggest }), [
          'SH00XZQH',
          'region',
        ]);

        yield put({
          type: 'saveResult',
          data: { suggest, userTags },
          dictNames,
        });
      } catch (e) {
        message.error(`测试失败，失败原因：${e.msg}`);
      }
    },
  },
  reducers: {
    saveResult(state, { data, dictNames }) {
      return { ...state, data, dictNames };
    },
  },
};
export default Model;
