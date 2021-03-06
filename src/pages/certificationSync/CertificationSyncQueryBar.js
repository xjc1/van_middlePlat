import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input } from "antd";
import { DictSelect } from "@/components/bussinessComponents";

class CertificationSyncQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
        <TItem
          col={8}
          name="moduleTitle"
          label="certificationSync标题"
        >
          <Input />
        </TItem>
        <TItem name="objectType" label="对象类型" col={8}>
          <DictSelect dict="DXLX0001" dictType="tree" />
        </TItem>
        <TItem col={8} name="jackPass" label="jackName密码">
          <Input.Password />
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default CertificationSyncQueryBar;
