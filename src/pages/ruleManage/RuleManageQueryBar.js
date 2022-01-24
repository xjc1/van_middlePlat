import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { policyUpDownStatus, appUserType, tableManageTableType } from '@/utils/constantEnum';

class RuleManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="cname" label="规则名称">
          <Input />
        </TItem>
        <TItem col={8} name="type" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (key, value) => (
              <Select.Option key={key} value={key}>
                {appUserType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="tableType" label="库表类型">
          <Select allowClear>
            {_.map(tableManageTableType, (v, k) => (
              <Select.Option key={k} value={v}>
                {tableManageTableType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="status" label="上下架状态">
          <Select allowClear>
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

export default RuleManageQueryBar;
