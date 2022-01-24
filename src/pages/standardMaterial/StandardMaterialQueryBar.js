import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import { connect } from 'dva';
import _ from 'lodash';

@connect(({ standardMaterial }) => {
  return {
    categories: standardMaterial.categories,
  };
})
class StandardMaterialQueryBar extends PureComponent {
  render() {
    const { onForm, categories, dispatch, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="材料名称">
          <Input />
        </TItem>
        <TItem col={6} name="code" label="材料编码">
          <Input />
        </TItem>
        <TItem col={6} name="type" label="材料类型">
          <DictSelect
            rootDict="CLLX"
            dict="CLLX"
            dictType="tree"
            allowClear
            placeholder="请选择材料类型"
          />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="administrativeLevel" label="行政层级">
          <DictSelect
            rootDict="XZCJ"
            dict="XZCJ"
            dictType="tree"
            allowClear
            placeholder="请选择行政层级"
          />
        </TItem>
        <TItem col={6} name="source" label="材料来源">
          <DictSelect
            rootDict="CLLY"
            dict="CLLY"
            dictType="tree"
            allowClear
            placeholder="请选择材料来源"
          />
        </TItem>
        <TItem col={6} name="issuingDepartment" label="发证部门">
          <Select optionLabelProp="label" allowClear>
            {_.map(categories, ({ id, name }) => (
              <Select.Option key={id} value={id} label={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default StandardMaterialQueryBar;
