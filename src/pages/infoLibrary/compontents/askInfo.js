import {Descriptions, Divider} from "antd";
import styles from "../infoLibrary.less";
import React from "react";
import BaseInfoUtils from './baseInfoUtils'
import { TTable, OperateBar } from '@/components/tis_ui';

function askInfo(props) {
  const {record,dictNames} = props;
  const { questionBaseInfo } = record;
  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  const columns = [
    {
      title: '问题名称',
      dataIndex: 'name',
    },
    {
      title: '问题情形选项',
      dataIndex: 'situation',
    },
    {
      title: '选项提示',
      dataIndex: 'tip',
    },
    {
      title: '选项提示链接网址',
      dataIndex: 'tipLinked',
    },
    {
      title: '选项对应百科词条',
      dataIndex: 'policyWord',
    },
    {
      title: '选项对应材料',
      dataIndex: 'material',
    },
    {
      title: "选项对应表单项",
      dataIndex: 'formItem',
    },
    {
      title: "选项对应事项(服务)",
      dataIndex: 'matterOrService',
    },
    {
      title: "选项复用表单项",
      dataIndex: 'reusedFormItem',
    }
  ];

  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('问卷信息')} className={styles.descriptionsLayout} />
      <TTable columns={columns} dataSource={questionBaseInfo || []} rowKey="name" />
    </>
  );
}
export default askInfo
