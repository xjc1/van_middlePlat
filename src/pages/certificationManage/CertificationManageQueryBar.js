import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from "@/components/tis_ui";
import { Input } from "antd";
import { DictSelect } from "@/components/bussinessComponents";
import _ from "lodash";
import { policyUpDownStatus } from "@/utils/constantEnum";

class CertificationManageQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
        <TItem
          col={8}
          name="name"
          label="证照名称"
        >
          <Input />
        </TItem>
        <TItem
          col={8}
          name="code"
          label="证照编码"
        >
          <Input />
        </TItem>
        <TItem name="objectType" label="对象类型" col={8}>
          <DictSelect dict="DXLX0001" dictType="tree" />
        </TItem>
        <TItem name="status" label="上下架状态" col={8}>
          <TSelect>
            <TSelect.Option value={-1}>全部</TSelect.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <TSelect.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default CertificationManageQueryBar;
