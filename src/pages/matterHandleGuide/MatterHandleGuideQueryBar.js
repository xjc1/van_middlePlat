import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { policyUpDownStatus } from '@/utils/constantEnum';

class MatterHandleGuideQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem name="guideTopic" col={6} label="导办主题">
          <Input allowClear />
        </TItem>
        <TItem col={6} name="collectDepartment" label="创建部门">
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="updateDept" label="更新部门">
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select allowClear>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" showArrow allowClear />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MatterHandleGuideQueryBar;
