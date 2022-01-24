import { CORE, MODULES } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import { modulesContentType } from '@/utils/constantEnum';
import _ from 'lodash';
import { message } from 'antd';
import router from '@/utils/tRouter';

const Model = {
  namespace: 'modulesManage',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
    outputFieldList: {},
    needTranslateFieldsGroup: {},
  },
  effects: {
    *updateModule({ payload }) {
      console.log('-> payload', payload);
      yield MODULES.updateModuleUsingPOST({ body: payload });
      message.success('修改成功');
    },

    *addModule({ payload }) {
      yield CORE.addModuleUsingPOST({ body: payload });
      message.success('新增成功');
      router.goBack();
    },

    *fetchOutputFieldList(param, { put }) {
      const groups = yield MODULES.getOutputFieldListUsingPOST({
        body: [
          modulesContentType.SCENE,
          modulesContentType.SERVICE,
          modulesContentType.POLICY_PROJECT,
          modulesContentType.POLICY,
          modulesContentType.MATTER,
          modulesContentType.ARTICLE,
        ],
      });
      const fieldsGroup = _.reduce(
        groups,
        (result, v, k) => {
          return {
            ...result,
            [k]: _.map(v, ({ field, name }) => {
              return { value: field, label: name };
            }),
          };
        },
        {},
      );

      const needTranslateFieldsGroup = _.reduce(
        groups,
        (result, v, k) => {
          return {
            ...result,
            [k]: v
              .filter(({ translateType }) => translateType)
              .map(({ field, name }) => {
                return { value: field, label: `${name}（中文）` };
              }),
          };
        },
        {},
      );

      yield put({ type: 'setOutputFieldList', outputFieldList: fieldsGroup });
      yield put({ type: 'saveNeedTranslateFieldsGroup', needTranslateFieldsGroup });
    },

    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield CORE.getModuleListUsingGET(
        TrackTool.cacheAndGetQuery({
          params: { ...query, page, size },
        }),
      );
      yield put({
        type: 'saveList',
        list,
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
    setOutputFieldList(state, { outputFieldList }) {
      return { ...state, outputFieldList };
    },
    saveNeedTranslateFieldsGroup(state, { needTranslateFieldsGroup }) {
      return { ...state, needTranslateFieldsGroup };
    },
  },
};

export default Model;
