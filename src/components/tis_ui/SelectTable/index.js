/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import _ from 'lodash';
import TTable from '../TTable';
import EmptyFn from '../utils/EmptyFn';

function Index({ onChange = EmptyFn, rowKey = 'key', ...others }) {
  const [totalSelectedRecords, setTotalSelectedRecords] = useState([]);

  useEffect(() => {
    const keys = totalSelectedRecords.map(item => item[rowKey]);
    onChange(keys, totalSelectedRecords);
  }, [totalSelectedRecords.length]);

  function clearSelected() {
    setTotalSelectedRecords([]);
  }

  function handleSelectedRecordsChange(keys, records) {
    const UniqRecords = _.uniqBy([...totalSelectedRecords, ...records.filter(Boolean)], rowKey);
    setTotalSelectedRecords(UniqRecords.filter(item => keys.includes(item[rowKey])));
  }

  const hasSelected = totalSelectedRecords.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={clearSelected} disabled={!hasSelected}>
          重置
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected && `已选 ${totalSelectedRecords.length} 条数据`}
        </span>
      </div>
      <TTable
        size="small"
        bordered
        rowSelection={{
          selectedRowKeys: totalSelectedRecords.map(item => item[rowKey]),
          onChange: handleSelectedRecordsChange,
        }}
        rowKey={rowKey}
        {...others}
      />
    </div>
  );
}

Index.propTypes = {
  /** 变化事件, 选择时触发, 与 `antd` `Table` 组件中 `rowSelection` 属性的 `onChange` 一样 */
  onChange: PropTypes.func.isRequired,
};

export default Index;
