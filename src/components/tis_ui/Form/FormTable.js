/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Table } from 'antd';

function FormTable({ value, ...others }) {
  return (
    <Table dataSource={value} {...others} />
  );
}

export default FormTable;
