import { POLICY } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import TrackTool from '@/utils/TrackTool';

const initState = {
  list: [],
  condition: {},
  dictNames: {},
  duplicatePolicies: null,
  duplicateId: null,
  total: 0,
  pageSize: 10,
  page: 0,
  focusItem: null,
  createParams: {
    policyCategory: '',
    defaultCategory: '',
    newInstance: null,
  },
  showPagination: true,
};

const Model = {
  namespace: 'policyContent',
  state: initState,
  effects: {
    *fetchList({ payload, condition }, { put }) {
      const {
        content: list,
        size: pageSize,
        totalElements: total,
        number: page,
        dictNames,
      } = yield Code2Name(
        POLICY.listPolicyUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: payload,
            body: condition,
          }),
        ),
        ['SHGSBMSH', 'attributionDepartment'],
        ['ZCJB0001', 'level'],
        ['DXLX0001', 'objectType'],
      );
      yield put({
        type: 'saveList',
        payload: {
          list,
          total,
          page,
          pageSize,
          dictNames,
          condition,
        },
      });
    },

    *updatePolicyContent({ id, payload, callBack = () => {} }) {
      const res = yield POLICY.updatePolicyUsingPOST(id, { body: payload });
      callBack(null, res);
    },

    *changeStatus({ payload, status, callBack = () => {} }) {
      let res = null;
      if (status === 0) {
        res = yield POLICY.publishPolicyUsingPOST(payload);
      } else {
        res = yield POLICY.withdrawPolicyUsingPOST(payload);
      }
      callBack(null, res);
    },
  },
  reducers: {
    setDuplicatePolicies(state, { payload }) {
      const { list, dictNames2, duplicateId } = payload;
      const { dictNames } = state;
      const nextDictNames = _.reduce(
        dictNames,
        (result, v, key) => {
          return {
            ...result,
            [key]: {
              ...v,
              ...dictNames2[key],
            },
          };
        },
        {},
      );
      return {
        ...state,
        duplicateId,
        duplicatePolicies: list,
        dictNames: nextDictNames,
      };
    },

    closeDuplicatePolicies(state) {
      return {
        ...state,
        duplicatePolicies: null,
        duplicateId: null,
      };
    },

    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { payload }) {
      return { ...state, focusItem: null, ...payload, showPagination: true };
    },

    clear() {
      return { ...initState };
    },
  },
};
export default Model;
