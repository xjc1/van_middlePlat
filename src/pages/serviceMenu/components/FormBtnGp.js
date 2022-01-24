import React from 'react';
import { Tooltip } from 'antd';
import router from '@/utils/tRouter';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { TButton } from '@/components/tis_ui';
import style from './formBtn.less';

function goBack() {
  router.goBack();
}

function FormBtnGp({
  onOk,
  okText = '提交',
  okIcon = <CheckOutlined />,
  onCancel = goBack,
  cancelText = '返回',
  cancelIcon = <RollbackOutlined />,
  disabled = false,
}) {
  return (
    <div className={style.formBtnGroup}>
      <Tooltip
          placement="left"
          title={okText}
      >
          <TButton.Button
              className={style.formBtnItem}
              type="primary"
              ghost={false}
              shape="circle"
              onClick={onOk}
              style={{
                  marginRight: 0,
                  display: disabled ? 'none' : 'block'
              }}
          >
              {okIcon}
          </TButton.Button>
      </Tooltip>
      <Tooltip placement="left" title={cancelText}>
          <TButton.Button
              className={style.formBtnItem}
              type="default"
              ghost={false}
              shape="circle"
              onClick={onCancel}
              style={{marginRight: 0}}
          >
              {cancelIcon}
          </TButton.Button>
      </Tooltip>
  </div>
  )
}

export default FormBtnGp;
