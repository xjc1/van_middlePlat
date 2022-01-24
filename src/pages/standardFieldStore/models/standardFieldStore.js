import { CORE, STANDARDFIELDS } from '@/services/api';
import _ from 'lodash';
import { message } from 'antd';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'standardFieldStore',
  state: {
    categorys: [],
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    *addField({ payload }, { put }) {
      yield CORE.addStandardFieldUsingPOST({ body: payload });
      message.success('新增成功');
      yield put({
        type: 'fetchFields',
        page: 0,
        size: 10,
        query: {},
      });
    },

    *editField({ payload }, { put }) {
      yield STANDARDFIELDS.updateStandardFieldUsingPOST({ body: payload });
      message.success('编辑成功');
      yield put({
        type: 'fetchFields',
        page: 0,
        size: 10,
        query: {},
      });
    },

    *fetchCategory(params, { put }) {
      const classifications = yield CORE.listStandardFieldClassificationUsingGET({});
      yield put({
        type: 'setCategorys',
        categorys: _.map(classifications, ({ name, fieldNum, id }) => {
          return {
            id,
            name,
            fieldNum,
          };
        }),
      });
    },

    *addCategory({ payload }, { put }) {
      yield CORE.addStandardFieldClassificationUsingPOST({ body: payload });
      yield put({
        type: 'fetchCategory',
      });
    },

    *fetchFields({ page = 0, size = 10, query = {} }, { put }) {
      const data = yield CORE.listStandardFieldUsingGET(
        TrackTool.cacheAndGetQuery({
          params: {
            ...query,
            page,
            size,
          },
        }),
      );
      yield put({
        type: 'saveList',
        data,
      });
    },

    *deleteFieldDetail({ id }, { put }) {
      yield STANDARDFIELDS.deleteStandardFieldUsingPOST(id);
      yield put({
        type: 'fetchFields',
        page: 0,
        size: 10,
        query: {},
      });
      message.success(`删除${id}成功.`);
    },
  },
  reducers: {
    setCategorys(state, { categorys }) {
      return {
        ...state,
        categorys,
      };
    },

    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { data: { content = [], totalElements, size, number } }) {
      return {
        ...state,
        list: content,
        total: totalElements,
        pageSize: size,
        pageNum: number,
      };
    },
  },
};
export default Model;
