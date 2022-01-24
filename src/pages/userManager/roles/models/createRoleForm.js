import { UM } from "@/services/api";
import _ from 'lodash';

const defaultStep = {
  roleName: '',
  roleCode: '',
  viewPermissions: [],
  dataPermissions: [],
  dataNodes: [],
};

const CreateRoleForm = {
  namespace: 'createRoleForm',
  state: {
    editVisible: false,
    current: 'base',
    step: defaultStep,
  },
  effects: {
    * submitStepForm({ payload }, { call, put, select }) {
      const { roleName, roleCode, viewPermissions, dataPermissions } = yield select(({ createRoleForm }) => createRoleForm.step);
      const { body } = yield UM.addRole({
        role: {
          roleName, roleCode, viewPermissions: _.join(viewPermissions, ','),
        },
        permissions: dataPermissions,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'finish',
      })
    },
  },
  reducers: {
    resetVisible(state, { payload }) {
      return {
        ...state, editVisible: payload, current: 'base', step: defaultStep
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
export default CreateRoleForm;
