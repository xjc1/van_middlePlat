import React from 'react';
import { TabForm } from '@/components/tis_ui';
import { Table, Form } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const columns = [
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
  {
    title: '用户',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '时间',
    dataIndex: 'operateTime',
    key: 'operateTime',
  },
];

function HistoryTable({ value }) {
  return <Table columns={columns} dataSource={value} />;
}

function RelativeInfo(props) {
  return (
    <TabForm.Tab {...props}>
      <Form.Item name="editHistory" label="编辑历史" {...layout}>
        <HistoryTable />
      </Form.Item>
    </TabForm.Tab>
  );
}

export default RelativeInfo;
