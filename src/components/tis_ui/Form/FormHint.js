import React from 'react';
import styles from './FormHint.less';

function FormHint({ text }) {
  return <div className={styles.formHint}>{text}</div>;
}

export default FormHint;
