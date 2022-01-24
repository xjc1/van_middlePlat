import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import { connect } from 'dva';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

@connect(({ synonyms, user }) => ({
  ...synonyms,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class SynonymsQuerybar extends PureComponent {
  render() {
    const { onForm, actions, footer } = this.props;
    return (
      <QueryBarCard onForm={onForm} actions={actions} footer={footer}>
        <TItem col={6} {...layout} name="question" label="问题名称">
          <Input />
        </TItem>
        <TItem col={6} {...layout} name="matterName" label="涉及事项">
          <Input />
        </TItem>
        <TItem name="clientType" label="终端类型" col={6} {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem name="status" label="上下架状态" col={6} {...layout}>
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} {...layout} name="regions" label="行政区划">
          <DictSelect
            dict="SH00XZQH"
            name="regions"
            dictType="tree"
            allowClear
            style={{ width: '100%' }}
          />
        </TItem>

        <TItem col={6} {...layout} name="sourceType" label="来源渠道">
          <Input />
        </TItem>
        <TItem col={6} {...layout} name="source" label="来源方式">
          <Input />
        </TItem>
        <TItem
          tip="字典: SHGSBMSH"
          col={6}
          {...layout}
          name="attributionDepartment"
          label="归属部门"
        >
          <DictSelect dict="SHGSBMSH" dictType="tree" treeNodeFilterProp="title" />
        </TItem>
        <TItem expanded col={6} {...layout} name="publishDept" label="发布部门">
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>
        <TItem tip="字典: SHSSBMSH" expanded col={6} {...layout} name="department" label="部门">
          <DictSelect allowClear dict="SHSSBMSH" name="department" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default SynonymsQuerybar;
