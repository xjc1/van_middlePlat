import React from 'react';
import {
  EditOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import Styles from '../EditorItemPanel/settingPanel.less';
import { EmptyFn } from '@/components/tis_ui';
import IntentsTable from "./IntentsTable";


function Index({
                 theme,
                 onClose = EmptyFn,
                 onEditIntent = EmptyFn,
               }) {
  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          意图管理
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <IntentsTable onEditIntent={onEditIntent} />
      </div>
    </div>
  );
}

export default Index;
