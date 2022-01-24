import { KERNEL } from '@/services/api';

const Model = {
  namespace: 'menuSetting',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
    menuTree: [],
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield KERNEL.querySpaceMenusUsingGET({
        params: { page, size, ...query },
      });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *fetchMenuTree({ payload }, { put }) {
      const menuTree = yield KERNEL.getSpaceMenuTreeUsingGET();
      yield put({
        type: 'saveMenuTree',
        menuTree,
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

    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },
    saveMenuTree(state, { menuTree }) {
      return { ...state, menuTree };
    },
  },
};
export default Model;
