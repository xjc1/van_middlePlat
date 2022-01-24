import {Descriptions, Divider, Table} from "antd";
import styles from "../infoLibrary.less";
import React from "react";
import BaseInfoUtils from './baseInfoUtils'
import { TTable, OperateBar } from '@/components/tis_ui';

function policyWordInfo(props) {
  const {record,dictNames} = props;
  const {policyWordBaseInfo} = record;
  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  const columns = [
    {
      title: '百科词条名称',
      dataIndex: 'name',
    },
    {
      title: '百科词条类型',
      dataIndex: 'type',
    },
    {
      title: '文字内容',
      dataIndex: 'content',
    },
    {
      title: '引用出处原文链接',
      dataIndex: 'linked',
    },
  ];

  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('百科词条信息')} className={styles.descriptionsLayout} />
      <TTable columns={columns} dataSource={policyWordBaseInfo || []} rowKey="name" />
    </>
  );
}
export default policyWordInfo
