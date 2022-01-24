import React, { useEffect, useState } from 'react';
import { EmptyFn, TButton, TTable } from '@/components/tis_ui';
import { Modal, InputNumber, message } from 'antd';
import classnames from 'classnames';
import styles from '../../index.less';
import { KERNEL } from '@/services/api';

function SortDisplayPosition({ recordInfo = {}, onCancel = EmptyFn }) {
  const [dataSource, setDataSource] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns = [
    {
      title: '排序',
      dataIndex: 'order',
      align: 'center',
      width: '10%',
      render: order => order + 1,
    },
    {
      title: '标签分类',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '操作',
      width: 350,
      align: 'center',
      render: record => (
        <div className={styles.sortOperations}>
          <TButton.Button
            className={classnames(styles.sortOperationsItem, {
              [styles.sortOperationDisabled]: record.order === 0,
            })}
            type="link"
            ghost={false}
            onClick={() => handleTop(record)}
          >
            置顶
          </TButton.Button>
          <TButton.Button
            className={classnames(styles.sortOperationsItem, {
              [styles.sortOperationDisabled]: record.order === 0,
            })}
            type="link"
            ghost={false}
            onClick={() => handleMoveUp(record)}
          >
            上移
          </TButton.Button>
          <TButton.Button
            className={classnames(styles.sortOperationsItem, {
              [styles.sortOperationDisabled]: record.order === dataSource.length - 1,
            })}
            type="link"
            ghost={false}
            onClick={() => handleMoveDown(record)}
          >
            下移
          </TButton.Button>
          <TButton.Button
            className={classnames(styles.sortOperationsItem, {
              [styles.sortOperationDisabled]: record.order === dataSource.length - 1,
            })}
            type="link"
            ghost={false}
            onClick={() => handleBottom(record)}
          >
            置底
          </TButton.Button>
          <div className={styles.customSort}>
            移至第
            <InputNumber
              className={styles.customSortInput}
              min={1}
              max={dataSource.length}
              onBlur={e => handleJump(record, e.target.value)}
              onPressEnter={e => handleJump(record, e.target.value)}
            />
            位
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoadingList(true);
    KERNEL.getTagSortByPositionNameUsingGET(recordInfo.id)
      .then(res => {
        const { sortInfo = [] } = res;
        setDataSource(sortInfo.map((item, index) => ({ ...item, order: index })));
      })
      .finally(() => setLoadingList(false));
  }, []);

  function handleTop(record) {
    if (record.order === 0) return;
    const list = dataSource.slice(0);
    list.unshift(record);
    list.splice(record.order + 1, 1);
    setDataSource(list.map((item, index) => ({ ...item, order: index })));
  }

  function handleMoveUp(record = {}) {
    const { order } = record;
    if (order === 0) return;
    const prevIndex = order - 1;
    setDataSource([
      ...dataSource.slice(0, prevIndex),
      { ...record, order: prevIndex },
      { ...dataSource[prevIndex], order },
      ...dataSource.slice(order + 1),
    ]);
  }

  function handleMoveDown(record = {}) {
    const { order } = record;
    if (order === dataSource.length - 1) return;
    const nextIndex = order + 1;
    setDataSource([
      ...dataSource.slice(0, order),
      { ...dataSource[nextIndex], order },
      { ...record, order: nextIndex },
      ...dataSource.slice(nextIndex + 1),
    ]);
  }

  function handleBottom(record = {}) {
    if (record.order === dataSource.length - 1) return;
    const list = dataSource.slice(0);
    list.push(record);
    list.splice(record.order, 1);
    setDataSource(list.map((item, index) => ({ ...item, order: index })));
  }

  function handleJump(record = {}, order) {
    if (!order || !Number(order)) return;
    const jumpIndex = Number(order);
    if (jumpIndex === record.order + 1) return;
    if (jumpIndex === 1) handleTop(record);
    else if (jumpIndex === dataSource.length - 1) handleBottom(record);
    else {
      const list = dataSource.slice(0);
      const isForward = jumpIndex < record.order + 1;
      const insertIndex = isForward ? jumpIndex - 1 : jumpIndex;
      list.splice(insertIndex, 0, { ...record, order: insertIndex });
      const deleteIndex = isForward ? record.order + 1 : record.order;
      list.splice(deleteIndex, 1);
      setDataSource(list.map((item, index) => ({ ...item, order: index })));
    }
  }

  function handleConfirm() {
    setConfirmLoading(true);
    KERNEL.updateDisplayPositionUsingPOST({
      body: {
        ...recordInfo,
        sortInfo: dataSource.map(item => ({ ...item, sort: item.order })),
      },
    })
      .then(() => {
        message.success('更新成功');
        onCancel();
      })
      .catch(() => {
        message.error('更新失败');
      })
      .finally(() => setConfirmLoading(false));
  }

  return (
    <Modal
      title="修改排序"
      className={styles.sortDisplayPosition}
      visible
      width="60%"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleConfirm}
    >
      <div className={styles.displayPositionTitle}>展示位名称：{recordInfo.name}</div>
      <TTable
        columns={columns}
        loading={loadingList}
        dataSource={dataSource}
        rowKey={record => record.name + record.order}
        pagination={{ size: 'small' }}
      />
    </Modal>
  );
}

export default SortDisplayPosition;
