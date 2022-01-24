import React from 'react';
import classNames from 'classnames';
import styles from '../PageLayout/layout.less';

const Index = props => {
  const { left, right } = props;
  return (
    <div className={styles.twoGridPage}>
      <div className={classNames(styles.leftThree, styles.antCover)}>{left}</div>
      <div className={classNames(styles.rightGrid, styles.antCover)}>{right}</div>
    </div>
  );
};

export default Index;
