import React, { useEffect, useState } from 'react';
import { TTable } from '@/components/tis_ui';
import { PORTRAIT } from '@/services/api';
import { notification } from 'antd';
import { Code2Name } from '@/utils/DictTools';

function CurrentReviewRecords({ columns = [], elementId, ...others }) {
  const [reviewRecords, setReviewRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentReviewRecord(elementId);
  }, []);

  async function getCurrentReviewRecord(id) {
    if (!id) return;
    setLoading(true);
    try {
      const list = await PORTRAIT.getCurrentRecordsUsingGET({ params: { id } });
      const { content = [], dictNames = {} } = await Code2Name(Promise.resolve({ content: list }), [
        'SHSSBMSH',
        'dept',
      ]);
      setReviewRecords(
        content.map(record => ({ ...record, department: dictNames.SHSSBMSH[record.dept] })),
      );
    } catch (e) {
      notification.error({
        message: `审核记录获取失败，${e.msg}`,
      });
    }
    setLoading(false);
  }

  return (
    <TTable
      bordered
      loading={loading}
      columns={columns}
      dataSource={reviewRecords}
      rowKey="id"
      {...others}
    />
  );
}

export default CurrentReviewRecords;
