import { ARTICLE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import { message } from 'antd';

const Model = {
  namespace: 'article',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
  },
  effects: {
    * fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
        dictNames,
      } = yield Code2Name(
        ARTICLE.getArticlelistUsingPOST({
          params: { page, size },
          body: query,
        }),
        ['SHGSBMSH', 'attributionDepartment'],
        ['ZCJB0001', 'level'],
        ['SH00XZQH', 'regions'],
        ['ZDLX', 'clientType'],
        ['DXLX0001', 'objectType'],
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

    * changeStatus({ payload = {} }, { put }) {
      try {
        if (payload.status === 0) {
          yield ARTICLE.publishArticleUsingPOST(payload.id);
          message.success('文章上架成功');
        } else {
          yield ARTICLE.withdrawArticleUsingPOST(payload.id);
          message.success('文章下架成功');
        }
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
      } catch (e) {
        message.error('修改文章上下级状态失败');
      }
    },

    * deleteArticle({ id }, { put }) {
      try {
        yield ARTICLE.deleteArticleUsingPOST(id);
        message.success('删除文章成功');
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
      } catch (e) {
        message.error('删除文章失败');
      }
    },
  },

  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, pageSize, pageNum, focusItem: null, dictNames };
    },

    reset(state) {
      return { ...state, pageSize: 10, pageNum: 0 };
    },
  },
};
export default Model;
