/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { MenuFoldOutlined } from '@ant-design/icons';

function CollapseOthersAction({ onClick, disabled }) {
  return (
    <Tooltip title="折叠其他,保留当前选中节点" placement="left">
      <Button
        onClick={onClick}
        disabled={disabled}
        size="small"
        className={styles.btn}
        icon={<MenuFoldOutlined />}
      />
    </Tooltip>
  );
}

export default CollapseOthersAction;
