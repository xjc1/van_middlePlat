import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard } from '@/components/tis_ui';
import { Input, InputNumber } from 'antd';
import _ from 'lodash';
import styles from '../infoLibrary.less';
import AddTag from './addTag';
import DynamicForm from './dynamicFormContainer';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  col: 24,
};

function MaterialInfo(props) {
  // const { value, onChange = () => {} } = props;
  const { parentKey } = props;
  const columns = [
    {
      title: '名称(中文)',
      dataIndex: 'name',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '适用情形',
      dataIndex: 'situation',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '默认值',
      width: '10%',
      ellipsis: true,
      dataIndex: 'defaultValue',
      className: styles.addTable,
    },
    {
      title: '文本和数字长度',
      dataIndex: 'length',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '校验规则',
      dataIndex: 'checkRule',
      width: '15%',
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '填报解读文本',
      dataIndex: 'explain',
      width: '15%',
      ellipsis: true,
      className: styles.addTable,
    },
  ];

  const renderItem = () => {
    return (
      <>
        <TItem name="name" label="名称(中文)" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
        <TItem name="situation" label="适用情形">
          <Input placeholder="请输入适用情形" />
        </TItem>
        <TItem name="type" label="类型">
          <Input />
        </TItem>
        <TItem name="defaultValue" label="默认值">
          <Input />
        </TItem>
        <TItem name="length" label="文本和数字长度">
          <InputNumber min={0} style={{ width: '100%' }} />
        </TItem>
        <TItem name="checkRule" label="校验规则">
          <Input />
        </TItem>
        <TItem name="explain" label="填报解读文本">
          <Input />
        </TItem>
      </>
    );
  };
  return (
    // <Form onValuesChange={(change, allValue) => onChange(allValue)}>
    <>
      <FormCard title="字段信息" style={{ border: 'unset' }}>
        <TItem {...layout} name={[parentKey, 'formItemInfo']} label="字段信息">
          <AddTag title="添加字段信息" columns={columns} inputItem={renderItem()} />
        </TItem>
      </FormCard>
      <FormCard title="动态表格" style={{ border: 'unset' }}>
        <TItem
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name={[parentKey, 'formInfo']}
          style={{ margin: '0 auto' }}
        >
          <DynamicForm title="添加字段信息" columns={columns} inputItem={renderItem()} />
        </TItem>
      </FormCard>
    </>
    // </Form>
  );
}

export default MaterialInfo;
