import React from 'react';
import { modulesContentType } from '@/utils/constantEnum';
import { Table, Space } from 'antd';
import _ from 'lodash';
import { handleEditByTypeAndId, handleViewByTypeAndId } from '@/utils/ToPageByTypeAndId';
import JsonViewPopover from './JsonViewPopover';

function SuggestResult({ value = [], dictNames }) {
  const columns = [
    {
      title: '名称',
      dataIndex: 'description',
    },
    {
      title: '内容类型',
      dataIndex: 'type',
      render: text => modulesContentType.$v_names[text] || text,
    },
    {
      title: '行政区划',
      dataIndex: 'region',
      render: region => _.get(dictNames, `SH00XZQH.${region}`, region),
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      render: record => {
        return (
          <Space>
            <a
              onClick={() => {
                handleViewByTypeAndId(record.type, record.id);
              }}
            >
              查看
            </a>
            <a
              onClick={() => {
                handleEditByTypeAndId(record.type, record.id);
              }}
            >
              编辑
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ paddingBottom: 20 }}>
        <JsonViewPopover value={value} btnText="查看JSON" placement="right" />
      </div>
      <Table dataSource={value} columns={columns} rowKey="id" />
    </>
  );
}

export default SuggestResult;
