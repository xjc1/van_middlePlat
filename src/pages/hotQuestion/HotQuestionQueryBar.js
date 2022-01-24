
import React, { Component } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";
import { policyUpDownStatus } from '@/utils/constantEnum';
import _ from "lodash";

class HotQuestionQueryBar extends Component {

  render() {
    const {  onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
        <TItem
          col={8}
          name="question"
          label="问题名称"
        >
          <Input/>
        </TItem>
        <TItem name="status" label="上下架状态" col={8} >
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default HotQuestionQueryBar;


