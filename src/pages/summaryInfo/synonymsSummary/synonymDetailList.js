import React from "react";
import { TTable, DateTools } from '@/components/tis_ui';

function synonymDetailList({data}) {
  const columns = [
    {
      title: '日期',
      dataIndex: 'ymd',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '总数',
      dataIndex: 'sum',
    },
    {
      title: '企业总数',
      dataIndex: 'personSum',
    },
    {
      title: '个人总数',
      dataIndex: 'companySum',
    },
    {
      title: '游客总数',
      dataIndex: 'visitorSum',
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

export default synonymDetailList
