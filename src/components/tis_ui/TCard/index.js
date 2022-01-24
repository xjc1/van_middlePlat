/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Card } from 'antd';
import styles from './index.less';
import classNames from 'classnames';

function Index({ tight, className, ...others }) {
  return <Card className={classNames(className, tight && styles.tightCard)} {...others} />;
}

export default Index;
