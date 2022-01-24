import { MESSAGES, CORE } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import { Code2Name } from '@/utils/DictTools';
import { message } from 'antd';
import router from '@/utils/tRouter';

const Model = {
  namespace: 'messageManage',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
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
        MESSAGES.getMessageListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: { page, size },
            body: query,
          }),
        ),
        ['ZDLX', 'clientType'],
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
    *createMessage({ body }, { put }) {
      yield CORE.createMessageUsingPOST({ body });
      router.push('messageManage');
      message.success('消息创建成功');
      yield put({ type: 'fetchList', payload: {} });
    },

    *editMessage({ body }, { put }) {
      yield MESSAGES.updateMessageUsingPOST({ body });
      router.push('messageManage');
      message.success('消息修改成功');
      yield put({ type: 'fetchList', payload: {} });
    },

    *beginMessage({ id }, { put }) {
      yield MESSAGES.publishMessageUsingPOST(id);
      message.success('消息发布成功');
      yield put({ type: 'fetchList', payload: {} });
    },
    *revokeMessage({ id }, { put }) {
      yield MESSAGES.recallMessageUsingPOST(id);
      message.success('消息撤销成功');
      yield put({ type: 'fetchList', payload: {} });
    },
    *stopMessage({ id }, { put }) {
      yield MESSAGES.stopMessageUsingPOST(id);
      message.success('消息停止成功');
      yield put({ type: 'fetchList', payload: {} });
    },
    *deleteMessage({ id }, { put }) {
      yield MESSAGES.deleteMessageUsingPOST(id);
      message.success('消息删除成功');
      yield put({ type: 'fetchList', payload: {} });
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
