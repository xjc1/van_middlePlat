import React from 'react';
import Styles from '../index.less';

function Index({ children }) {
  return (
    <div className={Styles.designLayoutLeft}>
      {children}
    </div>
  );
}

export default Index;
