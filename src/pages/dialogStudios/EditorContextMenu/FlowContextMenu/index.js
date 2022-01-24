import React from 'react';
import { Command, ContextMenu, EdgeMenu, GroupMenu, NodeMenu } from 'gg-editor';
import { connect } from 'dva';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import Styles from '../index.less';
import IconFont from '../../common/IconFont';

const upperFirst = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (l) => l.toUpperCase());
const MenuItem = (props) => {
  const { command, icon, text } = props;
  return (
    <Command name={command}>
      <div className={Styles.item}>
        <IconFont type={`icon-${icon || command}`} />
        <span>{text || upperFirst(command)}</span>
      </div>
    </Command>
  );
};

const FlowContextMenu = ({ dispatch }) => (
  <ContextMenu className={Styles.contextMenu}>
    <NodeMenu>
        <div className={Styles.contextMenuBtn}
             onClick={() => {
               dispatch({
                 type: 'dialogStudios/copyNode'
               });
             }}>
          <CopyOutlined />
          <span className={Styles.contextMenuText}>复制</span>
        </div>
      <MenuItem command="delete" text="删除" />
    </NodeMenu>
    <EdgeMenu>
      <MenuItem command="delete" text="删除" />
    </EdgeMenu>
    <GroupMenu>
      <div className={Styles.contextMenuBtn}
           onClick={() => {
             dispatch({
               type: 'dialogStudios/copyNode'
             });
           }}>
        <CopyOutlined />
        <span className={Styles.contextMenuText}>复制分组</span>
      </div>
      <div className={Styles.contextMenuBtn}
           onClick={() => {
             dispatch({
               type: 'dialogStudios/removeGroup'
             });
           }}>
        <DeleteOutlined />
        <span className={Styles.contextMenuText}>删除分组</span>
      </div>
      <MenuItem command="unGroup" icon="ungroup" text="移除分组" />
    </GroupMenu>
  </ContextMenu>
);

export default connect(({ dialogStudios }) => {
  return dialogStudios;
})(FlowContextMenu);
