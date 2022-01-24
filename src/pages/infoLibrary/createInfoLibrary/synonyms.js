/* eslint-disable */
import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard, EmptyFn } from '@/components/tis_ui';
import { DictSelect, ConditionSelector } from '@/components/bussinessComponents';
import { Input, Row, Form } from 'antd';
import _ from 'lodash';
import styles from '../infoLibrary.less';
import AddTag from './addTag';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  col: 24,
};

function Synonyms(props) {
  const columns = [
    {
      title: '问题名称',
      dataIndex: 'name',
      className: styles.addTable,
    },
    {
      title: '问题情形选项',
      dataIndex: 'situation',
      width: '8%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项提示',
      dataIndex: 'tip',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项提示链接网址',
      dataIndex: 'tipLinked',
      width: '8%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项对应百科词条',
      dataIndex: 'policyWord',
      width: '8%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项对应材料',
      dataIndex: 'material',
      width: '8%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项对应表单项',
      dataIndex: 'formItem',
      width: '8%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项对应表单项(服务)',
      dataIndex: 'matterOrService',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '选项复用表单项',
      width: '8%',
      ellipsis: true,
      dataIndex: 'reusedFormItem',
      className: styles.addTable,
    },
  ];

  const renderItem = () => {
    return (
      <>
        <TItem name="name" label="问题名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
        <TItem name="situation" label="问题情形选项">
          <Input placeholder="请输入适用情形" />
        </TItem>
        <TItem name="tip" label="选项提示">
          <Input />
        </TItem>
        <TItem name="tipLinked" label="选项提示链接网址">
          <Input />
        </TItem>
        <TItem name="policyWord" label="选项对应百科词条">
          <Input />
        </TItem>
        <TItem name="material" label="选项对应材料">
          <Input />
        </TItem>
        <TItem name="formItem" label="选项对应表单项">
          <Input />
        </TItem>
        <TItem name="matterOrService" label="选项对应事项（服务）">
          <Input />
        </TItem>
        <TItem name="reusedFormItem" label="选项复用表单项">
          <Input />
        </TItem>
      </>
    );
  };
  return (
    <FormCard title="字段信息" style={{ border: 'unset' }}>
      <TItem {...layout} name="questionBaseInfo" label="字段信息">
        <AddTag
          key="questionBaseInfo"
          title="添加字段信息"
          columns={columns}
          inputItem={renderItem()}
        />
      </TItem>
    </FormCard>
  );
}

export default Synonyms;
