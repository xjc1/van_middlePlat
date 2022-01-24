/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { NodeCollapseOutlined } from '@ant-design/icons';

function LocationNodeAction({ isSetting, onCancel }) {
  return (
    <Tooltip title="恢复到完整节点树视图" placement="left">
      <Button
        type="primary"
        disabled={!isSetting}
        onClick={onCancel}
        size="small"
        className={styles.btn}
        icon={<NodeCollapseOutlined />}
      />
    </Tooltip>
  );
}

export default LocationNodeAction;
