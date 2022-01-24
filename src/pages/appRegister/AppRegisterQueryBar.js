import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Col, Input, Select, Tabs } from 'antd';
import styles from './appRegister.less';

class AppRegisterQueryBar extends Component {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;

    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={2} label="其它选项:" labelCol={24} />
        <TItem col={10} name="activeUsers" label="活跃用户">
          <Input placeholder="不限" />
        </TItem>
        <TItem col={10} name="praiseDegree" label="好评度">
          <Input placeholder="不限" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default AppRegisterQueryBar;
