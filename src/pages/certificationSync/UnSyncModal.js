import React from 'react';
import { Table } from "antd";
import { EmptyFn } from "@/components/tis_ui";

function UnSyncModal({ data }) {
  return (
    <Table columns={[
      {
        title: '变更',
        dataIndex: 'status',
      },
      {
        title: '未同步数',
        dataIndex: 'num',
      },
    ]} dataSource={data} />
  );
}

export default UnSyncModal;
