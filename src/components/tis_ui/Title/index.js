/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classss from './index.less';

function Title({ children, styles }) {
  return (
    <div className={classss.title} styles={styles}>
      <p>{children}</p>
    </div>
  );
}

export default React.memo(Title);
