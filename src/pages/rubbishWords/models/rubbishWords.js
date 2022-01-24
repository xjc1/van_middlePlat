
import { CORE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'rubbishWords',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
    dictNames: {}
  },
  effects: {
    * fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const { content: list, totalElements: total, size: pageSize, number: pageNum, dictNames } = yield Code2Name( CORE.getBannedWordListUsingGET({
        params: { page, size, ...query },
      }), 
      ['BWT1000', 'typeCode']
      );
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
      })
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
    }
  },
};
export default Model;
  