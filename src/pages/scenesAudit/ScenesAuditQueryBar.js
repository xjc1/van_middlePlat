import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents'
import { commonAuditState, commonObjectType } from '@/utils/constantEnum';
import { adaptText } from "@/utils/AdaptiveHelper";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

class ScenesAuditQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label={adaptText('主题名称')} {...layout}>
          <Input />
        </TItem>
        <TItem col={6} name="regions" label="行政区划" {...layout}>
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear />
        </TItem>
        <TItem col={6} name="objectType" label="对象类型" {...layout}>
          <Select allowClear>
            <Option value="">全部</Option>
            {_.map(commonObjectType, (v, k) => (
              <Option value={v} key={k}>
                {commonObjectType.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="auditState" label="总审核状态" {...layout}>
          <Select allowClear>
            <Option value={-1}>全部</Option>
            {_.map(commonAuditState, (value, key) => (
              <Option key={key} value={value}>
                {commonAuditState.$names[key]}
              </Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ScenesAuditQueryBar;
