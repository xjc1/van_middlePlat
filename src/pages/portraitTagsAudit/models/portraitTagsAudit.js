import { Code2Name } from '@/utils/DictTools';
import { conditionReviewType } from '@/utils/constantEnum';
import fetchReviewList from '@/services/fetchReviewList';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'portraitTagsAudit',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    curReviewType: conditionReviewType.NEED_REVIEW,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put, select }) {
      const curReviewType = yield select(
        ({ portraitTagsAudit }) => portraitTagsAudit.curReviewType,
      );
      const {
        content = [],
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        fetchReviewList(curReviewType)(
          TrackTool.cacheAndGetQuery({
            params: { ...query, page, size },
          }),
        ),
        ['SHSSBMSH', 'collectDepartment'],
        ['SHSSBMSH', 'applyDept'],
        ['SHSSBMSH', 'reviewDept'],
      );

      yield put({
        type: 'saveList',
        list: content.map(item => {
          const { collectDepartment, applyDept, reviewDept } = item;
          return {
            ...item,
            collectDept: dictNames.SHSSBMSH[collectDepartment] || collectDepartment,
            applyDept: dictNames.SHSSBMSH[applyDept] || applyDept,
            reviewDept: dictNames.SHSSBMSH[reviewDept] || reviewDept,
          };
        }),
        total,
        pageSize,
        pageNum,
      });
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },
    saveCurReviewType(state, { curReviewType }) {
      return { ...state, curReviewType };
    },
  },
};
export default Model;
