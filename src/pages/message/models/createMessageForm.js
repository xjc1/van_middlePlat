import _ from 'lodash';
import { message } from 'antd';
import {NOTIFY} from "@/services/api"

const defaultStep = {
  formData:{},
  linkData:[]
};

const CreateMessageForm = {
  namespace: 'createMessageForm',
  state: {
    editVisible: false,
    current: 'ask',
    step: defaultStep,
    copy:false,
    check:false,
    edit:false,
  },

  effects: {

  },
  reducers: {
    resetVisible(state, { payload }) {
      return {
        ...state, copy:false, current: 'ask',
        step: {...state.step, formData:{}, linkData:[]}
      };
    },

    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload,formData }) {
      return { ...state, step: { ...state.step, values: _.assign(state.step.values,payload),
          formData: _.assign(state.step.formData,formData)} };
    },

    check(state, { payload }){
      return { ...state,  step: { ...state.step, formData: { ...payload } }, check: true, copy: false, edit:false, };
    },

    copy(state, { payload }){
      return { ...state,  step: { ...state.step, formData: { ...payload } }, copy: true, edit:false, check: false, };
    },

    createMessage(state){
      return { ...state, copy: false, edit:false, check: false, }
    },

    editFormData(state, { payload }) {
      return { ...state, step: {...state.step, formData: {...payload}} , edit:true, check: false, copy: false, };
    },

    saveFormData(state,{payload}){
      return { ...state, step: {...state.step, formData: {...payload}}};
    },

    changeLinkData(state,{payload}){
      return { ...state, step: {...state.step, linkData: [...payload] }};
    },

    reset(state) {
      return {
        ...state, step: {...state.step,formData:{}}
      };
    }
  },
};
export default CreateMessageForm;
