import React, { Component } from 'react';
import { QueryBarCard, TItem, FormRules } from '@/components/tis_ui';
import { Input } from 'antd';

class PortraitQueryBar extends Component {
  render() {
    const { dispatch, list, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="画像标签名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PortraitQueryBar;
