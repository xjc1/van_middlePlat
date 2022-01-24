/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import styles from "./index.less";
import classNames from "classnames";
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from "antd";

const searchicon = <SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />;

function TransportBox(props) {
  return (
    <div className={styles.transportBox}>
      <div className={classNames(styles.leftBox, styles.boxCard)}>
        <div className={styles.transportHeader}>
          <Row>
            <Col span={6} className={styles.headerTitle}>所有权限</Col>
            <Col span={18}><Input prefix={searchicon}/></Col>
          </Row>
        </div>
        <div className={styles.content}>
        </div>
      </div>
      <div className={styles.action}>
        <Button className={styles.actionBtn} icon={<LeftOutlined />}/>
        <Button icon={<RightOutlined />}/>
      </div>
      <div className={classNames(styles.rightBox, styles.boxCard)}>
        <div className={styles.transportHeader}>
          <Col span={6} className={styles.headerTitle}>拥有权限</Col>
          <Col span={18}><Input prefix={searchicon}
          /></Col>
        </div>
        <div className={styles.content}>

        </div>
      </div>
    </div>
  );
}

export default TransportBox;
