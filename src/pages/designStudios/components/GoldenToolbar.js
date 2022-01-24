import React from 'react';
import GoldenToolbarDivider from './GoldenToolbarDivider';
import Styles from './GoldenToolbar.less';

function GoldenToolbar({ children }) {
  return <div className={Styles.goldenToolbarFull}>{children}</div>;
}

GoldenToolbar.Divider = GoldenToolbarDivider;

export default GoldenToolbar;
