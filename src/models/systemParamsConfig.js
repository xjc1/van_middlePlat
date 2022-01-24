import { SYS } from '@/services/api';
import _ from 'lodash';
import { configTheme } from '@/utils/constantEnum';
import { treeMethods } from '@tong/datastructure';
import defaultBg from '../../scripts/cook/project/images';

const Model = {
  namespace: 'systemParamsConfig',
  state: {
    configList: [],
    systemConfig: {},
    configValues: {},
    configMap: {},
  },
  effects: {
    * fetchConfigList({ params = {} }, { put }) {
      const res = yield SYS.getSysConfigListUsingGET({ params });
      const nextConfigMap = {};
      treeMethods.forEachTree(res, ({ code, value }) => {
        nextConfigMap[code] = value;
      }, 'nextLayer');
      yield put({
        type: 'saveConfigList',
        list: res || [],
        nextConfigMap,
      });
      return nextConfigMap;
    },
    * fetchConfig({ code }, { put }) {
      const res = yield SYS.getSystemConfigUsingGET({ params: { code } });
      yield put({
        type: 'saveSystemConfig',
        data: res,
      });
    },
    * fetchTitle(payload, { put, select }) {
      const defaultTitle = yield select(({ settings }) => settings.title);
      const title = yield SYS.getSystemConfigUsingGET({ params: { code: 'systemName' } }).then(
        ({ systemName }) => {
          return { systemName: systemName || defaultTitle };
        },
      );
      yield put({
        type: 'saveSystemConfig',
        data: { ...title },
      });
    },

    * fetchImg(payload, { put }) {
      const userImg = yield SYS.getSystemConfigUsingGET({ params: { code: 'loginBackgroundUrl' } });
      const { loginBackgroundUrl } = userImg;
      if (_.isEmpty(loginBackgroundUrl)) {
        const img = yield SYS.getSystemConfigUsingGET({ params: { code: 'loginBackground' } }).then(
          ({ loginBackground }) => {
            return { loginBackground: loginBackground || defaultBg.bg };
          },
        );
        yield put({
          type: 'saveSystemConfig',
          data: { ...img },
        });
      } else {
        yield put({
          type: 'saveSystemConfig',
          data: { ...userImg },
        });
      }
    },
    * fetchThemeConfig(payload, { put }) {
      const themeConfigs = _.map(configTheme, code =>
        SYS.getSystemConfigUsingGET({ params: { code } }),
      );
      const themeConfigValues = yield Promise.all(themeConfigs);
      yield put({
        type: 'saveConfigValues',
        value: {
          theme: themeConfigValues.reduce((prev, config) => ({ ...prev, ...config }), {}),
        },
      });
    },
  },
  reducers: {
    saveConfigList(state, { list, nextConfigMap }) {
      return {
        ...state,
        configList: list,
        configMap: nextConfigMap,
      };
    },
    saveSystemConfig(state, { data = {} }) {
      const newSystemConfig = { ...state.systemConfig, ...data };
      return { ...state, systemConfig: newSystemConfig };
    },
    saveConfigValues(state, { value = {} }) {
      return { ...state, configValues: { ...state.configValues, ...value } };
    },
  },
};

export default Model;
