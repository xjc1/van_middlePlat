/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { ArrowsAltOutlined } from '@ant-design/icons';

function ExpandAllAction({ onClick }) {
  return (
    <Tooltip title="展开全部" placement="left">
      <Button size="small" className={styles.btn} onClick={onClick} icon={<ArrowsAltOutlined />} />
    </Tooltip>
  );
}

export default ExpandAllAction;
