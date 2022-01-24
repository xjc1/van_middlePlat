import { THEME } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'themeAudit',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 1,
    focusItem: null,
    dictNames: { SH00XZQH: {} },
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        THEME.getReviewThemeListUsingPOST({
          params: { page, size },
          body: query,
        }),
        ['SH00XZQH', 'regions'],
      );
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
      return { ...state, list, total, pageSize, pageNum, dictNames, focusItem: null };
    },
  },
};
export default Model;
