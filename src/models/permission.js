import { UM } from '@/services/api';

const Model = {
  namespace: 'permission',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    focusItem: null,
  },
  effects: {

    * fetchPermission({payload}, { put }) {
      const { body: { list, total, pageSize, pageNum } } = yield UM.listPermissionswithPageUsingGET(payload);
      yield put({
        type: 'saveList',
        list, total, pageSize, pageNum
      })
    },

    * addPermission({ payload }, { put }) {
      yield UM.addPermissionUsingPOST(payload);
      yield put({
        type: 'fetchPermission',
      })
    },

    * deletePermission({ id }, { put }) {
      yield UM.deletePermissionUsingDELETE({ id });
      yield put({
        type: 'fetchViewPermission',
      })
    },

    * updatePermissionStatus({ permission }, { put }) {
      yield UM.changeStatusOfPermissionUsingPOST(permission);
      yield put({
        type: 'fetchViewPermission',
      })
    }
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, {
      list, total,
      pageSize,
      pageNum,
    }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    }
  },
};
export default Model;
