import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { functionType } from '@/utils/constantEnum';
import _ from 'lodash';

class FunctionWordQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="word" label="功能词描述">
          <Input />
        </TItem>
        <TItem col={8} name="type" label="功能词类型">
          <Select allowClear>
            {_.map(functionType, (value, key) => (
              <Select.Option key={key} value={value}>
                {functionType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default FunctionWordQueryBar;
