import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

function CardHoc({ children, title, className }) {
  return (
    <Card className={classNames(className)} title={title} hoverable bordered>
      {children}
    </Card>
  );
}

export default CardHoc;
