import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard } from '@/components/tis_ui';
import { DictSelect, ConditionSelector } from '@/components/bussinessComponents';
import { Input, Row } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import styles from '../infoLibrary.less';
import AddTag from './addTag';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  col: 24,
};

function PolicyWord({value = [], onChange = EmptyFn}) {
  const columns = [
    {
      title: '百科词条名称',
      dataIndex: 'name',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '百科词条类型',
      dataIndex: 'type',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '文字内容',
      dataIndex: 'content',
      width: '20%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '引用处原文链接',
      dataIndex: 'linked',
      width: '15%',
      ellipsis: true,
      className: styles.addTable,
    },
  ];

  const renderItem = () => {
    return (
      <>
        <TItem name="name" label="百科词条名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
        <TItem name="type" label="百科词条类型">
          <Input placeholder="请输入百科词条类型" />
        </TItem>
        <TItem name="content" label="文字内容">
          <Input />
        </TItem>
        <TItem name="linked" label="引用处原文链接">
          <Input />
        </TItem>
      </>
    );
  };
  return (
    <FormCard title="字段信息" style={{ border: 'unset' }}>
      <TItem {...layout} name="policyWordBaseInfo" label="字段信息">
        <AddTag title="添加字段信息" columns={columns} inputItem={renderItem()} />
      </TItem>
    </FormCard>
  );
}

export default PolicyWord;
