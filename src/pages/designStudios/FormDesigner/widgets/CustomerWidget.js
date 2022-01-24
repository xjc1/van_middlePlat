import React from 'react';
import CenterWrapper from '../units/CenterWrapper';
import Styles from '../units/index.less';

const CustomerWidget = React.memo(({ displayName = '自定义组件' }) => {
  return (
    <CenterWrapper>
      <div className={Styles.customerUnit}>{displayName}</div>
    </CenterWrapper>
  );
});

export default CustomerWidget;
