import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import loginStyles from './loginAssets/css/login.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
    dispatch,
    loginBackground,
    loginBackgroundUrl,
    systemName,
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  useEffect(() => {
    dispatch({
      type: 'systemParamsConfig/fetchTitle',
    });
    dispatch({
      type: 'systemParamsConfig/fetchImg',
    });
  }, []);
  return (
    <>
      <div
        style={{
          background: ` url(${loginBackgroundUrl ||
            loginBackground}) center center / 1620px 800px no-repeat #3299f5`,
          width: '100%',
          height: '100%',
        }}
      >
        <div className={loginStyles.loginTitle}>{systemName}</div>
        <div className={loginStyles.loginAll}>
          <div className={loginStyles.loginForm}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default connect(({ settings, systemParamsConfig }) => ({
  ...settings,
  systemName: _.get(systemParamsConfig, 'systemConfig.systemName'),
  loginBackground: _.get(systemParamsConfig, 'systemConfig.loginBackground'),
  loginBackgroundUrl: _.get(systemParamsConfig, 'systemConfig.loginBackgroundUrl'),
}))(UserLayout);
