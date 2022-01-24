import React, { useEffect, useState } from 'react';
import { TTable } from '@/components/tis_ui';
import { PORTRAIT } from '@/services/api';
import { notification } from 'antd';
import { Code2Name } from '@/utils/DictTools';

const defaultListInfo = {
  list: [],
  total: 0,
  pageNum: 0,
  pageSize: 10,
};

function HistoryReviewRecords({ columns = [], reviewIds = [], ...others }) {
  const [reviewListInfo, setReviewListInfo] = useState(defaultListInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistoryReviewRecords({});
  }, []);

  async function getHistoryReviewRecords({ page = 0, size = defaultListInfo.pageSize }) {
    if (!reviewIds.length) return;
    setLoading(true);
    try {
      const {
        content = [],
        totalElements: total,
        number: pageNum,
        size: pageSize,
        dictNames = {},
      } = await Code2Name(
        PORTRAIT.getHistoryRecordsUsingPOST({
          params: { page, size },
          body: reviewIds,
        }),
        ['SHSSBMSH', 'dept'],
      );
      setReviewListInfo({
        list: content.map(record => ({ ...record, department: dictNames.SHSSBMSH[record.dept] })),
        total,
        pageNum,
        pageSize,
      });
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
      dataSource={reviewListInfo.list}
      pagination={{
        current: reviewListInfo.pageNum,
        total: reviewListInfo.total,
        onChange: page => getHistoryReviewRecords({ page }),
      }}
      rowKey="id"
      {...others}
    />
  );
}

export default HistoryReviewRecords;
