import { routerRedux } from 'dva/router';
import PathTool from '@/utils/TrackTool';
import { DICT } from '@/services/api';
import Apiv1 from '@/services/apiv1';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    version: {
      javaVersion: '',
      qaVersion: '',
    },
    rootDict: {},
  },
  effects: {
    *redirect({ path = '/' }, { put }) {
      yield put(routerRedux.push(path));
    },
    *getVersion({ payload }, { put }) {
      const javaVersion = yield Apiv1.getJavaVersion();
      const qaVersion = yield Apiv1.getQaVersion();
      yield put({
        type: 'saveVersion',
        javaVersion,
        qaVersion,
      });
    },
    *getRootDict({payload}, { put }) {
      const data = yield DICT.findAllRootDictionaryUsingGET();
      const dictObj = {};
      data.forEach(it => {
        const { id, code } = it;
        dictObj[code] = id;
      })
      yield put({
        type: 'saveRootDict',
        rootDict:dictObj,
      });
    }
  },
  reducers: {
    toggerCollapsed(state) {
      return { ...state, collapsed: !state.collapsed };
    },
    saveVersion(state, { javaVersion, qaVersion }) {
      return { ...state, version: { javaVersion, qaVersion } };
    },
    saveRootDict(state, {rootDict}) {
      return { ...state, rootDict};
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        PathTool.setPath(pathname);
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
