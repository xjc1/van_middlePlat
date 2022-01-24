/* eslint-disable import/no-extraneous-dependencies  */
import React from 'react';
import { Card, Divider } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

function FormCard({ title, className, children, ...others }) {
  return (
    <Card
      className={classNames(styles.formCard, className)}
      bodyStyle={{
        padding: 5,
      }}
      {...others}
    >
      <Divider orientation="left">
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </Divider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {children}
      </div>
    </Card>
  );
}

export default FormCard;
