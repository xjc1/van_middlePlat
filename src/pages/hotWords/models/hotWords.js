import { HOTWORD } from '@/services/api';
import { message } from 'antd';
import _ from 'lodash';
import { utils } from '@/components/tis_ui';
import { Code2Name } from '@/utils/DictTools';

const { IDGenerator } = utils;

const tagIDgenerator = new IDGenerator('tag');

const Model = {
  namespace: 'hotWords',
  state: {
    list: [],
    total: 0,
    size: 10,
    page: 1,
    openModal: false,
    hotWords: [],
    check: false,
    info: {},
    params: {},
    dictNames: {},
  },
  effects: {
    *fetchList({ payload }, { put }) {
      const { page, size, value } = payload;
      const params = { page, size };
      const {
        content,
        size: nextSize,
        number,
        totalElements,
        dictNames = {},
      } = yield Code2Name(HOTWORD.findAllHotWordUsingPOST({ params, body: value }), [
        'SHGSBMSH',
        'attributionDepartment',
      ]);
      yield put({
        type: 'saveList',
        list: _.map(content, item => {
          const { words = [] } = item;
          return {
            ...item,
            words: _.map(words, word => ({
              id: tagIDgenerator.next(),
              name: word,
            })),
          };
        }),
        size: nextSize,
        page: number,
        total: totalElements,
        dictNames,
      });
    },

    *add({ payload }, { put }) {
      try {
        yield HOTWORD.createHotWordUsingPOST({ body: payload });
        message.success('添加成功');
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
        yield put({ type: 'reset' });
      } catch (e) {
        message.error(`添加失败,失败原因：${e.msg}`);
      }
    },

    *editHotWords({ payload }, { put }) {
      try {
        yield HOTWORD.updateHotWordUsingPOST({ body: payload });
        message.success('编辑成功');
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
        yield put({ type: 'reset' });
      } catch (e) {
        message.error(`编辑失败,失败原因：${e.msg}`);
      }
    },

    *delete({ payload }, { put }) {
      try {
        yield HOTWORD.deleteHotWordUsingPOST(payload);
        yield put({ type: 'fetchList', payload: { page: 0, size: 10 } });
        yield put({ type: 'reset' });
        message.success('删除成功');
      } catch (e) {
        message.error(`删除失败，失败原因：${e.msg}`);
      }
    },
  },
  reducers: {
    saveList(state, { list, size, page, total, dictNames }) {
      return { ...state, list, size, page, total, dictNames };
    },

    cancel(state, { payload }) {
      return {
        ...state,
        openModal: payload,
        edit: payload,
        check: payload,
        info: {},
        hotWords: [],
      };
    },

    addHotWords(state, { payload }) {
      return { ...state, openModal: payload };
    },

    save(state, { payload }) {
      return { ...state, hotWords: [...payload] };
    },

    check(state, { payload, info, hotWords }) {
      return { ...state, check: payload, openModal: payload, info, hotWords };
    },

    edit(state, { payload, info, hotWords }) {
      return { ...state, edit: payload, openModal: payload, info, hotWords };
    },

    reset(state) {
      return { ...state, openModal: false, hotWords: [], check: false, info: {} };
    },
  },
};
export default Model;
