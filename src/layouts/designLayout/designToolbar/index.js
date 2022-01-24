import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import DesignPanel from './designPanel';
import Styles from '@/layouts/designLayout/index.less';

const ToolbarCtx = createContext();

function DesignToolbar({ className, children }) {
  const [activePanel, setActivePanel] = useState();

  return (
    <div className={classNames(Styles.designLayoutToolbar, className)}>
      <ToolbarCtx.Provider value={{ activePanel, setActivePanel }}>{children}</ToolbarCtx.Provider>
    </div>
  );
}

DesignToolbar.Panel = DesignPanel;
DesignToolbar.CTX = ToolbarCtx;

export default DesignToolbar;
