import React, { useState } from 'react';
import { DateTools, utils } from '@/components/tis_ui';
import { CORE } from '@/services/api';
import { message } from 'antd';
import { commonSyncRecordsType, commonSyncStatus } from '@/utils/constantEnum';
import CommonTable from '../CommonTable';
import SyncDetailModal from './SyncDetailModal';

const { IDGenerator } = utils;

const syncRecordIdGen = new IDGenerator('syncTagRecord');

function Index() {
  const [syncDetail, setSyncDetail] = useState(null);
  const columns = [
    {
      title: '同步状态',
      dataIndex: 'status',
      render: status => commonSyncStatus.$v_names[status],
    },
    {
      title: '已同步数',
      dataIndex: 'total',
    },
    {
      title: '未同步数',
      dataIndex: 'notSync',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: timeStr => DateTools.transformDefaultFormat(timeStr),
    },
    {
      title: '操作人员',
      dataIndex: 'operator',
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      render: record => <a onClick={() => handleViewDetail(record)}>查看详情</a>,
    },
  ];

  async function fetchNotSyncList(params) {
    try {
      const {
        content = [],
        totalElements: total,
        number: pageNum,
        size: pageSize,
      } = await CORE.listDataSyncRecordUsingGET({
        params: {
          ...params,
          syncType: commonSyncRecordsType.PORTRAIT_TAG,
        },
      });
      return {
        list: content.map(item => ({ ...item, startTime: item.btime, endTime: item.etime })),
        total,
        pageNum,
        pageSize,
      };
    } catch (e) {
      message.error('获取列表失败');
    }
    return {};
  }

  function handleViewDetail(record = {}) {
    const { portraitTagSyncRecords = [], memo } = record;
    setSyncDetail({
      dataSource: portraitTagSyncRecords.map(tag => ({ ...tag, id: syncRecordIdGen.next() })),
      memo,
    });
  }

  return (
    <>
      <CommonTable columns={columns} request={fetchNotSyncList} />
      {syncDetail && (
        <SyncDetailModal
          dataSource={syncDetail.dataSource}
          memo={syncDetail.memo}
          onClose={() => setSyncDetail(null)}
        />
      )}
    </>
  );
}

export default Index;
