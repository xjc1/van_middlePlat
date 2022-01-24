/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Switch } from 'antd';

function Index({ value, ...others }) {
  return <Switch checked={value} {...others} />;
}

export default Index;
