
import React, { Component } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";
import { map, omit } from 'lodash';
import { themeStatus } from '@/utils/constantEnum';


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class ThemeAuditQueryBar extends Component {

  componentDidMount(){

  }

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        initialValues={{
          status: -1,
        }}
        {...others}
      >
        <TItem col={6} {...layout} name="name" label="主题名称">
          <Input />
        </TItem>
        <TItem col={6} {...layout} name="status" label="主题状态">
        <Select placeholder="请选择主题状态">
            <Select.Option value={-1}>全部</Select.Option>
            {map(omit(themeStatus, 'submit'), (v, k) => (
                  <Select.Option key={k} value={v}>
                    {themeStatus.$names[k]}
                  </Select.Option>
                ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ThemeAuditQueryBar;
