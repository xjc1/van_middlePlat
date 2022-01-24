import { NOTIFICATIONS } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import { message } from 'antd';
import router from '@/utils/tRouter';

const Model = {
  namespace: 'warningManage',
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
        NOTIFICATIONS.getNotificationListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: { page, size },
            body: query,
          }),
        ),
        ['ZDLX', 'clientType'],
        ['TXWZ1000', 'style'],
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
    *createWarning({ body }, { put }) {
      yield NOTIFICATIONS.createNotificationUsingPOST({ body });
      message.success('提醒创建成功');
      router.push('warningManage');
      yield put({ type: 'fetchList', payload: {} });
    },

    *editWarning({ body }, { put }) {
      yield NOTIFICATIONS.updateNotificationUsingPOST({ body });
      message.success('提醒修改成功');
      router.push('warningManage');
      yield put({ type: 'fetchList', payload: {} });
    },

    *beginWarning({ id }, { put }) {
      yield NOTIFICATIONS.publishNotificationUsingPOST(id);
      message.success('提醒发布成功');
      yield put({ type: 'fetchList', payload: {} });
    },

    *stopWarning({ id }, { put }) {
      yield NOTIFICATIONS.stopNotificationUsingPOST(id);
      message.success('提醒停止成功');
      yield put({ type: 'fetchList', payload: {} });
    },
    *revokeWarning({ id, status }, { put }) {
      yield NOTIFICATIONS.recallNotificationUsingPOST({ body: { id, status } });
      message.success('提醒撤回成功');
      yield put({ type: 'fetchList', payload: {} });
    },
    *deleteWarning({ id }, { put }) {
      yield NOTIFICATIONS.deleteNotificationUsingPOST(id);
      message.success('提醒删除成功');
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
