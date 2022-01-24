import React, { useState, useEffect } from 'react';
import { Popover, Input } from 'antd';
import { OperateBar } from '@/components/tis_ui';
import { BulbOutlined, BulbTwoTone } from '@ant-design/icons';
import Styles from './index.less';

function CheckPopover({ record }) {
  const { name, rule } = record;
  const [success, setSuccess] = useState(false);
  const [regx] = useState(new RegExp(rule));

  useEffect(() => {
    setSuccess(''.match(regx));
  }, []);

  return (
    <Popover
      content={
        <div style={{ textAlign: 'center' }}>
          <BulbTwoTone twoToneColor={success ? '#52c41a' : '#dddddd'} />
          <Input
            allowClear
            onChange={e => {
              setSuccess(e.target.value.match(regx));
            }}
          />
        </div>
      }
      title={<div className={Styles.checkPopTitle}>{name}</div>}
      trigger="click"
      getPopupContainer={triggerNode => triggerNode.parentElement}
    >
      <OperateBar.Button icon={<BulbOutlined />}>测试</OperateBar.Button>
    </Popover>
  );
}

export default CheckPopover;
