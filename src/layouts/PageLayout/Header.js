import React, { useState } from 'react';
import { TButton, OperateBar, EventCenter } from '@/components/tis_ui';
import styles from '@/layouts/pageLayout.less';
import _ from 'lodash';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import LegacyIcon from '@/utils/typeToIcon';
import { Avatar, Dropdown, Menu, Modal, Form, Tag } from 'antd';
import Link from 'umi/link';
import logo from '@/assets/logo.png';
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import Config from '@/utils/config';
import UserInfo from '@/pages/userInfo';
import DownloadOM from '@/pages/operatingManual/components/DownloadOM';
import { adaptText } from "@/utils/AdaptiveHelper";

const { currentRoutes } = require('../../../scripts/cook/project/Setting');

const style = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

function Header({ dispatch, currentUser, mainPage, inViewRef, version = {}, systemName }) {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [operatingManual, setOperatingManual] = useState(false);
  const { dept: { departmentName = '' } = { dept: { departmentName: '' } } } = currentUser;
  let { javaVersion = '', qaVersion = '' } = version;
  if (typeof javaVersion !== 'string') {
    javaVersion = JSON.stringify(javaVersion);
  }
  if (typeof qaVersion !== 'string') {
    qaVersion = JSON.stringify(qaVersion);
  }
  const getVersion = () => {
    setAboutVisible(true);
    dispatch({
      type: 'global/getVersion',
    });
  };

  const getUserInfo = () => {
    dispatch({
      type: 'user/fetchCurrent',
    });
  };

  const getPasswordConfig = () => {
    // 获取强密码配置
    dispatch({
      type: 'systemParamsConfig/fetchConfig',
      code: 'loginValidation'
    })
  };

  const menu = (
    <Menu>
      <Menu.Item key="about">
        <TButton.Button
          type="link"
          ghost={false}
          onClick={() => {
            setAboutVisible(true);
            getVersion();
          }}
        >
          关于
        </TButton.Button>
      </Menu.Item>
      <Menu.Item key="info">
        <TButton.Button
          type="link"
          ghost={false}
          onClick={() => {
            getUserInfo();
            setUserInfo(true);
            getPasswordConfig();
          }}
        >
          个人设置
        </TButton.Button>
      </Menu.Item>
      <OperateBar.Divider />
      <Menu.Item key="logout">
        <TButton.Button
          type="link"
          ghost={false}
          confirmText="提示"
          confirmContent="确定是否退出？"
          onClick={() => {
            EventCenter.emit('401');
         }}
          style={{ color: 'red' }}
        >
          退出
        </TButton.Button>
      </Menu.Item>
    </Menu>
  );

  const headerRoutes = currentRoutes.filter(
    it => it.header && Authorized.check(it.authority, it, null),
  );

  const renderHeader = routeData =>
    routeData.map(item => {
      const { path = '/', name, icon } = item;
      const [s, pathKey] = path.split('/');
      return (
        <Menu.Item key={pathKey}>
          <Link to={path}>
            <LegacyIcon type={icon} />
            {name}
          </Link>
        </Menu.Item>
      );
    });

  return (
    <header className={styles.light} ref={inViewRef}>
      <div className={styles.nav_header}>
        <div className={styles.nav_header_left}>
          <div className={styles.nav_logo}>
            <img
              alt="logo"
              src={logo}
              style={{
                width: 64,
                height: 64,
                transform: 'scale(1.8)',
              }}
            />
            <h1>
              {systemName}
              <div className={styles.headerTag}>{departmentName}</div>
            </h1>
          </div>
        </div>
        <div className={styles.nav_header_menu}>
          <Menu mode="horizontal" className={styles.top_nav_header_menu} selectedKeys={[mainPage]}>
            {renderHeader(headerRoutes)}
          </Menu>
        </div>
        <div className={styles.nav_header_mine}>
          <div style={{ paddingRight: 8 }}>
            <div className={styles.nav_header_action}>
              <BookOutlined
                style={{ fontSize: '24px', verticalAlign: 'middle', cursor: 'pointer' }}
                title={adaptText('产品手册')}
                onClick={() => setOperatingManual(true)}
              />
              <Dropdown overlay={menu}>
                <span className={styles.header_action}>
                  <Avatar className={styles.avatar_img} size="small" icon={<UserOutlined />} />{' '}
                  <span>{currentUser.username}</span>
                </span>
              </Dropdown>
              <Modal
                title="关于"
                visible={aboutVisible}
                cancelText="取消"
                width="500px"
                onCancel={() => setAboutVisible(false)}
                maskClosable={false}
                footer={null}
              >
                <Form.Item style={{ height: '5px' }} label="运营工具前台版本号" {...style}>
                  <Tag color="blue" key={0} className={styles.aboutTag}>
                    {Config.version}
                  </Tag>
                </Form.Item>
                <br />
                <Form.Item style={{ height: '5px' }} label="运营工具后台版本号" {...style}>
                  <Tag color="blue" key={1} className={styles.aboutTag}>
                    {javaVersion}
                  </Tag>
                </Form.Item>
                <br />
                <Form.Item style={{ height: '5px' }} label="AI智能平台版本号" {...style}>
                  <Tag color="blue" key={2} className={styles.aboutTag}>
                    {qaVersion}
                  </Tag>
                </Form.Item>
              </Modal>

              <Modal
                title="个人设置"
                visible={userInfo}
                cancelText="取消"
                width="600px"
                onCancel={() => setUserInfo(false)}
                maskClosable={false}
                footer={null}
              >
                <UserInfo handleCancel={() => setUserInfo(false)} />
              </Modal>

              {operatingManual && (
                <DownloadOM key="operatingManual" finish={() => setOperatingManual(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default connect(({ global, user, settings, systemParamsConfig }) => ({
  ...settings,
  currentUser: user.currentUser,
  systemName: _.get(systemParamsConfig, 'systemConfig.systemName'),
  collapsed: global.collapsed,
  version: global.version,
}))(Header);
