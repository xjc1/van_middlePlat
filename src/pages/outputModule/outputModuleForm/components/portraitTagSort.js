import React from 'react';
import { OperateBar } from '@/components/tis_ui';
import { Table, Modal, InputNumber } from 'antd';
import ArrayTools from '@/utils/ArrayTools';
import styles from '@/pages/displayPosition/index.less';
import { connect } from 'dva';
import { appUserType } from '@/utils/constantEnum';
import _ from 'lodash';

function PortraitTagSelect({ dispatch, focusItem = {}, setVisible, object, onSort }) {
  let data = [];
  if (object === appUserType.self) {
    data = focusItem.personalSortInfos || [];
  } else if (object === appUserType.legalPerson) {
    data = focusItem.legalSortInfos || [];
  }

  function setSortData(newData) {
    const afSortData = _.map(newData, (item, index) => ({ ...item, sort: index + 1 }));
    if (object === appUserType.self) {
      dispatch({
        type: 'outputModule/selectedItem',
        item: { ...focusItem, personalSortInfos: afSortData },
      });
    } else if (object === appUserType.legalPerson) {
      dispatch({
        type: 'outputModule/selectedItem',
        item: { ...focusItem, legalSortInfos: afSortData },
      });
    }
  }

  function toBottom(record, index) {
    if (index === data.length - 1) return;
    const newData = data.slice(0);
    newData.push(record);
    newData.splice(index, 1);
    setSortData(newData);
  }
  function toTop(record, index) {
    if (index === 0) return;
    const newData = data.slice(0);
    newData.unshift(record);
    newData.splice(index + 1, 1);
    setSortData(newData);
  }
  function toUP(index) {
    ArrayTools.upGo(data, index);
    setSortData([...data]);
  }
  function toDown(index) {
    ArrayTools.downGo(data, index);
    setSortData([...data]);
  }
  function handleJump(record = {}, order, index) {
    if (!order || !Number(order)) return;
    const jumpIndex = Number(order);
    if (jumpIndex === index + 1) return;
    if (jumpIndex === 1) toTop(record, index);
    else if (jumpIndex === data.length) toBottom(record, index);
    else {
      const array = data.slice(0);
      const isForward = jumpIndex < index + 1;
      const insertIndex = isForward ? jumpIndex - 1 : jumpIndex;
      array.splice(insertIndex, 0, record);
      const deleteIndex = isForward ? index + 1 : index;
      array.splice(deleteIndex, 1);
      setSortData(array);
    }
  }

  const rankColumn = [
    {
      title: '??????',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '????????????',
      dataIndex: 'name',
    },
    {
      title: '??????',
      dataIndex: 'tagId',
      render: (id, record, index) => (
        <OperateBar>
          <OperateBar.Button onClick={() => toTop(record, index)}>??????</OperateBar.Button>
          <OperateBar.Button onClick={() => toUP(index)}>??????</OperateBar.Button>
          <OperateBar.Button onClick={() => toDown(index)}>??????</OperateBar.Button>
          <OperateBar.Button onClick={() => toBottom(record, index)}>??????</OperateBar.Button>
          <OperateBar.Button>
            <div className={styles.customSort}>
              ?????????
              <InputNumber
                className={styles.customSortInput}
                min={1}
                max={data.length}
                onBlur={e => handleJump(record, e.target.value, index)}
                onPressEnter={e => handleJump(record, e.target.value, index)}
              />
              ???
            </div>
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];
  return (
    <div>
      <Modal
        width="60%"
        title="????????????"
        visible
        destroyOnClose
        onOk={() => {
          setVisible(false);
          onSort(data);
        }}
        onCancel={() => setVisible(false)}
      >
        <Table dataSource={data} columns={rankColumn} rowKey="name" size="small" key="name" />
      </Modal>
    </div>
  );
}
export default connect(({ outputModule }) => outputModule)(PortraitTagSelect);
