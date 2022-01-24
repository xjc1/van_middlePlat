import { KERNEL } from '@/services/api';
import { message } from 'antd';

const Model = {
  namespace: 'commonModel',
  state: {
    list: [],
    totalPages: 1,
    totalElements: 0,
    size: 10,
    page: 0,
    focusItem: null,
    view: false,
    addOrEdit: false,
    subscribeView: false,
    modelId: null,
    info: {},
    loading: false,
  },
  effects: {
    *fetchList({ payload }, { put }) {
      const {
        content,
        totalPages,
        totalElements,
        pageable,
      } = yield KERNEL.findAllCommonModelUsingGET({ params: payload });
      yield put({
        type: 'saveList',
        list: content,
        totalPages,
        totalElements,
        size: pageable.pageSize,
        page: pageable.pageNumber,
      });
    },

    *addModel({ payload }, { put }) {
      try {
        yield KERNEL.createCommonModelUsingPOST(payload);
        message.success('添加成功');
      } catch (e) {
        message.error('添加失败');
      }
      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
        },
      });
      yield put({
        type: 'resetVisible',
        payload: {
          view: false,
          addOrEdit: false,
          info: {},
          modelId: null,
        },
      });
    },

    *editModel({ payload }, { put }) {
      try {
        yield KERNEL.updateCommonModelUsingPOST(payload);
        message.success('编辑成功');
      } catch (e) {
        message.error('编辑失败');
      }
      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
        },
      });
      yield put({
        type: 'resetVisible',
        payload: {
          view: false,
          addOrEdit: false,
          info: {},
          modelId: null,
        },
      });
    },

    *addSubscribe({ payload }, { put }) {
      try {
        yield KERNEL.createSubscribeUsingPOST(payload);
        message.success('订阅成功');
      } catch (e) {
        message.error('订阅失败');
      }

      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
        },
      });
      yield put({
        type: 'resetSubscribeView',
        payload: {
          subscribeView: false,
          modelId: null,
        },
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

    saveList(state, { list, totalPages, totalElements, size, page }) {
      return { ...state, list, totalPages, totalElements, size, page, focusItem: null };
    },

    resetVisible(state, { payload }) {
      const { view, addOrEdit, info, modelId } = payload;
      return { ...state, view, addOrEdit, info, modelId };
    },

    resetSubscribeView(state, { payload }) {
      const { subscribeView, modelId } = payload;
      return { ...state, subscribeView, modelId };
    },

    resetInitial(state) {
      return {
        ...state,
        view: false,
        addOrEdit: false,
        subscribeView: false,
        modelId: null,
        info: {},
      };
    },
  },
};
export default Model;
