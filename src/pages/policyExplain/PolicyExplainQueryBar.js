import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { policyUpDownStatus } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class PolicyExplainQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} {...layout} name="topic" label="解读主题">
          <Input />
        </TItem>
        <TItem col={6} name="collectDepartment" label="创建部门" {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="updateDept" label="更新部门" {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="regions" label="行政区划" {...layout}>
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear />
        </TItem>
        <TItem col={6} name="status" label="上下架状态" {...layout}>
          <Select>
            <Select.Option key="ALL" value="all">
              全部
            </Select.Option>
            {_.map(policyUpDownStatus, (v, k) => (
              <Select.Option key={k} value={v}>
                {policyUpDownStatus.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="clientType" label="终端类型" {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PolicyExplainQueryBar;
