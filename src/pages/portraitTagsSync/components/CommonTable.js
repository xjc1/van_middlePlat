import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TTable } from '@/components/tis_ui';
import { message } from 'antd';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';

const defaultInfo = {
  list: [],
  total: 0,
  pageNum: 0,
  pageSize: 10,
};

const CommonTable = forwardRef(
  ({ columns = [], request = () => Promise.resolve(defaultInfo), ...others }, ref) => {
    const [loading, setLoading] = useState(false);
    const [listInfo, setListInfo] = useState(defaultInfo);
    const [safeExecute] = useUnmount();

    useImperativeHandle(ref, () => ({
      listInfo,
      loading,
      refresh: (params = {}) =>
        fetchList({ page: listInfo.pageNum, size: listInfo.pageSize, ...params }),
    }));

    useEffect(() => {
      fetchList({});
    }, []);

    async function fetchList({ page = defaultInfo.pageNum, size = defaultInfo.pageSize }) {
      setLoading(true);
      try {
        const res = await request({ page, size });
        const { list = [], total = 0, pageNum = 0, pageSize = 10 } = res;
        safeExecute(setListInfo)({
          list,
          total,
          pageNum,
          pageSize,
        });
      } catch (e) {
        message.error('获取列表失败');
      }
      setLoading(false);
    }

    return (
      <TTable
        loading={loading}
        columns={columns}
        dataSource={listInfo.list}
        pagination={{
          total: listInfo.total,
          current: listInfo.pageNum,
          pageSize: listInfo.pageSize,
          onChange: (page, size) => fetchList({ page, size }),
        }}
        rowKey="id"
        {...others}
      />
    );
  },
);

export default CommonTable;
