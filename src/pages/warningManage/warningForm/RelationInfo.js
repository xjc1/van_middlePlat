import { TItem, TTable } from '@/components/tis_ui';
import React, { useEffect, useState } from 'react';
import { PUSHHISTORY } from "@/services/api";
import { messageHistoryType } from "@/utils/constantEnum";

function RelationInfo({ formData }) {
  const [page, setPage] = useState(0);
  const [history, setHistory] = useState({ size: 10, total: 0, data: [] });

  useEffect(() => {
    PUSHHISTORY.getPushHistoryUsingPOST({
      params: { page, size: history.size },
      body: { id: formData.id }
    }).then(({ content: data = [], totalElements: total }) => {
      setHistory({ ...history, total, data });
    });
  }, [page]);

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
      <TItem label="编辑历史">
        <TTable
          columns={editHistory}
          dataSource={formData.editHistory || []}
          rowKey="operateTime"
        />
      </TItem>
      <TItem label="发送历史">
        <TTable columns={[
          {
            title: '时间',
            dataIndex: 'date',
          },
          {
            title: '用户数',
            dataIndex: 'count',
          },
        ]}
                dataSource={history.data}
                pagination={{
                  total: history.total,
                  pageSize: history.size,
                  current: page,
                  onChange: nextPage => {
                    setPage(nextPage);
                  },
                }}
                rowKey="date" />
      </TItem>
    </>
  );
}

export default RelationInfo;
