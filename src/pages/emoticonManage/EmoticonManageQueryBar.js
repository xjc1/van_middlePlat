import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input } from 'antd';

class EmoticonManageQueryBar extends PureComponent {
  render() {
    const { dispatch, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="表情名称">
          <Input />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default EmoticonManageQueryBar;
