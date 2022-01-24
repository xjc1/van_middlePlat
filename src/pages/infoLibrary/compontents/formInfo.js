import {Descriptions, Divider,Space,Empty} from "antd";
import styles from "../infoLibrary.less";
import React from "react";
import BaseInfoUtils from './baseInfoUtils'
import { TTable, OperateBar } from '@/components/tis_ui';

function formInfo(props) {
  const {record,dictNames} = props;
  const {formBaseInfo = {}} = record;
  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  const columns = [
    {
      title: '名称(中文)',
      dataIndex: 'name',
      key:"name"
    },
    {
      title: '名称(英文)',
      dataIndex: 'englishName',
      key:"englishName"
    },
    {
      title: '适用情形',
      dataIndex: 'situation',
      key:"situation"
    },
    {
      title: '类型',
      dataIndex: 'type',
      key:"type"
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      key:"defaultValue"
    },
    {
      title: '文本和数字长度',
      dataIndex: 'length',
      key:"length"
    },
    {
      title: "校验规则",
      dataIndex: 'checkRule',
      key:"checkRule"
    },
    {
      title: "填报解读文本",
      dataIndex: 'explain',
      key:"explain"
    }
  ];

  return (
    <>
      <BaseInfoUtils record={record} dictNames={dictNames} />
      <Descriptions title={renderTitle('字段信息')} className={styles.descriptionsLayout} />
      <TTable columns={columns} dataSource={formBaseInfo.formItemInfo || []} rowKey="name" />
      <Descriptions title={renderTitle('动态表格')} className={styles.descriptionsLayout} />
      {(formBaseInfo.formInfo || []).length===0?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />:
        (formBaseInfo.formInfo || []).map((item=>(
        <>
          <Space size={200} style={{marginBottom:10}}>
            <strong>表格名称(中文): {item.name} </strong>
            <strong>表格名称(英文): {item.englishName} </strong>
          </Space>
          <TTable columns={columns} dataSource={item.formItem || []} rowKey="name" />
        </>
      )))}

    </>
  );
}
export default formInfo
