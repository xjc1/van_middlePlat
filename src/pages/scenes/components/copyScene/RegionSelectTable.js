import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { DICT } from '@/services/api';

function RegionSelectTable({ onChange, value = [] }) {
  const [regionsList, setRegionsList] = useState([]);
  const [wordFilter, setWordFilter] = useState();
  const [selectedKeys, setSelectedKeys] = useState(value.map(({ code }) => code));
  useEffect(() => {
    getRegions('SH00XZQH');
  }, []);
  useEffect(() => {
    const selectedValues = regionsList.filter(({ code }) => selectedKeys.indexOf(code) > -1);
    onChange(selectedValues);
  }, [selectedKeys]);
  async function getRegions(code) {
    const regions = await DICT.findAllChildDictByCodeUsingPOST({
      body: [{ code, rootCode: code }],
    });
    setRegionsList(regions);
  }

  return (
    <>
      <Table
        size="small"
        dataSource={regionsList}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            filteredValue: wordFilter ? [wordFilter] : [],
            onFilter: (word, record) => record.name.includes(word),
          },
          {
            title: '编码',
            dataIndex: 'code',
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          preserveSelectedRowKeys: true,
          onChange: keys => {
            setSelectedKeys(keys);
          },
        }}
        title={() => (
          <div style={{ width: 400 }}>
            <Input.Search
              placeholder="请输入行政区划名称"
              allowClear
              onSearch={word => {
                setWordFilter(word);
              }}
            />
          </div>
        )}
        rowKey="code"
      />
    </>
  );
}

export default RegionSelectTable;
