import React from 'react';
import styles from './InfoItem.less';

function InfoItem({ title, children }) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoItemLabel}>{title}</div>
      <div className={styles.infoItemContent}>{children}</div>
    </div>
  );
}

export default InfoItem;
