
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};
class DimensionQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
          <TItem
            col={6}
            name="name"
            label="维度名称"
            {...layout}
          >
            <Input/>
          </TItem>
      </QueryBarCard>
    );
  }
}

export default DimensionQueryBar;


  