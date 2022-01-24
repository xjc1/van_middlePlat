
import { CORE } from '@/services/api';
import _ from "lodash";
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'projectViewSync',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
  },

  effects: {
    *fetchList({ params = {} }, { put }) {
      const {
        content: list = [],
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CORE.listDataSyncRecordUsingGET({
          params,
        }),
        ['SH00XZQH', 'regions'],
      );
      yield put({
        type: 'saveList',
        list: _.map(list, item => ({ ...item, region: dictNames.SH00XZQH[item.regions] })),
        total,
        pageSize,
        pageNum,
      });
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum };
    },
  },
};
export default Model;
