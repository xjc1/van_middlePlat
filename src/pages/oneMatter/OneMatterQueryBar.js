import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { policyUpDownStatus, commonOnTop, appUserType } from '@/utils/constantEnum';

const { Option } = Select;

class OneMatterQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="联办名称">
          <Input />
        </TItem>
        <TItem col={6} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear />
        </TItem>
        <TItem col={6} name="category" label="所属分类">
          <DictSelect dict="lbfl" dictType="list" />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {_.map(policyUpDownStatus, (value, key) => (
              <Option key={key} value={value}>
                {policyUpDownStatus.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="onTop" label="是否置顶">
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {_.map(commonOnTop, (value, key) => (
              <Option key={key} value={value}>
                {commonOnTop.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (value, key) => (
              <Option key={key} value={value}>
                {appUserType.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default OneMatterQueryBar;
