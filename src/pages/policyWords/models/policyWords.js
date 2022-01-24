import { POLICYWORDS } from '@/services/api';
import { message } from 'antd';

const Model = {
  namespace: 'policyWords',
  state: {
    list: [],
    total: 0,
    size: 10,
    page: 0,
    info: {},
    isOpenModal: false,
    isCheck: false,
    isEdit: false,
  },
  effects: {
    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const resp = yield POLICYWORDS.listPolicyWordsUsingPOST({
        params: { page, size },
        body: query,
      });
      yield put({
        type: 'saveList',
        list: resp.content,
        total: resp.totalElements,
        size: resp.size,
        page: resp.number,
      });
    },

    *add({ payload }, { put }) {
      try {
        yield POLICYWORDS.addPolicyWordsUsingPOST({ body: payload });
        message.info('添加成功');
        yield put({ type: 'fetchList', payload: {} });
        yield put({ type: 'cancel', payload: {} });
      } catch (e) {
        message.error('添加失败');
      }
    },

    *editHotWords({ payload }, { put }) {
      try {
        yield POLICYWORDS.updatePolicyWordsUsingPOST({ body: payload });
        message.info('编辑成功');
        yield put({ type: 'fetchList', payload: {} });
        yield put({ type: 'cancel', payload: {} });
      } catch (e) {
        message.error('编辑失败');
      }
    },

    *detail({ payload, check }, { put }) {
      try {
        const resp = yield POLICYWORDS.findByIdUsingGET({ params: { id: payload } });
        yield put({ type: 'saveFormData', payload: resp });
        if (check) {
          yield put({ type: 'checkPolicyWords' });
        } else {
          yield put({ type: 'editPolicyWords' });
        }
      } catch (e) {
        message.error('获取详情失败');
        yield put({ type: 'editPolicyWords' });
      }
    },

    *status({ payload }, { put }) {
      try {
        yield POLICYWORDS.editPolicyWordsPublishStatusUsingPOST({ body: payload });
        message.success('修改上下级状态成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('修改上下级状态失败');
      }
    },

    *delete({ payload }, { put }) {
      try {
        yield POLICYWORDS.deletePolicyWordsUsingPOST(payload);
        message.success('删除百科词条成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('删除百科词条失败');
      }
    },
  },

  reducers: {
    saveList(state, { list, collectDepartmentCn, total, size, page }) {
      return { ...state, list, collectDepartmentCn, total, size, page };
    },

    addPolicyWords(state, { payload }) {
      return { ...state, isOpenModal: payload };
    },

    cancel(state) {
      return { ...state, isOpenModal: false, isCheck: false, isEdit: false, info: {} };
    },

    editPolicyWords(state) {
      return { ...state, isOpenModal: true, isEdit: true };
    },

    checkPolicyWords(state) {
      return { ...state, isOpenModal: true, isCheck: true };
    },

    saveFormData(state, { payload }) {
      return { ...state, info: { ...payload } };
    },
  },
};
export default Model;
