import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";
import { commonStatus } from "@/utils/constantEnum";
import _ from 'lodash';

class UsersQuerybar extends PureComponent {
  render() {
    const { focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        initialValues={{
          status: commonStatus.VALID
        }}
        {...others}
      >
        <TItem
          col={8}
          name="userName"
          label="登录名"
        >
          <Input/>
        </TItem>
        <TItem
          col={8}
          name="name"
          label="用户名">
          <Input/>
        </TItem>
        <TItem col={8} name="status" label="用户状态">
          <Select>
            {
              _.map(commonStatus, (v, k) => <Select.Option key={k} value={v}>{commonStatus.$names[k]}</Select.Option>)
            }
          </Select>
        </TItem>
        <TItem col={8} name="phone" label="电话" >
          <Input/>
        </TItem>
        <TItem
          name="email"
          label="邮箱"
          col={8}>
          <Input/>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default UsersQuerybar;


