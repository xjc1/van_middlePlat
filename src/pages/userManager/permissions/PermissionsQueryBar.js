import React, { Component } from 'react';
import { QueryBar } from "@/components/tis_ui";
import { Input, Select } from "antd";

class PermissionsQuerybar extends Component {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBar
        onForm={onForm}
        render={({ TItem, Slot }) => <>
          <TItem
            col={8}
            field="code"
            label="权限code"
            tip="权限code"
          >
            <Input/>
          </TItem>
          <TItem
            col={8}
            field="name"
            label="权限名称"
          >
            <Input/>
          </TItem>
          <TItem field="valid" initialValue="lucy" label="联动" col={8}>
            <Select>
              <Select.Option value="jack">全部</Select.Option>
              <Select.Option value="lucy">有效</Select.Option>
              <Select.Option value="Yiminghe">无效</Select.Option>
            </Select>
          </TItem>
        </>}
        {...others}
      />
    );
  }
}

export default PermissionsQuerybar;


