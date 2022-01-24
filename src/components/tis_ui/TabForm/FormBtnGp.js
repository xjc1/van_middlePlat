import React from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import TButton from '../TButton';
import EventCenter from '../utils/EventCenter';
import EmptyFn from '../utils/EmptyFn';
import style from './tabForm.less';

function goBack() {
  EventCenter.emit('goBack');
}

function FormBtnGp({
  onOk = EmptyFn,
  okText = '提交',
  okIcon = <CheckOutlined />,
  okType = 'button',
  onCancel = goBack,
  cancelText = '返回',
  cancelIcon = <RollbackOutlined />,
  disabled = false,
}) {
  return (
    <div className={style.formBtnGroup}>
      <Tooltip placement="left" title={okText}>
        <TButton.Button
          className={style.formBtnItem}
          type="primary"
          htmlType={okType}
          ghost={false}
          shape="circle"
          onClick={onOk}
          style={{
            marginRight: 0,
            display: disabled ? 'none' : 'block',
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
          style={{ marginRight: 0 }}
        >
          {cancelIcon}
        </TButton.Button>
      </Tooltip>
    </div>
  );
}

FormBtnGp.propTypes = {
  /** 确认按钮事件 */
  onOk: PropTypes.func,
  /** 确认按钮文本 */
  okText: PropTypes.string,
  /** 确认按钮图标 */
  okIcon: PropTypes.any,
  /** 确认按钮 `htmlType` */
  okType: PropTypes.string,
  /** 取消按钮事件 */
  onCancel: PropTypes.func,
  /** 取消按钮文本 */
  cancelText: PropTypes.string,
  /** 取消按钮图标 */
  cancelIcon: PropTypes.any,
  /** 隐藏确认按钮 */
  disabled: PropTypes.bool,
};

export default FormBtnGp;
