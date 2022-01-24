import React from 'react';
import classNames from 'classnames';
import Styles from '../index.less';

function Index({ level = '', children, width, className }) {
  return (
    <div
      style={{ width }}
      className={classNames(
        Styles.detailPanel,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Index;
