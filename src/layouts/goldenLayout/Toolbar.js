import React from 'react';
import Styles from './toolbar.less';

function Toolbar({ children }) {
  return <div className={Styles.goldenToolbarWrap}>{children}</div>;
}

export default Toolbar;
