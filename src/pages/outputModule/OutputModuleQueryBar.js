import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';

class OutputModuleQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="模块名称">
          <Input />
        </TItem>
        <TItem col={6} name="code" label="模块编码">
          <Input />
        </TItem>
        <TItem col={6} name="object" label="对象类型">
          <TSelect>
            {_.map(appUserType, (v, k) => (
              <TSelect.Option value={v} key={k}>
                {appUserType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default OutputModuleQueryBar;
