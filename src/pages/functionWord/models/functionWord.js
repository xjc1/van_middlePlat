import { WORDS, CORE } from '@/services/api';
import { message } from 'antd';

const Model = {
  namespace: 'functionWord',
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
      } = yield CORE.findAllTagStoreUsingGET({
        params: { page, size, ...query },
      });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
      });
    },
    *updateFunction({ data }, { put }) {
      try {
        yield WORDS.updateTagStoreUsingPOST({ body: data });
        yield put({ type: 'fetchList', payload: {} });
        message.success('编辑成功');
      } catch (e) {
        message.error(`编辑失败，失败原因：${e.msg}`);
      }
    },
    *addFunction({ data }, { put }) {
      try {
        yield CORE.createTagStoreUsingPOST({ body: data });
        yield put({ type: 'fetchList', payload: {} });
        message.success('添加成功');
      } catch (e) {
        message.error(`添加失败，失败原因：${e.msg}`);
      }
    },
    *deleteFunction({ id }, { put }) {
      try {
        yield WORDS.deleteTagStoreUsingPOST(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('删除成功');
      } catch (e) {
        message.error(`删除失败，失败原因：${e.msg}`);
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

    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },
  },
};
export default Model;
