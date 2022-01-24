import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Menu, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import classNames from 'classnames';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
import Authorized from '@/utils/Authorized';
import Header from '@/layouts/PageLayout/Header';
import { getRouteAuthority } from '@/utils/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import getMenuData from './PageLayout/getMenuData';
import styles from './pageLayout.less';

function mapRoutes(data2 = [], result, parentPath = []) {
  _.forEach(data2, item => {
    const { path, routes, hideInMenu, redirect, fullScreen = false } = item;
    if (routes) {
      mapRoutes(routes, result, [path]);
    } else {
      if (hideInMenu || redirect) return;
      result.push({
        parentPath,
        fullScreen,
        currentPath: path,
      });
    }
  });
  return result;
}

function PageLayout({ children, route, collapsed, dispatch, location = { pathname: '/' } }) {
  console.log("-> route", route);
  const [currentPath, setCurrentPath] = useState();
  const [parentPath, setParentPath] = useState();
  const subKeys = _.split(location.pathname, '/');
  const [, mainPage] = subKeys;
  const { routes } = route;
  const [ref, inView] = useInView({ threshold: 0.5 });
  const authorized = getRouteAuthority(location.pathname || '/', route.routes) || '';
  const platRoutes = mapRoutes(routes, []);
  const currentRoute = _.findLast(
    platRoutes,
    // eslint-disable-next-line no-shadow
    ({ currentPath }) => currentPath && location.pathname.indexOf(currentPath) > -1,
  );


  useEffect(() => {
    const currPath = _.get(currentRoute, 'currentPath');
    const parPath = _.get(currentRoute, 'parentPath');
    setCurrentPath(currPath);
    setParentPath(parPath);
  }, [location]);
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.page_layout}>
        <section className={styles.page_layout_content}>
          <Header mainPage={mainPage} inViewRef={ref} routes={routes} />
          <main>
            {currentRoute && !currentRoute.fullScreen && (
              <aside className={classNames(collapsed && styles.collapsed)}>
                <Menu
                  selectedKeys={[currentPath]}
                  openKeys={parentPath}
                  onSelect={({ key }) => setCurrentPath(key)}
                  onOpenChange={keys => {
                    setParentPath(keys);
                  }}
                  mode="inline"
                  inlineCollapsed={collapsed}
                  style={{
                    paddingBottom: '39px',
                  }}
                  className={classNames(
                    styles.fixedMenu,
                    styles.innerboxScroll,
                    inView && styles.addPadding,
                  )}
                >
                  {getMenuData(routes)}
                  <div
                    className={classNames(styles.menuToggle, collapsed && styles.menuCollapsed)}
                    onClick={() => {
                      dispatch({ type: 'global/toggerCollapsed' });
                    }}
                  >
                    <span>
                      {collapsed ? (
                        <MenuUnfoldOutlined style={{ fontSize: 18 }} />
                      ) : (
                        <MenuFoldOutlined style={{ fontSize: 18 }} />
                      )}
                    </span>
                  </div>
                </Menu>
              </aside>
            )}
            <div className={styles.page}>
              <Authorized authority={authorized}>{children}</Authorized>
            </div>
          </main>
        </section>
      </div>
    </ConfigProvider>
  );
}

export default connect(({ global, user }) => ({
  collapsed: global.collapsed,
  subSystems: user.menus,
}))(PageLayout);
