import { KERNEL } from '../services/api';
import { message } from 'antd';

const Model = {
  namespace: 'department',
  state: {
    list: [],
    flatDeparts: {},
    focusItem: null,
  },
  effects: {
    *fetchAll(_, { put }) {
      const list = yield KERNEL.listDepartmentsUsingGET({});
      yield put({
        type: 'saveList',
        body: list,
      });
    },

    *fetchList({ payload }, { put }) {
      const list = yield KERNEL.listDepartmentsUsingGET({ params: payload });
      yield put({
        type: 'saveList',
        body: list,
      });
    },

    *addDepartment({ payload }, { put }) {
      try {
        yield KERNEL.addDepartmentUsingPOST({
          body: {
            department: {
              ...payload,
              status: 1,
            },
          },
        });
        message.success('新增部门成功');
        yield put({
          type: 'fetchList',
        });
      } catch (e) {
        message.error('新增部门失败');
      }
    },

    *editDepartment({ payload }, { put }) {
      try {
        yield KERNEL.editDepartmentUsingPOST({ body: payload });
        yield put({
          type: 'fetchList',
        });
        message.success('编辑部门成功');
      } catch (e) {
        message.error('编辑部门失败');
      }
    },

    *deleteDepartment({ payload }, { put }) {
      try {
        yield KERNEL.deleteUsingPOST(payload);
        message.success('删除部门成功');
        yield put({
          type: 'fetchList',
        });
      } catch (e) {
        message.error('删除部门失败');
      }
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { body }) {
      const flatDeparts = {};
      body.forEach(item => {
        flatDeparts[item.departNum] = item.departmentName;
      });
      return { ...state, list: body, flatDeparts, focusItem: null };
    },
  },
};
export default Model;
