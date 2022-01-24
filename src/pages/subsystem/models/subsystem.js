import { CORE, PAGEMENUS } from "@/services/api";
import { message } from 'antd';

const Model = {
  namespace: 'subsystem',
  state: {
    systems: [],
  },
  effects: {
    * fetchList(notuse, { put }) {
      const systems = yield PAGEMENUS.findPageMenuTreeUsingGET({
        params: {
          needStatusFilter: false,
        }
      });
      yield put({
        type: 'saveSystems',
        systems,
      });
    },

    * createMenu({ menu }, { put }) {
      yield CORE.createPageMenuUsingPOST({ body: menu });
      yield put({ type: 'fetchList' });
    },

    * updateMenu({ menu }, { put }) {
      yield PAGEMENUS.updatePageMenuUsingPOST({ body: menu });
      message.success('更新成功');
      yield put({ type: 'fetchList' });
    },

    * deleteMenu({ id }, { put }) {
      yield PAGEMENUS.deletePageMenuUsingPOST(id);
      message.success('删除成功');
      yield put({ type: 'fetchList' });
    },

    * upStatus({ id }, { put }) {
      yield PAGEMENUS.publishPageMenuUsingPOST(id);
      message.success('上架成功');
      yield put({ type: 'fetchList' });
    },

    * downStatus({ id }, { put }) {
      yield PAGEMENUS.withDrawPageMenuUsingPOST(id);
      message.success('下架成功');
      yield put({ type: 'fetchList' });
    },
  },
  reducers: {
    saveSystems(state, { systems }) {
      return { ...state, systems };
    },
  },
};
export default Model;
