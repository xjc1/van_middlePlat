import React, { useState, useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import styles from './pageLayout.less';
import Header from '@/layouts/PageLayout/Header';
import classNames from 'classnames';
import _ from 'lodash';
import { connect } from 'dva';

function BlankLayout(props) {
  const { children, mainPage, currentUser } = props;

  useEffect(() => {
    const { dispatch } = props;
    if (dispatch && !currentUser.username && localStorage.token) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  });

  const isLogin = (currentUser && currentUser.username) || localStorage.token;

  let content = (
    <div className={styles.page_layout}>
      <section className={styles.page_layout_content}>
        <Header visibelCollapsed={false} mainPage={mainPage} />
        <main>
          <div className={styles.fullPage}>
            <div className={styles.wide}>{children}</div>
          </div>
        </main>
      </section>
    </div>
  );

  if (!isLogin) {
    content = <Redirect to={`/login`}></Redirect>;
  }

  return content;
}

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
}))(BlankLayout);
