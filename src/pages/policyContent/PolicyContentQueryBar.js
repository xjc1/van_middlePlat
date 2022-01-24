import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import { policyUpDownStatus, policyCheckDuplicateType, commonYesNo, policyGraphLink } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

@connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class PolicyContentQuerybar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, deptCode, initialValues, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        initialValues={{
          showDuplicatePolicy: 0,
          ...initialValues,
          status: Number(initialValues.status || -1),
        }}
        {...others}
      >
        <TItem col={6} name="name" label="政策名称" {...layout}>
          <Input />
        </TItem>
        <TItem col={6} name="code" label="政策文号" {...layout}>
          <Input />
        </TItem>
        <TItem col={6} name="clientType" label="终端类型" {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={6} name="district" label="行政区划" {...layout}>
          <DictSelect
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeNodeLabelProp="title"
            dict="SH00XZQH"
          />
        </TItem>
        {/* <TItem col={6} name="maintenance" label="维护机构">
          <Input />
        </TItem> */}
        <TItem col={6} name="status" label="上下架状态" {...layout}>
          <Select>
            <Select.Option key="ALL" value={-1}>
              全部
            </Select.Option>
            {_.map(policyUpDownStatus, (v, k) => (
              <Select.Option key={k} value={v}>
                {policyUpDownStatus.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem col={6} name="publishDept" label="发布部门" {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>

        <TItem col={6} name="attributionDepartment" label="归属部门" {...layout}>
          <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>

        <TItem col={6} name="department" label="实施部门" {...layout}>
          <DictSelect
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeNodeLabelProp="title"
            dict="SHSSBMSH"
          />
        </TItem>

        <TItem expanded col={6} name="dupCheckType" label="查重" {...layout}>
          <Select allowClear>
            {_.map(policyCheckDuplicateType, (v, k) => (
              <Select.Option key={k} value={v}>
                {policyCheckDuplicateType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem expanded col={6} label="对象类型" name="objectType" {...layout}>
          <DictSelect
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dictType="tree"
            dict="DXLX0001"
          />
        </TItem>
        <TItem expanded col={6} name="policyAtlas" label="政策图谱" {...layout}>
          <TSelect>
            {_.map(policyGraphLink, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyGraphLink.$names[value]}
              </Select.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PolicyContentQuerybar;
