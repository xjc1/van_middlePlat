import { CORE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'policyExplain',
  state: {
    list: [],
    total: 0,
    size: 10,
    pageSize: 10,
    focusItem: null,
    params: {}, // 查询参数
  },
  effects: {
    *fetch({ payload }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(CORE.listPolicyInterpretationsUsingGET({ params: payload }), [
        'SH00XZQH',
        'regions',
      ]);
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
    saveParams(state, { payload }) {
      return { ...state, params: payload };
    },
  },
};
export default Model;
