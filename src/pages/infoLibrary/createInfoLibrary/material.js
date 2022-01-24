import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard, EmptyFn } from '@/components/tis_ui';
import { DictSelect, ConditionSelector } from '@/components/bussinessComponents';
import { Input, Row, Form, InputNumber } from 'antd';
import _ from 'lodash';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
  col: 12,
};

function MaterialInfo({value = {}, onChange = EmptyFn}) {
  return (
    <Form onValuesChange={(change, allValue) => onChange(allValue)} initialValues={value}>
    <FormCard title="材料信息" style={{ border: 'unset' }}>
      <Row>
        <TItem {...layout} name="materialSimpleName" label="标准材料简称（拆解材料）">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="orMaterial" label="或材料">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="materialSituation" label="适用情形">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="source" label="材料来源渠道">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="sonSource" label="材料来源渠道子类">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="sourceExplain" label="来源渠道说明（出具部门）">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="certTypeCode" label="电子证照类型码">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="certTypeName" label="电子证照类型名称">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="paperMaterialNum" label="纸质材料份数">
          <InputNumber min={0} style={{width: '100%'}} placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="paperMaterialSpecifications" label="纸质材料规格">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="paperMaterialExample" label="纸质材料规范">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="paperMaterialEmptyTable" label="纸质材料空表">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="materialAcceptanceStandard" label="材料受理标准(形式审查要点)">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="materialFormat" label="电子材料格式要求">
          <Input placeholder="请输入" />
        </TItem>
        <TItem {...layout} name="remark" label="备注">
          <Input placeholder="请输入" />
        </TItem>
      </Row>
    </FormCard>
    </Form>
  );
}

export default MaterialInfo;
