import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import { policyUpDownStatus } from '@/utils/constantEnum';
import _ from 'lodash';

class InstitutionManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="部门名称">
          <Input />
        </TItem>
        <TItem col={8} name="code" label="部门编码">
          <Input />
        </TItem>
        <TItem col={8} name="category" label="机构分类">
          <DictSelect dict="JGFL" dictType="tree" allowClear placeholder="请选择机构分类" />
        </TItem>
        <TItem col={8} name="status" label="上下架状态">
          <Select>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem expanded col={8} name="attributionDepartment" label="归属部门">
          <DictSelect dict="SHGSBMSH" dictType="tree" treeNodeFilterProp="title" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default InstitutionManageQueryBar;
