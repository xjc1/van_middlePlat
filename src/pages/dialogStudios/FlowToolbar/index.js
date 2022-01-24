import React from 'react';
import { Divider, Tooltip, Button, Space } from 'antd';
import classNames from 'classnames';
import { BulbOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';
import { EmptyFn } from '@/components/tis_ui';
import { MANAGE_TYPE } from '../dailogConst';

const FlowToolbar = ({
                       activeBtn,
                       onTriggerMode = EmptyFn,
                       onSlot = EmptyFn,
                     }) => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="delete" />
    <Divider type="vertical" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="缩小" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="放大" />
    <ToolbarButton command="multiSelect" icon="multi-select" text="多选" />
    <ToolbarButton command="addGroup" icon="group" text="分组" />
    <ToolbarButton command="unGroup" icon="ungroup" text="移除分组" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="适配大小" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="重置大小" />
    <Divider type="vertical" />
    <div style={{ position: 'relative' }}>
      <div className={styles.toolbarBtnWrap}>
        <Space>
          <Tooltip title="触发方式" placement="bottom">
            <Button
              shape="circle"
              onClick={onTriggerMode}
              className={classNames(styles.toolbarBtn, activeBtn === MANAGE_TYPE.TRIGGER_MODE && styles.toolbarBtnActive)}
              icon={<BulbOutlined />}
              size="large"
            />
          </Tooltip>
          <Tooltip title="槽位" placement="bottom">
            <Button
              shape="circle"
              onClick={onSlot}
              className={classNames(styles.toolbarBtn, activeBtn === MANAGE_TYPE.SLOT && styles.toolbarBtnActive)}
              icon={<ApartmentOutlined />}
              size="large"
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  </Toolbar>
);

export default FlowToolbar;
