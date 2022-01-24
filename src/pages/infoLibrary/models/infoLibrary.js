import { BASEINFO } from '@/services/api';
import { message } from 'antd';
import { Code2Name } from '@/utils/DictTools';
import TrackTool from '@/utils/TrackTool';

const Model = {
  namespace: 'infoLibrary',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    page: 1,
    focusItem: null,
    dictNames: { SH00XZQH: {}, '1000': {}, SHSSBMSH: {} },
  },
  effects: {
    *fetchList({ payload, condition }, { put }) {
      const {
        content: list,
        size: pageSize,
        totalElements: total,
        number: page,
        dictNames,
      } = yield Code2Name(
        BASEINFO.getSceneBaseInfoListUsingPOST(
          TrackTool.cacheAndGetQuery({ body: condition, params: payload }),
        ),
        ['SH00XZQH', 'regions'],
        ['1000', 'lifeCycle'],
        ['SHSSBMSH', 'headDept'],
        ['SHSSBMSH', 'executiveSubject'],
      );
      yield put({
        type: 'saveList',
        payload: {
          list,
          total,
          page,
          pageSize,
          condition,
          dictNames,
        },
      });
    },

    *publish({ payload }) {
      try {
        yield BASEINFO.publishSceneBaseInfoUsingPOST(payload);
        message.success('上架成功');
      } catch (e) {
        message.error('上架失败');
      }
    },

    *deleteInfo({ payload }) {
      try {
        yield BASEINFO.deleteSceneBaseInfoDetailUsingPOST(payload);
        message.success('删除成功');
      } catch (e) {
        message.error('删除失败');
      }
    },

    *down({ payload }) {
      try {
        yield BASEINFO.withdrawSceneBaseInfoUsingPOST(payload);
        message.success('下架成功');
      } catch (e) {
        message.error('下架失败');
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

    saveList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
