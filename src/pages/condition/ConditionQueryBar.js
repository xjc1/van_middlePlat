import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { conditionType, conditionObject } from '@/utils/constantEnum';

const { Option } = Select;

class ConditionQueryBar extends Component {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="条件名称">
          <Input />
        </TItem>
        <TItem col={6} name="type" label="条件类型">
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {
              _.map(conditionType, (v, k) => (
                <Option value={v} key={k}>
                  {conditionType.$names[k]}
                </Option>
              ))
            }
          </Select>
        </TItem>
        <TItem col={6} name="object" label="对象类型">
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {
              _.map(conditionObject, (v, k) => (
                <Option value={v} key={k}>
                  {conditionObject.$names[k]}
                </Option>
              ))
            }
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ConditionQueryBar;
