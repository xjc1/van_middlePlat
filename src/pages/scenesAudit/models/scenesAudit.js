import { SCENE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'scenesAudit',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    dictNames: [],
  },
  effects: {
    *fetchList({ params, body }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        SCENE.getSceneReviewListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params,
            body,
          }),
        ),
        ['SH00XZQH', 'regions'],
      );

      const handledList = list.map(item => ({
        ...item,
        region: dictNames.SH00XZQH[item.regions],
      }));

      yield put({
        type: 'saveList',
        list: handledList,
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
