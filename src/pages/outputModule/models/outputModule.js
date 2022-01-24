import { CORE, TAGOUTPUTS } from '@/services/api';
import { message } from 'antd';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'outputModule',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield CORE.getTagOutputsUsingGET(
        TrackTool.cacheAndGetQuery({
          params: { ...query, page, size },
        }),
      );
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
      });
    },

    *detail({ id }, { put }) {
      const item = yield TAGOUTPUTS.getTagOutputUsingGET(id);
      yield put({ type: 'selectedItem', item });
    },

    *addOutputModule({ body }) {
      yield CORE.addTagOutputUsingPOST({ body });
      message.success('新增输出模块成功');
    },

    *editOutputModule({ body }) {
      yield TAGOUTPUTS.updateTagOutputUsingPOST({ body });
      message.success('编辑输出模块成功');
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
