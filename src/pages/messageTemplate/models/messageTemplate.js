import { MESSAGEMODULES } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'messageTemplate',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      TrackTool.cacheAndGetQuery({
        params: { ...query, page, size },
      });
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        MESSAGEMODULES.getMessageModuleListUsingPOST({
          params: { page, size },
          body: query,
        }),
        ['DXLX0001', 'objectType'],
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

    saveList(state, { list, total, pageSize, pageNum, dictNames = {} }) {
      console.log('-> list', list);
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
