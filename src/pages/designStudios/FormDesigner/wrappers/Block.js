import React from 'react';
import Styles from './styles.less';
import classNames from 'classnames';

function BlockHoc({ children, title, className }) {
  return (
    <div className={classNames(Styles.frBlock, className)}>
      {title && <h1 className={Styles.frBlock_title}>{title}</h1>}
      {children}
    </div>
  );
}

export default BlockHoc;
