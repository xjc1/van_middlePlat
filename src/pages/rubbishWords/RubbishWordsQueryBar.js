
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, Select } from "antd";
import { DictSelect } from '@/components/bussinessComponents';

class RubbishWordsQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >

        <TItem
          col={8}
          name="word"
          label="词条名"
        >
          <Input />
        </TItem>
        <TItem col={8} name="typeCode" label="词条类型" >
          <DictSelect
            dict="BWT1000"
            dictType="tree"
          />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default RubbishWordsQueryBar;


