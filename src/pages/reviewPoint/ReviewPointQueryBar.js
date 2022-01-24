import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { commonObjectType, commonYesNo } from '@/utils/constantEnum';

const { Option } = Select;

class ReviewPointQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem name="subItemName" label="办理项名称" col={6}>
          <Input allowClear />
        </TItem>
        <TItem col={6} name="matterCode" label="办理项编码">
          <Input />
        </TItem>
        <TItem col={6} name="objectType" label="对象类型">
          <Select allowClear>
            <Option value="" label="全部">
              全部
            </Option>
            {_.map(commonObjectType, (v, k) => (
              <Option key={k} value={v} label={commonObjectType.$names[k]}>
                {commonObjectType.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="hasPreMatter" label="是否有前置">
          <Select allowClear showArrow>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ReviewPointQueryBar;
