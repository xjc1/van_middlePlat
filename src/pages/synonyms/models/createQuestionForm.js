import _ from 'lodash';
import { KERNEL } from '@/services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import pathHash from '@/utils/tRouter';

const defaultStep = {
  values: null,
};

const CreateQuestionForm = {
  namespace: 'createQuestionForm',
  state: {
    editVisible: false,
    current: 'ask',
    step: defaultStep,
  },
  effects: {
    * submitStepForm({ payload, redirect }, { put }) {
      if (payload.id) {
        try {
          yield KERNEL.updateSynonymUsingPOST({ body: payload });
          message.success('编辑问答成功');
          if (redirect) {
            yield put(routerRedux.push(pathHash.path(redirect)));
          }
        } catch (e) {
          message.error('编辑问答失败');
        }
      } else {
        try {
          yield KERNEL.createSynonymUsingPOST({ body: payload });
          message.success('添加问答成功');
          if (redirect) {
            yield put(routerRedux.push(pathHash.path(redirect)));
          }
        } catch (e) {
          message.error('添加问答失败');
        }
      }
    },
  },
  reducers: {
    resetVisible(state, { payload }) {
      return {
        ...state,
        editVisible: payload,
        current: 'ask',
        step: { ...state.step, relationData: {} },
      };
    },

    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    check(state, { payload }) {
      return {
        ...state,
        step: { ...state.step, formData: { ...payload } },
        editVisible: true,
      };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, values: _.assign(state.step.values, payload) } };
    },

    editFormData(state, { payload }) {
      return {
        ...state,
        step: { ...state.step, formData: { ...payload } },
        editVisible: true,
      };
    },

    reset(state) {
      return {
        ...state,
        step: defaultStep,
      };
    },
  },
};
export default CreateQuestionForm;
