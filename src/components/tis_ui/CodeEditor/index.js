/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import AceEditor from 'react-ace';
import classNames from 'classnames';
import Styles from './index.less';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

function Index({ width = '100%', height = '100%', className, disabled, ...others }) {
  return (
    <div className={classNames(Styles.CodeEditor, className)}>
      <AceEditor
        mode="javascript"
        theme="github"
        editorProps={{ $blockScrolling: true }}
        highlightActiveLine
        width={width}
        height={height}
        readOnly={disabled}
        setOptions={{
          useWorker: false,
        }}
        {...others}
      />
    </div>
  );
}

export default Index;
