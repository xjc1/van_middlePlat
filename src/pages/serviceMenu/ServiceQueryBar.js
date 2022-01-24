import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

class ServiceQuerybar extends PureComponent {
  render() {
    const { dispatch, list, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="服务名称" {...layout}>
          <Input />
        </TItem>
        <TItem col={6} name="executor" label="实施机关" {...layout}>
          <DictSelect dict="SHSSBMSH" allowClear />
        </TItem>
        <TItem col={6} name="objectType" label="对象类型" {...layout}>
          <DictSelect dict="DXLX0001" allowClear />
        </TItem>
        <TItem name="status" label="上下架状态" col={6} {...layout}>
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {_.map(policyUpDownStatus, (value, key) => (
              <Option key={key} value={value}>
                {policyUpDownStatus.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem name="clientType" label="终端类型" col={6} {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem name="publishDept" label="发布部门" col={6} {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ServiceQuerybar;
