
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";

class KnowledgeInterQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >

          <TItem
            col={6}
            name="interfaceNum"
            label="接口编号"
          >
            <Input/>
          </TItem>
          <TItem col={6} name="interfaceName" label="接口名称" >
            <Input/>
          </TItem>
      </QueryBarCard>
    );
  }
}

export default KnowledgeInterQueryBar;


  