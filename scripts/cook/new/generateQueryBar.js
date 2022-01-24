function generateQueryBar(name, upperFirstName) {
  return `
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";

class ${upperFirstName}QueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
      <TItem name="selectedName"  label="联动" expanded>
            <Select>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </TItem>
          <TItem
            col={8}
            name="jackName"
            label="jackName"
            tip="fdafdafdfPopover"
          >
            <Input/>
          </TItem>
          <TItem col={8} name="jackPass" label="jackName密码" >
            <Input.Password/>
          </TItem>
          <TItem col={8} name="jackNamePass2" label="jackName密码">
            <Input.Password/>
          </TItem>
      </QueryBarCard>
    );
  }
}

export default ${upperFirstName}QueryBar;


  `;
}

module.exports = generateQueryBar;
