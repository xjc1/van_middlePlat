import { SCENE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const Model = {
  namespace: 'childScenes',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    currentPage: 1,
    focusItem: null,
    dictNames: [],
  },
  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        size: pageSize,
        totalElements: total,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        SCENE.getSceneListForLinkedUsingPOST({
          params,
          body,
        }),
        ['SH00XZQH', 'regions'],
      );

      const handledList = list.map(item => ({
        ...item,
        region: dictNames['SH00XZQH'][item.regions],
      }));

      yield put({
        type: 'saveList',
        list: handledList,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, dictNames, focusItem: null };
    },
  },
};
export default Model;
