import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { connect } from 'dva';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { policyUpDownStatus, appUserType, commonYesNo } from '@/utils/constantEnum';

@connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class TriggerWordsQueryBar extends PureComponent {
  render() {
    const { onForm, deptCode, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="description" label="触发词描述">
          <Input />
        </TItem>
        <TItem col={6} name="type" label="触发词类型" tip="字典：CFCLX">
          <DictSelect
            dict="CFCLX"
            name="objectType"
            dictType="tree"
            showArrow
            leafOnly
            style={{ width: '100%' }}
          />
        </TItem>
        <TItem col={6} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (key, value) => (
              <Select.Option key={key} value={key}>
                {appUserType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" showArrow />
        </TItem>
        <TItem col={6} name="regions" label="行政区划" tip="字典：SH00XZQH">
          <DictSelect
            dict="SH00XZQH"
            name="regions"
            dictType="tree"
            allowClear
            showArrow
            style={{ width: '100%' }}
          />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select allowClear>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="tourist" label="是否游客">
          <Select allowClear>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="attributionDepartment" label="归属部门">
          <DictSelect dict={deptCode} dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default TriggerWordsQueryBar;
