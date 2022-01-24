import { notification } from 'antd';
import { KERNEL } from '@/services/api';
import { policyUpDownStatus } from '@/utils/constantEnum';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message || null,
    description: description || null,
  });
};

const Model = {
  namespace: 'appRegister',
  state: {
    list: [],
    info: null,
    state: null,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    pageNumber: 0,
    focusItem: null,
    view: false,
    addOrEdit: 0,
    readOnly: false,
    image:
      'data:image/png;base64,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',
  },
  effects: {
    *fetchList({ payload }, { put }) {
      const {
        content,
        pageable,
        totalPages,
        totalElements,
      } = yield KERNEL.findAllApplicationUsingGET(payload);
      yield put({
        type: 'saveList',
        list: content,
        totalPages,
        totalElements,
        pageSize: pageable.pageSize,
        pageNumber: pageable.pageNumber,
      });
    },

    *addApplication({ payload }, { put }) {
      yield KERNEL.createApplicationUsingPOST({ body: payload });

      openNotificationWithIcon('success', '成功新增应用');

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
          addOrEdit: 0,
          info: null,
        },
      });
    },

    *updateApplication({ payload }, { put }) {
      yield KERNEL.updateApplicationUsingPOST({ body: payload });

      openNotificationWithIcon('success', '成功修改应用信息');

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
          addOrEdit: 0,
          info: null,
        },
      });
    },

    *updateApplicationStatus({ payload }, { put }) {
      yield KERNEL.updateApplicationStatusUsingPOST({ body: payload });

      openNotificationWithIcon('success', `成功${policyUpDownStatus.$v_names[payload.status]}应用`);

      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
        },
      });
    },

    *deleteApplication({ payload }, { put }) {
      const { id } = payload;
      yield KERNEL.deleteApplicationUsingPOST(id);

      openNotificationWithIcon('success', '成功删除应用');

      yield put({
        type: 'fetchList',
        payload: {
          page: 0,
          size: 10,
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

    saveList(state, { list, totalPages, totalElements, pageSize, pageNumber }) {
      return { ...state, list, totalPages, totalElements, pageSize, pageNumber, focusItem: null };
    },

    resetVisible(state, { payload }) {
      const { view, addOrEdit, ...other } = payload;
      return { ...state, view, addOrEdit, ...other };
    },
  },
};
export default Model;
