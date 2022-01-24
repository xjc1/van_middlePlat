import React, { useState } from 'react';
import { CodeEditor } from '@/components/tis_ui';
import { connect } from 'dva';
import Styles from './index.less';

function Index({ context, dispatch }) {
  const [nextValue, setNextValue] = useState(context);
  console.log('-> nextValue', nextValue);
  return (
    <div className={Styles.ctxPanel}>
      <CodeEditor
        mode="json"
        name="CONTEXT_PANEL"
        showGutter={false}
        value={nextValue}
        style={{ flex: 1 }}
        onChange={nextContext => {
          setNextValue(nextContext);
        }}
      />
    </div>
  );
}

export default connect(({ formDesigner }) => {
  return {
    context: formDesigner.context,
  };
})(Index);
