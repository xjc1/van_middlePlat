import { NOTIFY } from '@/services/api';
import { message } from 'antd';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'message',
  state: {
    list: [],
    focusItem: null,
    pageNum: 0,
    pageSize: 10,
    total: 0,
    params: {},
    page: 0,
    size: 10,
    dictNames: { XXLX1000: {} },
  },
  effects: {
    *fetchList({ payload = { page: 0, size: 10 }, data }, { put }) {
      const req_body = { params: payload, body: data };
      const {
        content,
        size,
        totalElements,
        number,
        dictNames,
      } = yield Code2Name(NOTIFY.getMessageListUsingPOST(TrackTool.cacheAndGetQuery(req_body)), [
        'XXLX1000',
        'messageType',
      ]);
      yield put({
        type: 'saveList',
        list: content,
        total: totalElements,
        pageSize: size,
        pageNum: number,
        dictNames,
      });
    },

    *detail({ payload }, { put }) {
      try {
        const data = yield NOTIFY.getOneMsgDetailUsingGET(payload);
        yield put({ type: 'selectedItem', item: data });
      } catch (e) {
        message.error('获取消息详情失败');
      }
    },

    *delete({ payload }) {
      try {
        yield NOTIFY.deleteMessageUsingPOST(payload);
        message.success('删除消息成功');
      } catch (e) {
        message.error('删除消息失败');
      }
    },

    *publish({ payload }) {
      try {
        yield NOTIFY.publishMessageUsingPOST(payload);
        message.success('上架消息成功');
      } catch (e) {
        message.error('上架消息失败');
      }
    },

    *down({ payload }) {
      try {
        yield NOTIFY.withdrawMessageUsingPOST(payload);
        message.success('下架消息成功');
      } catch (e) {
        message.error('下架消息失败');
      }
    },

    *submitStepForm({ payload }, { put }) {
      if (payload.id) {
        try {
          yield NOTIFY.updateMessageUsingPOST(payload.id, { body: payload });
          message.success('修改消息成功');
          yield put({ type: 'fetchList' });
        } catch (e) {
          message.error('修改消息失败');
        }
      } else {
        try {
          yield NOTIFY.addNewMessageUsingPOST({ body: payload });
          message.success('添加消息成功');
          yield put({ type: 'fetchList' });
        } catch (e) {
          message.error('添加消息失败');
        }
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

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, page: pageNum, size: pageSize, focusItem: null, dictNames };
    },

    savePage(state, { payload }) {
      return { ...state, size: payload.size, page: payload.page };
    },

    saveParams(state, { payload }) {
      return { ...state, params: payload };
    },

    reset(state) {
      return { ...state, size: 10, page: 0, params: {} };
    },
  },
};
export default Model;
