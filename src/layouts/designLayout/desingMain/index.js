import React from 'react';
import classNames from 'classnames';
import Styles from '../index.less';

function Index({ className, children }) {
  return <div className={classNames(Styles.designLayoutMain, className)}>{children}</div>;
}

export default Index;
