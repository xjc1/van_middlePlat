
import React, { Component } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";

class CommonModelQueryBar extends Component {

  render() {
    const { onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
        <TItem
          col={8}
          name="number"
          label="模型编号"
        >
          <Input/>
        </TItem>
        <TItem
          col={8}
          name="name"
          label="模型名称"
        >
          <Input/>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default CommonModelQueryBar;


