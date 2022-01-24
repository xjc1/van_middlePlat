import { PROJECTOVERVIEWS, CORE, DICT } from '@/services/api';
import { message } from 'antd';
import _ from 'lodash';

const Model = {
  namespace: 'projectView',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    focusItem: null,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {}, rootId } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield PROJECTOVERVIEWS.findAllProjectOverviewUsingPOST({
        params: { page, size },
        body: query,
      });
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
        dictNames,
      });
      const childIds = _.flatten(
        list.map(({ classification = [] }) => {
          return classification.map(({ id }) => id);
        }),
      ).filter(data => data);
      const body = { rootId, childIds };
      const data = yield DICT.translateDictPathByIdsUsingPOST({ body });
      yield put({ type: 'saveDict', list: data });
    },

    *addProjectView({ payload }) {
      try {
        yield CORE.createProjectOverviewUsingPOST({ body: payload });
        message.success('创建成功');
      } catch (e) {
        message.error(`创建失败，失败原因：${e.msg}`);
      }
    },

    *editProjectView({ payload }) {
      try {
        yield CORE.updateProjectOverviewUsingPUT({ body: payload });
        message.success('编辑成功');
      } catch (e) {
        message.error(`编辑失败，失败原因：${e.msg}`);
      }
    },

    *publish({ id }, { put }) {
      try {
        yield PROJECTOVERVIEWS.publishProjectOverviewUsingPUT(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('上架成功');
      } catch (e) {
        message.error(`上架失败，失败原因：${e.msg}`);
      }
    },

    *down({ id }, { put }) {
      try {
        yield PROJECTOVERVIEWS.withdrawProjectOverviewUsingPUT(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('下架成功');
      } catch (e) {
        message.error(`下架失败，失败原因：${e.msg}`);
      }
    },

    *deleteProjectView({ id }, { put }) {
      try {
        yield PROJECTOVERVIEWS.deleteProjectOverviewUsingDELETE(id);
        yield put({ type: 'fetchList', payload: {} });
        message.success('删除成功');
      } catch (e) {
        message.error(`删除失败，失败原因：${e.msg}`);
      }
    },
  },
  reducers: {
    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveDict(state, { list }) {
      return { ...state, dictList: list };
    },

    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },
  },
};
export default Model;
