import { KERNEL } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import { utils } from '@/components/tis_ui';
import _ from 'lodash';

const { IDGenerator } = utils;

const tagIDGenerator = new IDGenerator('tag');

const Model = {
  namespace: 'portraitSelf',
  state: {
    list: [],
    query: {},
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
      } = yield KERNEL.getUserTagListUsingGET(
        TrackTool.cacheAndGetQuery({
          params: { ...query, page, size },
        }),
      );
      yield put({
        type: 'saveList',
        list: _.map(list, item => ({
          ...item,
          tagId: tagIDGenerator.next(),
        })),
        total,
        pageSize,
        pageNum,
        query,
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

    saveList(state, { list, total, pageSize, pageNum, query }) {
      return { ...state, list, total, pageSize, pageNum, query, focusItem: null };
    },
    clearList() {
      return { list: [], query: {}, total: 0, pageSize: 10, currentPage: 1, focusItem: null };
    },
  },
};
export default Model;
