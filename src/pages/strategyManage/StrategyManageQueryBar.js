import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { modulesContentType, appUserType, commonStrategyType } from '@/utils/constantEnum';
import _ from 'lodash';

class StrategyManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="策略名称">
          <Input />
        </TItem>
        <TItem col={8} name="type" label="策略类型">
          <Select>
            {_.map(commonStrategyType, (v, k) => (
              <Select.Option key={k} value={v}>
                {commonStrategyType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="objectType" label="对象类型">
          <Select>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="contentType" label="内容类型">
          <Select>
            {_.map(modulesContentType, (v, k) => (
              <Select.Option value={v} key={k}>
                {modulesContentType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default StrategyManageQueryBar;
