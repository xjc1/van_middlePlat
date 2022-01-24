/* eslint-disable */
import { KERNEL } from '@/services/api';
import { message } from 'antd';
import TrackTool from '@/utils/TrackTool';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'synonyms',
  state: {
    list: [], // 问答列表
    total: 0,
    size: 10,
    pageNum: 0,
    focusItem: null,
    params: {}, // 查询参数
    dictNames: {},
  },
  effects: {
    *fetch({ payload = { size: 10, page: 0 }, data = {} }, { put }) {
      try {
        const req_body = { params: payload, body: data };
        const {
          content,
          size,
          totalElements,
          number,
          dictNames,
        } = yield Code2Name(KERNEL.findAllSynonymUsingPOST(TrackTool.cacheAndGetQuery(req_body)), [
          'SHGSBMSH',
          'attributionDepartment',
        ]);
        yield put({
          type: 'saveList',
          list: content,
          total: totalElements,
          size,
          pageNum: number,
          dictNames,
        });
      } catch (e) {
        message.error('获取列表失败');
      }
    },

    *status({ payload }) {
      try {
        yield KERNEL.updateSynonymStatusUsingPOST({ body: payload });
        message.success('修改上下架状态成功');
      } catch (e) {
        message.error('修改上下架状态失败');
      }
    },

    *detail({ payload }, { put }) {
      const resp = yield KERNEL.findSynonymDetailUsingGET(payload.id);
      yield put({ type: 'selectedItem', item: resp });
      return resp;
    },

    *delete({ payload }) {
      try {
        yield KERNEL.deleteSynonymUsingPOST(payload.id);
        message.success('删除问答成功');
      } catch (e) {
        message.error('删除问答失败');
      }
    },
  },

  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: { ...item } };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, size, pageNum, dictNames }) {
      return { ...state, list, total, size, pageNum, focusItem: null, loading: false, dictNames };
    },

    saveParams(state, { payload }) {
      return { ...state, params: payload };
    },

    savePage(state, { payload }) {
      return { ...state, page: payload.page, size: payload.size };
    },

    reset(state) {
      return { ...state, size: 10, page: 0, params: {} };
    },
  },
};
export default Model;
