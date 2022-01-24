import { RESOLVEMATERIAL, MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'materialSplit',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
    dictNames: {},
    currentRecord: null,
    originMaterial: [],
    editAble: false,
    modalTitle: null,
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
        RESOLVEMATERIAL.getResolveMaterialListUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: { page, size },
            body: query,
          }),
        ),
        ['SHSSBMSH', 'department'],
        ['SH00XZQH', 'regions'],
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

    *getMaterialDetail({ payload: { id, editAble, modalTitle } }, { put }) {
      const {
        matterId,
        customExamplePath,
        customExampleName,
        customEmptyPath,
        customEmptyName,
        examinePointPath,
        examinePointName,
        ...detail
      } = yield RESOLVEMATERIAL.findByIdUsingGET(id);
      const customExample = [customExamplePath, customExampleName];
      const customEmpty = [customEmptyPath, customEmptyName];
      const examinePoint = [examinePointPath, examinePointName];

      yield put({
        type: 'saveCurrentRecord',
        currentRecord: {
          ...detail,
          matterId: [matterId],
          customExample,
          customEmpty,
          examinePoint,
        },
        editAble,
        originMaterial: [],
        modalTitle,
      });
    },

    *getOriginMaterial({ payload: { id } }, { put }) {
      const { materialDTOS = [] } = yield MATTER.findMaterialUnderMatterByIdUsingGET(id);

      yield put({
        type: 'saveOriginMaterial',
        originMaterial: materialDTOS,
      });
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    onCreate(state, { modalTitle }) {
      return { ...state, currentRecord: {}, originMaterial: [], modalTitle, editAble: true };
    },
    saveCurrentRecord(state, { currentRecord, editAble = false, originMaterial = [], modalTitle }) {
      return { ...state, currentRecord, editAble, originMaterial, modalTitle };
    },

    onClear(state) {
      return { ...state, currentRecord: null, originMaterial: [] };
    },

    saveOriginMaterial(state, { originMaterial }) {
      return { ...state, originMaterial };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
