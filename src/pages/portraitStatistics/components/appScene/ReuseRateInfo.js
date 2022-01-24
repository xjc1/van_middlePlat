import React from 'react';
import { Table } from 'antd';

function ReuseRateInfo({ reuseRateInfo = {} }) {
  const { reuseRateColumns = [], reuseRateDataSource = [] } = reuseRateInfo;
  return (
    <Table
      size="small"
      columns={reuseRateColumns}
      dataSource={reuseRateDataSource}
      pagination={false}
      rowKey="id"
    />
  );
}

export default ReuseRateInfo;
