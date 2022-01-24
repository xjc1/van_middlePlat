import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import { policyUpDownStatus, commonAuditState, commonObjectType } from '@/utils/constantEnum';
import _ from 'lodash';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { adaptText } from '@/utils/AdaptiveHelper';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

class ScenesQuerybar extends PureComponent {
  render() {
    const { dispatch, list, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label={adaptText('主题名称')} {...layout}>
          <Input />
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
        <TItem col={6} name="auditState" label="总审核状态" {...layout}>
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {_.map(commonAuditState, (value, key) => (
              <Option key={key} value={value}>
                {commonAuditState.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="objectType" label="对象类型" {...layout}>
          <Select allowClear>
            <Option value="">全部</Option>
            {_.map(commonObjectType, (v, k) => (
              <Option value={v} key={k}>
                {commonObjectType.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="materialAbsence" label="是否缺失材料" {...layout}>
          <Select allowClear>
            <Option value={-1}>全部</Option>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </TItem>
        <TItem col={6} name="publishDept" label="发布部门" {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem col={6} name="regions" label="行政区划" {...layout}>
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear />
        </TItem>
        <TItem name="clientType" label="终端类型" col={6} {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ScenesQuerybar;
