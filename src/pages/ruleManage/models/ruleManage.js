import { METHODSCHEMAS, CORE } from '@/services/api';
import { message } from 'antd';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'ruleManage',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    info: {},
    isCheck: false,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield METHODSCHEMAS.findMethodSchemasUsingGET(
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

    *editRule({ body }) {
      try {
        yield METHODSCHEMAS.updateMethodSchemaUsingPOST({ body });
        message.success('修改成功');
      } catch (e) {
        message.error(`修改失败，失败原因：${e.msg}`);
      }
    },

    *getRuleDetail({ id, isCheck }, { put }) {
      const data = yield METHODSCHEMAS.findMethodSchemaTagByIdUsingGET(id);
      yield put({ type: 'saveInfo', info: data, isCheck });
    },

    *publish({ id }, { put }) {
      try {
        yield METHODSCHEMAS.publishMethodSchemaUsingPOST(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('上架成功');
      } catch (e) {
        message.error(`上架失败，失败原因：${e.msg}`);
      }
    },

    *down({ id }, { put }) {
      try {
        yield METHODSCHEMAS.withdrawMethodSchemaUsingPOST(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('下架成功');
      } catch (e) {
        message.error(`下架失败，失败原因：${e.msg}`);
      }
    },

    *addFunction({ body }, { put }) {
      yield CORE.addCustomMethodSchemaUsingPOST({ body });
      message.success('添加成功');
      yield put({ type: 'fetchList', payload: {} });
    },
  },

  reducers: {
    saveInfo(state, { info, isCheck }) {
      return { ...state, info, isCheck };
    },

    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null };
    },

    clearForm(state) {
      return { ...state, info: {}, isCheck: false };
    },
  },
};
export default Model;
