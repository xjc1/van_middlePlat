import { KERNEL } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import { message } from 'antd';
import ArrayTools from '@/utils/ArrayTools';

const Model = {
  namespace: 'hotQuestion',
  state: {
    list: [],
    dictList: [],
  },
  effects: {
    *fetchList({ payload: { type = 0, attributionDepartment } }, { put }) {
      try {
        const data = yield KERNEL.getHotEventListUsingGET({
          params: { type, attributionDepartment },
        });
        const { dictNames } = yield Code2Name(
          Promise.resolve({ content: data }),
          ['SH00XZQH', 'regions'],
          ['DXLX0001', 'objectType'],
        );
        yield put({
          type: 'saveList',
          list: data,
          dictNames,
        });
      } catch (e) {
        message.error('获取列表失败');
        yield put({ type: 'saveList', list: [], dictNames: { SH00XZQH: {} } });
      }
    },

    *saveHotEvent({ payload: { req_body = {}, type, attributionDepartment } }, { put }) {
      try {
        yield KERNEL.saveHotEventsUsingPOST({ body: req_body });
        message.success('添加成功');
        yield put({
          type: 'fetchList',
          payload: { type, attributionDepartment },
        });
      } catch (e) {
        message.error('添加失败');
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

    saveList(state, { list = [], dictNames }) {
      return { ...state, list, focusItem: null, dictNames };
    },

    addHot(state, { payload }) {
      const newData = _.unionBy(payload, 'elemId');
      if (newData.length !== payload.length) {
        message.info('此次添加数据有在列表已经存在的，已经做去重处理');
      }
      return { ...state, list: [...newData] };
    },

    saveDict(state, { list }) {
      const dictList = _.reduce(
        list,
        (result, obj) => {
          result[obj['code']] = obj['name'];
          return result;
        },
        {},
      );
      return { ...state, dictList };
    },

    upGo(state, { payload }) {
      const { list } = state;
      const newData = list;
      const index = _.findIndex(newData, payload);
      ArrayTools.upGo(list, index);
      const finalData = newData.map((item, index) => {
        item.order = index;
        return item;
      });
      return { ...state, list: [...finalData] };
    },

    downGo(state, { payload }) {
      const { list } = state;
      const newData = list;
      const index = _.findIndex(newData, payload);
      ArrayTools.downGo(list, index);
      return { ...state, list: [...newData] };
    },
  },
};
export default Model;
