import React from 'react';
import Styles from './index.less';
import { connect } from 'dva';

function Index({ dispatch }) {
  return <div className={Styles.formOrderPanel}>dfff</div>;
}

export default connect(({ formDesigner }) => {
  return { selectedItem: formDesigner.selectedItem };
})(Index);
