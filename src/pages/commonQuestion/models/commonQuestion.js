
import { CORE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'commonQuestion',
  state: {
    list: [],
    questions: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
    dictNames: {},
  },
  effects: {
    * fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const { content: list, totalElements: total, size: pageSize, number: pageNum, dictNames = {} } = yield Code2Name(CORE.findAllCommonQuestionUsingGET({
        params: { page, size, ...query },
      }),
      ['SHGSBMSH', 'attributionDepartment']
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
    },
    

    saveQuestion(state,{payload}){
      return {...state, questions:[...payload]}
    },

  },
};
export default Model;
  