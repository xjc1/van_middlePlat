


function generateStepModel(name, upperFirstName) {

  return `
import { UM } from "@/services/api";
import _ from 'lodash';

const defaultStep = {
  demoForm: '',
  demoForm2: ''
};

const ${upperFirstName} = {
  namespace: '${name}',
  state: {
    editVisible: false,
    current: 'p1',
    step: defaultStep,
  },
  effects: {
    * submitStepForm({ payload }, { call, put, select }) {
      yield put({
        type: 'saveCurrentStep',
        payload: 'p3',
      })
    },
  },
  reducers: {
    resetVisible(state, { payload }) {
      return {
        ...state, editVisible: payload, current: 'p1', step: defaultStep
      };
    },

    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    reset(state) {
      return {
        ...state, step: defaultStep
      };
    }
  },
};
export default ${upperFirstName};

  `;
};

module.exports = generateStepModel;
