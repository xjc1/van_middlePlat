import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents'

import { Input, Select } from 'antd';
import { implementationLevel, policyUpDownStatus } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class InfoLibraryQueryBar extends Component {
  componentDidMount() {}

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        initialValues={{
          status: -1,
          executiveLevel: -1,
        }}
        {...others}
      >
        <TItem col={6} {...layout} name="code" label="主题编码">
          <Input />
        </TItem>
        <TItem col={6} {...layout} name="name" label="主题名称">
          <Input />
        </TItem>
        <TItem col={6} name="headDept" label="牵头部门" {...layout}>
          <DictSelect dict="SHSSBMSH" dictType="tree" allowClear />
        </TItem>
        <TItem name="executiveLevel" label="实施层级" col={6} {...layout}>
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(implementationLevel, (key, value) => (
              <Select.Option key={key} value={key}>
                {implementationLevel.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="status" label="上下架状态" col={6} {...layout}>
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default InfoLibraryQueryBar;
