import React, { useContext } from 'react';
import classNames from 'classnames';
import DesignToolbar from './index';
import Styles from '../index.less';

function DesignPanel({ name, icon, className, contentClassName, children }) {
  const { activePanel, setActivePanel } = useContext(DesignToolbar.CTX);
  return (
    <div
      className={classNames(
        Styles.designLayoutToolbarPanel,
        activePanel === name && Styles.designLayoutToolbarPanelActive,
        className,
      )}
    >
      <div
        className={Styles.designLayoutToolbarPanelIcon}
        onClick={() => {
          setActivePanel(activePanel === name ? undefined : name);
        }}
      >
        {icon}
      </div>
      <div className={classNames(contentClassName, Styles.designLayoutToolbarPanelContent)}>
        {children}
      </div>
    </div>
  );
}

export default DesignPanel;
