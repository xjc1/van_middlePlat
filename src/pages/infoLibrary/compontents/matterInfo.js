import { Descriptions, Divider, Table } from 'antd';
import styles from '../infoLibrary.less';
import React, { useEffect, useState } from 'react';
import BaseInfoUtils from './baseInfoUtils';
import { TTable, OperateBar } from '@/components/tis_ui';
import { Code2Name } from '@/utils/DictTools';
import { BASEINFO } from '@/services/api';

function matterInfo(props) {
  const { record, dictNames } = props;
  const { matterBaseInfos } = record;
  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  const columns = [
    {
      title: '事项编码',
      dataIndex: 'matterCode',
    },
    {
      title: '一级事项名称',
      dataIndex: 'title',
    },
    {
      title: '二级事项名称',
      dataIndex: 'name',
    },
    {
      title: '三级事项名称',
      dataIndex: 'subItemName',
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      render: code => {
        return dictNames.SH00XZQH[code];
      },
    },
    {
      title: '实施主体',
      dataIndex: 'department',
      render: text => {
        return dictNames.SHSSBMSH[text] || text;
      },
    },
    {
      title: '承诺办理时限(工作日)',
      dataIndex: 'term',
      render: text => (
        <span>
          {text}
          {text && '天'}
        </span>
      ),
    },
  ];
  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('事项信息')} className={styles.descriptionsLayout} />
      <TTable columns={columns} dataSource={matterBaseInfos || []} rowKey="id" />
    </>
  );
}
export default matterInfo;
