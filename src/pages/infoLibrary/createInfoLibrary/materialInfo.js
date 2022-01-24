import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard } from '@/components/tis_ui';
import { DictSelect, ConditionSelector } from '@/components/bussinessComponents';
import { Input, Row, InputNumber } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import styles from '../infoLibrary.less';
import AddTag from './addTag';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  col: 24,
};

const itemLayout  = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
    col: 24,
  };

function MaterialInfo(props) {
  const columns = [
    {
      title: '标准材料简称（拆解材料）',
      dataIndex: 'materialSimpleName',
      className: styles.addTable,
    },
    {
      title: '或材料',
      dataIndex: 'orMaterial',
      width: '15%', 
      ellipsis: true,
      className: styles.addTable,
    },
    {
      title: '适用情形',
      dataIndex: 'materialSituation',
      width: '15%',
      ellipsis: true,
      className: styles.addTable,
    },

    {
      title: '材料来源渠道',
      dataIndex: 'source',
      width: '10%',
      ellipsis: true,
      className: styles.addTable,
    },
    // {
    //   title: '材料来源渠道子类',
    //   dataIndex: 'sonSource',
    //   className: styles.addTable,
    // },
    // {
    //   title: '来源渠道说明（出具部门）',
    //   dataIndex: 'sourceExplain',
    //   className: styles.addTable,
    // },
    // {
    //   title: '电子证照类型码',
    //   dataIndex: 'certTypeCode',
    //   className: styles.addTable,
    // },
    // {
    //   title: '电子证照类型名称',
    //   dataIndex: 'certTypeName',
    //   className: styles.addTable,
    // },
    // {
    //   title: '纸质材料份数',
    //   dataIndex: 'paperMaterialNum',
    //   className: styles.addTable,
    // },
    // {
    //   title: '纸质材料规格',
    //   dataIndex: 'name',
    //   className: styles.addTable,
    // },
    // {
    //   title: '纸质材料规范',
    //   dataIndex: 'paperMaterialSpecifications',
    //   className: styles.addTable,
    // },
    // {
    //   title: '纸质材料空表',
    //   dataIndex: 'paperMaterialExample',
    //   className: styles.addTable,
    // },
    // {
    //   title: '材料受理标准(形式审查要点)',
    //   dataIndex: 'paperMaterialEmptyTable',
    //   className: styles.addTable,
    // },
    // {
    //   title: '标准材料简称（拆解材料）',
    //   dataIndex: 'materialAcceptanceStandard',
    //   className: styles.addTable,
    // },
    // {
    //   title: '电子材料格式要求',
    //   dataIndex: 'materialFormat',
    //   className: styles.addTable,
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'remark',
    //   className: styles.addTable,
    // },
  ];

  const renderItem = () => {
    return (
      <>
        <TItem {...itemLayout} name="materialSimpleName" label="标准材料简称（拆解材料）">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="orMaterial" label="或材料">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="materialSituation" label="适用情形">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="source" label="材料来源渠道">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="sonSource" label="材料来源渠道子类">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="sourceExplain" label="来源渠道说明（出具部门）">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="certTypeCode" label="电子证照类型码">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="certTypeName" label="电子证照类型名称">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="paperMaterialNum" label="纸质材料份数">
          <InputNumber min={0} style={{width: '100%'}} placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="paperMaterialSpecifications" label="纸质材料规格">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="paperMaterialExample" label="纸质材料规范">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="paperMaterialEmptyTable" label="纸质材料空表">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="materialAcceptanceStandard" label="材料受理标准(形式审查要点)">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="materialFormat" label="电子材料格式要求">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...itemLayout} name="remark" label="备注">
          <Input placeholder="请输入" />
        </TItem>
      </>
    );
  };
  return (
    <FormCard title="材料信息" style={{ border: 'unset' }}>
      <TItem {...layout}  name="materialBaseInfo" label="材料信息">
        <AddTag title="添加字段信息" columns={columns} inputItem={renderItem()} placement="right" />
      </TItem>
    </FormCard>
  );
}

export default MaterialInfo;
