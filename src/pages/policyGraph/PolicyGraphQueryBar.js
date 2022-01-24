import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';
import {
  commonHave,
  commonStatus,
  policyGraphAudit,
} from '@/utils/constantEnum';

class PolicyGraphQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="政策名称">
          <Input />
        </TItem>
        <TItem col={6} name="category" label="政策分类">
          <DictSelect dictType="tree" dict="ZCFL" multiple />
        </TItem>
        <TItem col={6} name="level" label="政策级别">
          <DictSelect dict="ZCJB0001" />
        </TItem>
        <TItem name="district" label="行政区划" col={6}>
          <DictSelect dict="SH00XZQH" dictType="lazyTree" />
        </TItem>
        <TItem col={6} name="isEffective" label="政策有效性">
          <TSelect>
            {_.map(commonStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonStatus.$names[value]}
              </Select.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="objectType" label="对象类型" col={6}>
          <DictSelect dict="DXLX0001" dictType="tree" />
        </TItem>
        <TItem col={6} name="publishDept" label="发布部门">
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="haveRelation" label="政策图谱" >
          <TSelect>
            {_.map(commonHave, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonHave.$names[value]}
              </Select.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem col={6} name="review" label="审核状态" >
          <TSelect>
            {_.map(policyGraphAudit, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyGraphAudit.$names[value]}
              </Select.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PolicyGraphQueryBar;
