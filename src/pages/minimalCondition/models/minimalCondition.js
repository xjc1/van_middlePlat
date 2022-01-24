import { CORE, TRANSLATE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';

const Model = {
  namespace: 'minimalCondition',
  state: {
    list: [],
    total: 0,
    pageNum: 0,
    pageSize: 10,
    currentPage: 1,
    tagNames: [],
    dictNames: { DXLX0001: {} },
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CORE.getMinimalConditionListUsingGET({
          params: {
            page,
            size,
            ...query,
          },
        }),
        ['DXLX0001', 'objectType'],
      );

      const tagIds = _.uniq(list.map(({ tagId }) => tagId).filter(Boolean));
      const tagNames = yield TRANSLATE.portraitTagTranslateUsingPOST({ body: tagIds });

      yield put({ type: 'saveTagNames', tagNames });

      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
    saveTagNames(state, { tagNames }) {
      return { ...state, tagNames };
    },
  },
};
export default Model;
