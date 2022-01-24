import { CORE, POLICYATLAS } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import { utils } from '@/components/tis_ui';
import { getPolicyAtlasUsingGET, getPolicyNodeDetailUsingGET } from '../utils';

const { IDGenerator } = utils;

const Model = {
  namespace: 'policyGraph',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 0,
    focusItem: null,
    policyDetail: null,
  },
  effects: {
    * fetchList({ payload, condition }, { put }) {
      const {
        content: list,
        size: pageSize,
        totalElements: total,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        POLICYATLAS.listPolicyAtlasUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: payload,
            body: condition,
          }),
        ),
        ['SHGSBMSH', 'attributionDepartment'],
        ['ZCFL', 'category.code'],
        ['ZCJB0001', 'level'],
        ['DXLX0001', 'objectType'],
        ['SH00XZQH', 'regions'],
      );
      yield put({
        type: 'saveList',
        payload: {
          list,
          total,
          pageNum,
          pageSize,
          dictNames,
          condition,
        },
      });
    },
    * selectedNode({ id }, { put }) {
      const detail = yield getPolicyNodeDetailUsingGET(id);
      yield put({
        type: 'saveDetail',
        detail,
      });
    },

    * createPolicyNode({ values }, { put, select }) {
      yield CORE.createPolicyNodeUsingPOST({ body: values });
      const { focusItem } = yield select(({ policyGraph }) => policyGraph);
      if (focusItem) {
        yield put({
          type: 'cleanFocusItem',
        });
        yield put({
          type: 'selectedItem',
          item: focusItem,
        });
      }
    },

    * selectedItem({ item }, { put }) {
      const nextItem = yield getPolicyAtlasUsingGET(item);
      yield put({
        type: 'saveFocusItem',
        nextItem: {
          ...nextItem,
          cid: IDGenerator.next(),
        },
      });
    },

    * reflushItem(nothing, { put, select }) {
      const focusItem = yield select(({ policyGraph }) => policyGraph.focusItem);
      yield put({
        type: 'selectedItem',
        item: focusItem,
      });
    }
  },
  reducers: {
    unSelectedNode(state) {
      return { ...state, policyDetail: null };
    },

    cleanFocusItem(state) {
      return { ...state, focusItem: null, policyDetail: null };
    },

    cleanDetail(state) {
      return { ...state, policyDetail: null };
    },

    saveDetail(state, { detail }) {
      /*
      二次点击不需要关闭
      const { name } = detail;
      const { policyDetail } = state;
       if (policyDetail && name === policyDetail.name) {
          return { ...state, policyDetail: null };
        }
      */
      return { ...state, policyDetail: detail };
    },

    saveFocusItem(state, { nextItem }) {
      return { ...state, focusItem: nextItem, policyDetail: null };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { payload: { list, total, pageSize, pageNum, dictNames = {} } }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
