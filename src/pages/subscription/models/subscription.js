import { KERNEL } from '@/services/api';
import { message } from 'antd';

const Model = {
  namespace: 'subscription',
  state: {
    list: [],
    totalPages: 1,
    totalElements: 0,
    size: 10,
    page: 0,
    focusItem: null,
    reviewView: false,
    id: null,
    info: {},
    loading: false,
  },
  effects: {
    *fetchList({ payload }, { put }) {
      yield put({ type: 'changeLoading', payload: true });
      const {
        content,
        totalPages,
        totalElements,
        pageable,
      } = yield KERNEL.findAllSubscribUsingGET({ params: payload });
      yield put({
        type: 'saveList',
        list: content,
        totalPages,
        totalElements,
        size: pageable.pageSize,
        page: pageable.pageNumber,
      });
      yield put({ type: 'changeLoading', payload: false });
    },

    *reviewSubscription({ payload }, { put }) {
      try {
        yield KERNEL.updateSubscribReviewUsingPOST({ body: payload });
        message.success('审核状态修改成功');
      } catch (e) {
        message.error('审核状态修改失败');
      }

      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
        },
      });
      yield put({
        type: 'resetReviewViewView',
        payload: {
          reviewView: false,
          info: {},
          id: null,
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

    resetReviewViewView(state, { payload }) {
      const { reviewView, id, info } = payload;
      return { ...state, reviewView, info, id };
    },

    resetInitial(state) {
      return { ...state, reviewView: false, id: null, info: {} };
    },

    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};
export default Model;
