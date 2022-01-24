/* eslint-disable */
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';
import { message } from 'antd';
import { PRECISEQUESTIONS, CORE } from '../../../services/api';
import _ from 'lodash';

const Model = {
  namespace: 'triggerWords',
  state: {
    list: [],
    total: 0,
    size: 10,
    page: 0,
    formData: null,
    isCheck: false,
    dictNames: {},
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
        CORE.getPreciseQuestionsUsingGET(
          TrackTool.cacheAndGetQuery({
            params: { ...query, page, size },
          }),
        ),
        ['SHGSBMSH', 'attributionDepartment'],
        ['CFCLX', 'type'],
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

    *createTrigger({ payload }, { put }) {
      try {
        yield CORE.createPreciseQuestionUsingPOST({ body: payload });
        message.info('添加成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('添加失败,失败原因：' + e.msg);
      }
    },

    *updateTrigger({ payload }, { put }) {
      try {
        yield PRECISEQUESTIONS.updatePreciseQuestionUsingPOST({ body: payload });
        message.info('编辑成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('编辑失败，失败原因：' + e.msg);
      }
    },

    *deleteTrigger({ id }, { put }) {
      try {
        yield PRECISEQUESTIONS.deletePreciseQuestionUsingPOST(id);
        message.success('删除成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('删除失败，失败原因：' + e.msg);
      }
    },

    *changeStatus({ payload }, { put }) {
      try {
        yield PRECISEQUESTIONS.updatePreciseQuestionPublishStatusUsingPOST({ body: payload });
        yield put({ type: 'fetchList', payload: {} });
        message.success('修改上下架状态成功');
      } catch (e) {
        message.error('修改上下架状态失败，失败原因：' + e.msg);
      }
    },
  },
  reducers: {
    openModal(state, { payload }) {
      const { keyWord = [], conflictWord = [] } = payload;
      const keyWords = _.map(keyWord, item => ({ name: item }));
      const conflictWords = _.map(conflictWord, item => ({ name: item }));
      return {
        ...state,
        formData: { ...payload, keyWord: keyWords, conflictWord: conflictWords },
        isCheck: false,
      };
    },

    checkTrigger(state, { payload }) {
      const { keyWord = [], conflictWord = [] } = payload;
      const keyWords = _.map(keyWord, item => ({ name: item }));
      const conflictWords = _.map(conflictWord, item => ({ name: item }));
      return {
        ...state,
        formData: { ...payload, keyWord: keyWords, conflictWord: conflictWords },
        isCheck: true,
      };
    },

    closeModal(state) {
      return { ...state, formData: null, isCheck: false };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, formData: null, dictNames };
    },

    reset(state) {
      return { ...state, formData: null, isCheck: false, list: [] };
    },
  },
};
export default Model;
