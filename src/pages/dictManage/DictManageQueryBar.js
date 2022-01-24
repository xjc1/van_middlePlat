import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input } from 'antd';

class DictManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="字典名称">
          <Input />
        </TItem>
        <TItem col={8} name="code" label="字典编码">
          <Input />
        </TItem>
        <TItem col={8} name="parentcode" label="父级字典编码">
          <Input />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default DictManageQueryBar;
