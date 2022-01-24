import React from 'react';
import { Divider } from 'antd';
import Styles from './GoldenToolbar.less';

function GoldenToolbarDivider(props) {
  return <Divider type="vertical" className={Styles.goldenToolbarDividerVertical} />;
}

export default GoldenToolbarDivider;
