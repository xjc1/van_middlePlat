/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { NodeExpandOutlined } from '@ant-design/icons';

function LocationNodeAction({ disabled, onLocation }) {
  return (
    <Tooltip title="只看当前节点以下的内容" placement="left">
      <Button
        disabled={disabled}
        onClick={onLocation}
        size="small"
        className={styles.btn}
        icon={<NodeExpandOutlined />}
      />
    </Tooltip>
  );
}

export default LocationNodeAction;
