import React from 'react';
import { TItem, FormTable } from '@/components/tis_ui';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function RelationInfo() {

  const editHistory = [
    {
      title: '操作',
      dataIndex: 'operation',
    },
    {
      title: '用户',
      dataIndex: 'operator',
    },
    {
      title: '时间',
      dataIndex: 'operateTime',
    },
  ];
  return (
    <>
      <TItem label="编辑历史" name="editHistory" {...layout}>
        <FormTable columns={editHistory}
                   rowKey="operateTime"
        />
      </TItem>
    </>
  );
}

export default RelationInfo;
