import { DECLAREPROJECT } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'projectManage',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    dictNames: { SH00XZQH: {}, ZCJB0001: {}, SHSSBMSH: {}, DXLX0001: {} },
    focusItem: null,
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
        DECLAREPROJECT.findAllProjectsUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: { page, size },
            body: query,
          }),
        ),
        ['SH00XZQH', 'regions'],
        ['ZCJB0001', 'policyLevel'],
        ['SHSSBMSH', 'department'],
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

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
