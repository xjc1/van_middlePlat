import { CORE, MULTIROUNDSESSIONS } from '@/services/api';
import { message } from 'antd';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import { commonUpDownStatus } from '@/utils/constantEnum';

const Model = {
  namespace: 'dialogManager',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const params = TrackTool.cacheAndGetQuery({
        ...query,
        page,
        size,
      });
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CORE.findAllMultiRoundSessionUsingGET({
          params,
        }),
        ['SH00XZQH', 'regions'],
        ['SHGSBMSH', 'attributionDepartment'],
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

    *changeStatus({ payload: { id, status } }, { put }) {
      if (status === commonUpDownStatus.down) {
        yield MULTIROUNDSESSIONS.publishMultiRoundSessionUsingPOST(id);
        message.success('上架成功');
      } else {
        yield MULTIROUNDSESSIONS.withdrawMultiRoundSessionUsingPOST(id);
        message.success('下架成功');
      }
      yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
    },

    *cloneDialog({ id }, { put }) {
      try {
        yield MULTIROUNDSESSIONS.cloneMultiRoundSessionUsingPOST(id);
        message.success('克隆成功');
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
      } catch (e) {
        message.error(`克隆失败，${e.msg}`);
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

    saveList(state, { list, total, pageSize, pageNum, dictNames = {} }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
