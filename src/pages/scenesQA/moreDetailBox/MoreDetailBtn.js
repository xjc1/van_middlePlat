import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import styles from '@/pages/scenesQA/scenesQA.less';
import { EyeOutlined, ExceptionOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { connect } from 'dva';

function MoreDetailBtn({ preView, dispatch }) {
  switch (preView) {
    case 'whole':
      return (
        <Tooltip title="细节查看" placement="left">
          <Button
            type="primary"
            size="small"
            className={styles.btn}
            onClick={() => {
              dispatch({
                type: 'scenesQA/setPreview',
                payload: 'no',
              });
            }}
            icon={<ExceptionOutlined />}
          />
        </Tooltip>
      );
    case 'simple':
    default:
      return (
        <Tooltip title="关闭细节查看" placement="left">
          <Button
            size="small"
            className={styles.btn}
            onClick={() => {
              dispatch({
                type: 'scenesQA/setPreview',
                payload: 'whole',
              });
            }}
            icon={<ExceptionOutlined />}
          />
        </Tooltip>
      );
  }
}

export default connect(({ scenesQA }) => ({ preView: scenesQA.preView }))(MoreDetailBtn);
