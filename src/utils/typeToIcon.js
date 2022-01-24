import * as AllIcon from '@ant-design/icons';
import React from 'react';

// 渲染图标

const renderIcon = ({ type }) => {
  const Icon = AllIcon[type];
  return Icon ? <Icon /> : <></>;
};

export default renderIcon;
