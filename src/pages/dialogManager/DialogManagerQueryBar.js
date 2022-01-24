import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType, commonUpDownStatus, sourceType } from '@/utils/constantEnum';

const { Option } = TSelect;

class DialogManagerQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="对话名称">
          <Input />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select>
            {_.map(commonUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem col={6} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={6} name="attributionDepartment" label="归属部门">
          <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>
        <TItem col={6} name="region" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
        </TItem>
        <TItem name="objectType" label="对象类型" col={6}>
          <Select>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="source" label="来源方式">
          <TSelect>
            {_.map(sourceType, (v, k) => (
              <Option value={v} key={k}>
                {sourceType.$names[k]}
              </Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default DialogManagerQueryBar;
