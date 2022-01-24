/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { ShrinkOutlined } from '@ant-design/icons';

function CollapseAllAction({ onClick }) {
  return (
    <Tooltip title="折叠全部" placement="left">
      <Button onClick={onClick} size="small" className={styles.btn} icon={<ShrinkOutlined />} />
    </Tooltip>
  );
}

export default CollapseAllAction;
