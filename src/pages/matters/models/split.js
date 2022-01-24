import { CORE, MATERIAL, MATTER, RESOLVEMATERIAL } from '@/services/api';
import ModalType from '../materialSplit/ModalType';
import { message } from 'antd';
import _ from 'lodash';
import { utils } from '@/components/tis_ui';
import { Code2Name } from '@/utils/DictTools';

const { IDGenerator } = utils;
const idGenerator = new IDGenerator('result');
const originApprovalResultGenerator = new IDGenerator('originApprovalResult');

const Model = {
  namespace: 'split',
  state: {
    direction: 'vertical',
    matter: undefined,
    material: undefined,
    modalType: ModalType.none,
    materialDTOS: [],
    resolveMaterialDTOS: [],
    materialMap: {},
    dictNames: { SYCLZT: {} },
    originApprovalResult: [],
  },
  effects: {
    *fetchMaterial({ id }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      const data = matter || (yield MATTER.queryMatterDetailUsingGET(id));
      const {
        materialDTOS = [],
        resolveMaterialDTOS = [],
      } = yield MATTER.findMaterialUnderMatterByIdUsingGET(data.id);

      const materialMap = _.reduce(
        materialDTOS,
        (result, { id: mid, name }) => {
          return { ...result, [mid]: name };
        },
        {},
      );

      const groups = materialDTOS.reduce((prev, cur) => {
        const key = cur.status;
        if (prev[key]) return { ...prev, [key]: [...prev[key], cur] };
        return { ...prev, [key]: [cur] };
      }, {});

      data.originApprovalResult = _.map(data.originApprovalResult, item => {
        return {
          ...item,
          id: idGenerator.next(),
        };
      });
      const { dictNames = {} } = yield Code2Name(
        Promise.resolve({ content: resolveMaterialDTOS }),
        ['SYCLZT', 'materialSubject'],
      );

      yield put({
        type: 'saveMatter',
        materialDTOS: Object.values(groups)
          .flat()
          .sort((prev, next) => prev.status - next.status),
        resolveMaterialDTOS,
        dictNames,
        matter: data,
        materialMap,
      });
    },

    *fetchResults({ id }, { put }) {
      const result = yield CORE.listApprovalResultUsingGET({ params: { matterId: id } }).then(
        data => {
          return _.map(data, ({ originApprovalResult, approvalResults = [] }) => {
            return {
              ...originApprovalResult,
              oid: originApprovalResultGenerator.next(),
              approvalResults,
            };
          });
        },
      );
      yield put({
        type: 'saveApprovalResults',
        payload: result,
      });
    },

    *copyMaterial({ materialIds }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield MATERIAL.materialCopyUsingPOST({
        body: {
          matterId: matter.id,
          materialIds,
        },
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success('复制原始材料成功');
    },

    *addMaterial({ payload }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield MATERIAL.addMaterialUsingPOST({
        body: payload,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success('添加原始材料成功');
    },

    *updateMaterial({ payload }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield MATERIAL.updateMaterialUsingPOST({
        body: payload,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success(`更新原始材料[${payload.name}]成功`);
    },

    *deleteMaterial({ selectKeys }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield MATERIAL.deleteMaterialUsingPOST({
        body: selectKeys,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success(`删除材料成功`);
    },

    *addResolveMaterial({ payload }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield RESOLVEMATERIAL.addResolveMaterialUsingPOST({
        body: payload,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success('创建拆解材料成功');
    },

    *updateResolveMaterial({ payload }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield RESOLVEMATERIAL.updateResolveMaterialUsingPOST({
        body: payload,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success(`更新拆解材料[${payload.name}]成功`);
    },

    *deleteResolveMaterial({ selectKeys }, { put, select }) {
      const matter = yield select(({ split }) => split.matter);
      yield RESOLVEMATERIAL.deleteResolveMaterialUsingPOST({
        body: selectKeys,
      });
      yield put({
        type: 'fetchMaterial',
        id: matter.id,
      });
      message.success(`删除材料成功`);
    },
  },
  reducers: {
    direction(state, { direction }) {
      return { ...state, direction };
    },

    saveMatter(state, { materialDTOS, resolveMaterialDTOS, matter, materialMap, dictNames }) {
      return {
        ...state,
        materialDTOS,
        resolveMaterialDTOS,
        matter,
        materialMap,
        dictNames,
      };
    },

    saveApprovalResults(state, { payload }) {
      return {
        ...state,
        originApprovalResult: payload,
      };
    },

    selectedItem(state, { material, modalType }) {
      return { ...state, material, modalType };
    },

    unSelected(state) {
      return { ...state, material: null, modalType: ModalType.none };
    },

    clean() {
      return {
        direction: 'vertical',
        matter: undefined,
        material: undefined,
        modalType: ModalType.none,
        materialDTOS: [],
        resolveMaterialDTOS: [],
        materialMap: {},
        originApprovalResult: [],
      };
    },
  },
};
export default Model;
