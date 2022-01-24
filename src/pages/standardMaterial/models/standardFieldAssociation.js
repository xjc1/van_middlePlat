import { CORE } from '@/services/api';
import _ from 'lodash';

const Model = {
  namespace: 'standardFieldAssociation',
  state: {
    categories: [],
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
  effects: {
    *fetchCategory(params, { put }) {
      const classifications = yield CORE.listStandardFieldClassificationUsingGET({});
      yield put({
        type: 'setCategories',
        categories: _.map(classifications, ({ name, fieldNum }) => {
          return {
            id: name,
            name,
            fieldNum,
          };
        }),
      });
    },

    *fetchFields({ page = 0, size = 10, query = {} }, { put }) {
      const data = yield CORE.listStandardFieldUsingGET({
        params: {
          page,
          size,
          ...query,
        },
      });
      yield put({
        type: 'saveList',
        data,
      });
    },
  },
  reducers: {
    setCategories(state, { categories }) {
      return {
        ...state,
        categories,
      };
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
