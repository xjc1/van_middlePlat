import React from 'react';
import {
  EditOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import Styles from '../EditorItemPanel/settingPanel.less';
import { EmptyFn } from '@/components/tis_ui';
import IntentsTable from "../categoryTables/IntentsTable";
import RulesManageTable from "@/pages/dialogStudios/categoryTables/RulesManageTable";

function Index({
                 theme,
                 onClose = EmptyFn,
                 onEditIntent = EmptyFn,
                 onEditRule = EmptyFn,
               }) {
  return (
    <div className={classNames(Styles.settingPanel, theme && `${Styles.settingPanel}-${theme}`)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          触发方式管理
        </span>
        <span>
          <CloseOutlined onClick={onClose} />
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <IntentsTable onEdit={onEditIntent} title="意图管理" />
        <RulesManageTable onEdit={onEditRule} title="规则管理" />
      </div>
    </div>
  );
}

export default Index;
