/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { ArrowUpOutlined } from '@ant-design/icons';

function MoveUpAction({ onClick, disabled }) {
  return (
    <Tooltip title="上移节点" placement="left">
      <Button
        onClick={onClick}
        disabled={disabled}
        size="small"
        className={styles.btn}
        icon={<ArrowUpOutlined />}
      />
    </Tooltip>
  );
}

export default MoveUpAction;
