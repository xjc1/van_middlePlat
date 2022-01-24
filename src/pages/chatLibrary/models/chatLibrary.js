/* eslint-disable */
import { CHAT } from '@/services/api';
import { message } from 'antd';
import { v4 as uuid } from 'uuid';
import { utils } from '@/components/tis_ui';
import _ from 'lodash';
import TrackTool from '@/utils/TrackTool';
import { Code2Name } from '@/utils/DictTools';

const { Base64 } = utils;

const Model = {
  namespace: 'chatLibrary',
  state: {
    list: [],
    total: 0,
    size: 10,
    page: 0,
    focusItem: null,
    // check: false,
    edit: false,
    formData: null,
    dictNames: {},
  },
  effects: {
    *fetchForm({ payload: { id, check } }, { put }) {
      const {
        richAnswer = [],
        question = [],
        answer = [],
        ...others
      } = yield CHAT.updateChatUsingGET(id);
      // if (pathname.indexOf("view") > -1) {
      //   dispatch({ type: 'chatLibrary/check', payload: { ...focusItem } });
      // } else if (pathname.indexOf("edit") > -1) {
      //   dispatch({ type: 'chatLibrary/editChat', payload: { ...focusItem } });
      // }
      yield put({
        type: 'saveFormData',
        payload: {
          question: question.map(item => ({ key: uuid(), content: item })),
          richAnswer: richAnswer.map(item => ({ key: uuid(), content: Base64.decodeBase64(item) })),
          answer: answer.map(item => ({ key: uuid(), content: item })),
          ...others,
        },
        check,
      });
    },

    *fetchList({ payload: { page = 0, size = 10, query = {} } }, { put }) {
      const { content, totalElements, size: pageSize, number, dictNames = {} } = yield Code2Name(
        CHAT.findAllChatUsingPOST(
          TrackTool.cacheAndGetQuery({
            params: { page, size },
            body: query,
          }),
        ),
        ['SHGSBMSH', 'attributionDepartment'],
      );
      yield put({
        type: 'saveList',
        list: content,
        total: totalElements,
        pageSize,
        pageNum: number,
        dictNames,
      });
    },

    *editChatLib({ payload }, { put }) {
      try {
        yield CHAT.updateChatUsingPOST({ body: payload });
        message.success('更新聊天库成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('更新聊天库失败,失败原因：' + e.msg);
      }
    },

    *addChatLib({ payload }, { put }) {
      try {
        yield CHAT.addChatUsingPOST({ body: payload });
        message.success('新增聊天库成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('新增聊天库失败，失败原因：' + e.msg);
      }
    },

    *publishChat({ payload }, { put }) {
      try {
        yield CHAT.publishChatUsingPOST(payload);
        message.success('上架聊天库成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('上架聊天库失败，失败原因：' + e.msg);
      }
    },

    *withdrawChat({ payload }, { put }) {
      try {
        yield CHAT.withdrawChatUsingPOST(payload);
        message.success('下架聊天库成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('下架聊天库失败，失败原因：' + e.msg);
      }
    },

    *deleteChat({ payload }, { put }) {
      try {
        yield CHAT.deleteChatUsingPOST(payload);
        message.success('删除聊天库成功');
        yield put({ type: 'fetchList', payload: {} });
      } catch (e) {
        message.error('删除聊天库失败，失败原因：' + e.msg);
      }
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum, dictNames }) {
      return { ...state, list, total, size: pageSize, page: pageNum, focusItem: null, dictNames };
    },

    check(state, { payload }) {
      return { ...state, formData: payload, check: true, edit: false };
    },

    editChat(state, { payload }) {
      return { ...state, formData: payload, check: false, edit: true };
    },

    newForm(state) {
      return {
        ...state,
        check: false,
        edit: true,
        formData: { question: [], richAnswer: [], answer: [] },
      };
    },

    addRichText(state) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          richAnswer: [...formData.richAnswer, { key: uuid(), content: '' }],
        },
      };
    },
    addQuestion(state) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          question: [...formData.question, { key: uuid(), content: '' }],
        },
      };
    },

    deleteQuestion(state, { deleteKey }) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          question: _.filter(formData.question, ({ key }) => key !== deleteKey),
        },
      };
    },
    deleteRichText(state, { deleteKey }) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          richAnswer: _.filter(formData.richAnswer, ({ key }) => key !== deleteKey),
        },
      };
    },

    deleteText(state, { deleteKey }) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          answer: _.filter(formData.answer, ({ key }) => key !== deleteKey),
        },
      };
    },

    saveFormData(state, { payload, check }) {
      return { ...state, formData: payload, edit: true, check };
    },

    reset(state) {
      return { ...state, formData: null };
    },
  },
};
export default Model;
