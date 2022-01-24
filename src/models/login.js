import { stringify } from 'querystring';
import router from '@/utils/tRouter';
import { getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { AUTH } from '@/services/api';
import emptyFn from '@/components/tis_ui/utils/EmptyFn';
import { message } from 'antd';
import moment from 'moment';

const retryTimes = 5;

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({ payload, onError = emptyFn }, { put }) {
      try {
        yield put({
          type: 'user/deleteCurrentUser',
        });
        const failLogin = localStorage.getItem('failLogin');
        const failOffsetTime = localStorage.getItem('failOffsetTime');
        const currentTime2 = new Date().getTime();
        if (
          failOffsetTime &&
          Number(failLogin) >= retryTimes &&
          currentTime2 - failOffsetTime < 15 * 60 * 1000
        ) {
          message.error(
            `输入错误次数过多, 请${moment(16 * 60 * 1000 - (currentTime2 - failOffsetTime)).format(
              'mm',
            )}分钟后再试`,
          );
          return;
        }
        const { token } = yield AUTH.loginWithPasswordIsEncodeUsingPOST({ body: payload });
        yield put({
          type: 'systemParamsConfig/fetchConfigList',
        });
        localStorage.setItem('token', token);
        localStorage.setItem('loginType', 'normal');
        // 加载用户权限
        yield put({
          type: 'user/fetchCurrent',
          needCheck: false,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
        localStorage.removeItem('failLogin');
        localStorage.removeItem('failOffsetTime');
      } catch (e) {
        onError(e);
        const failLogin = localStorage.getItem('failLogin');
        const currentTime = new Date().getTime();
        try {
          const retryNum = Number(failLogin);
          if (retryNum === 0 || retryNum > retryTimes) {
            localStorage.setItem('failOffsetTime', currentTime);
            localStorage.setItem('failLogin', 1);
          } else {
            localStorage.setItem('failLogin', retryNum + 1);
          }
        } catch (e2) {
          localStorage.setItem('failOffsetTime', currentTime);
          localStorage.setItem('failLogin', 1);
        }
      }
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/login' && !redirect) {
        router.replace({
          name: 'login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
