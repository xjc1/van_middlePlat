import React from 'react';
import classNames from 'classnames';
import Styles from './index.less';

function DesignLayout({ className, children }) {
  return <div className={classNames(Styles.designLayout, className)}>{children}</div>;
}

export default DesignLayout;
