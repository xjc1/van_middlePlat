import React, { useRef, useState } from 'react';
import { Card, message, notification } from 'antd';
import _ from 'lodash';
import { OperateBar, TButton, utils } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import { portraitUpdateStatus } from '@/utils/constantEnum';
import SyncModalForm from './SyncModalForm';
import CommonTable from '../CommonTable';
import styles from '../../index.less';

const { IDGenerator } = utils;

function Index() {
  const [syncRecords, setSyncRecords] = useState([]);
  const tableRef = useRef();
  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
    },
    {
      title: '标签对象',
      dataIndex: 'objectType',
    },
    {
      title: '标签来源',
      dataIndex: 'source',
    },
    {
      title: '变更',
      dataIndex: 'type',
      render: type => portraitUpdateStatus.$v_names[type],
    },
    {
      title: '匹配用户数',
      dataIndex: 'matchers',
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => (
        <OperateBar>
          <OperateBar.Button onClick={() => setSyncRecords([record])}>同步</OperateBar.Button>
          <OperateBar.Button
            confirmText="提示"
            confirmContent="您确认不同步吗？"
            onClick={() => handleNotSync([record])}
          >
            不同步
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  async function fetchNotSyncList(params) {
    const syncTagIdGenerator = new IDGenerator('syncTag');
    try {
      const {
        content = [],
        totalElements: total,
        number: pageNum,
        size: pageSize,
        dictNames,
      } = await Code2Name(KERNEL.getNotSyncPortraitTagsUsingGET({ params }), [
        'DXLX0001',
        'object',
      ]);
      return {
        list: content.map(item => ({
          ...item,
          id: syncTagIdGenerator.next(),
          name: item.sourceTagName,
          objectType: dictNames.DXLX0001[item.object],
        })),
        total,
        pageNum,
        pageSize,
      };
    } catch (e) {
      message.error('获取列表失败');
    }
    return {};
  }

  function handleBatchOperate(isSync = true) {
    if (!tableRef.current) return;
    const { listInfo = {}, loading } = tableRef.current;
    if (loading) return;
    const { list = [] } = listInfo;

    if (!isSync) {
      handleNotSync(list);
      return;
    }

    setSyncRecords(list);
  }

  function handleSync(records) {
    KERNEL.syncPortraitTagUsingPOST({ body: records })
      .then(() => {
        notification.success({
          message: '成功开始同步',
        });
        tableRef.current.refresh();
      })
      .catch(e => {
        notification.error({
          message: `同步操作失败，${e.msg}`,
        });
      })
      .finally(() => setSyncRecords([]));
  }

  function handleNotSync(records) {
    KERNEL.notSyncPortraitTagUsingPOST({ body: records })
      .then(() => {
        notification.success({
          message: '操作成功',
        });
        tableRef.current.refresh();
      })
      .catch(() => {
        notification.error({
          message: '操作失败',
        });
      })
      .finally(() => setSyncRecords([]));
  }

  function handleSubmit(values = {}) {
    const { memo, repeat, remember, ...fields } = values;
    const syncTags = _.map(syncRecords, record => {
      const { object, deptCode, source, sourceTagCode, sourceTagName } = record;
      return {
        ...record,
        portraitTagId: fields[`${object}_${deptCode}_${source}_${sourceTagCode}_${sourceTagName}`],
      };
    });
    handleSync({ memo, repeat, remember: remember ? 1 : 0, syncConfigDto: syncTags });
  }

  return (
    <>
      <Card className={styles.actionBar}>
        <TButton.Button ghost type="primary" onClick={() => handleBatchOperate()}>
          同步当前页
        </TButton.Button>
        <TButton.Button
          danger
          confirmText="提示"
          confirmContent="您确认不同步当前页所有数据吗？"
          onClick={() => handleBatchOperate(false)}
        >
          不同步当前页
        </TButton.Button>
      </Card>
      <CommonTable ref={tableRef} columns={columns} request={fetchNotSyncList} />
      {syncRecords.length > 0 && (
        <SyncModalForm
          records={syncRecords}
          onClose={() => setSyncRecords([])}
          onOk={values => handleSubmit(values)}
        />
      )}
    </>
  );
}

export default Index;
