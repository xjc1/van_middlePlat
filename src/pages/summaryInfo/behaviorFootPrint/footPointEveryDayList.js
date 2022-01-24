import React from "react";
import { TTable, DateTools } from '@/components/tis_ui';

function footPointEveryDay({data}) {
  const columns = [
    {
      title: '日期',
      dataIndex: 'ymd',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '访问量',
      dataIndex: 'sum',
    },
  ];

  return(
    <TTable
      style={{ marginTop: 10 }}
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
      }}
      rowKey="ymd"
    />
  )
}

export default footPointEveryDay
