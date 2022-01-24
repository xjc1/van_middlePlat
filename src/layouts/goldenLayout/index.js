import React from 'react';
import Styles from './golden.less';
import classNames from 'classnames';

function Index({ fullScreen, children }) {
  return (
    <div className={classNames(Styles.goldenCanvas, fullScreen && Styles.fullScreen)}>
      {children}
    </div>
  );
}

export default Index;
