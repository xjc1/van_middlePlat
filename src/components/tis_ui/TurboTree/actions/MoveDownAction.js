/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { ArrowDownOutlined } from '@ant-design/icons';

function MoveDownAction({ onClick, disabled }) {
  return (
    <Tooltip title="下移节点" placement="left">
      <Button
        onClick={onClick}
        disabled={disabled}
        size="small"
        className={styles.btn}
        icon={<ArrowDownOutlined />}
      />
    </Tooltip>
  );
}

export default MoveDownAction;
