import { CORE, STANDARDMATERIALS } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import _ from 'lodash';

const Model = {
  namespace: 'standardMaterial',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    categories: [],
    dictNames: {},
  },
  effects: {
    *fetchDepartmentNum(payload, { put }) {
      const {
        content = [],
        dictNames = {},
      } = yield Code2Name(STANDARDMATERIALS.queryIssuingDepartmentNumVosUsingGET({}), [
        'SHFZBMSH',
        'issuingDepartment',
      ]);
      yield put({
        type: 'setCategories',
        categories: _.map(content, ({ issuingDepartment, num }) => {
          return {
            id: issuingDepartment,
            name: dictNames.SHFZBMSH[issuingDepartment],
            num,
          };
        }),
      });
    },

    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        CORE.listStandardMaterialUsingGET(
          TrackTool.cacheAndGetQuery({
            params: { ...query, page, size },
          }),
        ),
        ['XZCJ', 'administrativeLevel'],
        ['CLLY', 'source'],
      );
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
    setCategories(state, { categories }) {
      return {
        ...state,
        categories,
      };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, dictNames };
    },
  },
};
export default Model;
