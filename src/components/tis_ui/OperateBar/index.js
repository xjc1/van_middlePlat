/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { confirmAble } from '../TButton';
import Styles from './index.less';

// type 无效
function OperateButton({
                         onClick,
                         type,
                         confirmText,
                         confirmContent,
                         onCancel,
                         className,
                         disabled = false,
                         okType = 'danger',
                         ...others
                       }) {
  return (
    <Button
      type="link"
      className={classNames(
        Styles.operateBarButton,
        disabled && Styles.operateBarButtonDisabled,
        className,
      )}
      onClick={confirmAble({ confirmText, confirmContent, okType, onClick, onCancel })}
      disabled={disabled}
      {...others}
    />
  );
}

function Index({ more = { props: { children: undefined } }, children }) {
  const {
    props: { children: moreChildren },
  } = more;
  return (
    <div>
      {children}
      {moreChildren && (
        <Dropdown
          overlay={
            <Menu>
              {React.Children.map(moreChildren, action => {
                if (action && action.type === OperateButton) {
                  return <Menu.Item>{action}</Menu.Item>;
                }
                return action;
              })}
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多 <DownOutlined />
          </a>
        </Dropdown>
      )}
    </div>
  );
}

Index.Button = OperateButton;
Index.Divider = Menu.Divider;

export default Index;
