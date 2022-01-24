import React from 'react';
import Styles from './index.less';

function CenterWrapper({ children }) {
  return <div className={Styles.centerWrapper}>{children}</div>;
}

export default CenterWrapper;
