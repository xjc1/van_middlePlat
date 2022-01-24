import React from 'react';
import { TItem, TabForm, FormRules, RichText, TSelect } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { sourceType } from '@/utils/constantEnum';
import { Input } from 'antd';
import _ from 'lodash';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import AcceptDepartment from './AcceptDepartment';
import TimeTable from './TimeTable';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const { Option } = TSelect;

function BaseInfo(props) {
  const { editVisible, formRef, setPortraitType } = props;

  return (
    <TabForm.Tab {...props}>
      <TItem name="name" label="项目名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input placeholder="请输入项目名称" disabled={!editVisible} />
      </TItem>
      <TItem name="policyLevel" label="政策级别" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect dict="ZCJB0001" disabled={!editVisible} />
      </TItem>
      <TItem name="regions" label="行政区划" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="SH00XZQH"
          disabled={!editVisible}
          treeNodeFilterProp="title"
          showSearch
          dictType="tree"
        />
      </TItem>
      <TItem name="objectType" label="面向对象" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          disabled={!editVisible}
          dict="DXLX0001"
          dictType="tree"
          treeNodeFilterProp="title"
          onChange={val => {
            setPortraitType(val);
            formRef.setFieldsValue({ projectTypes: undefined });
          }}
        />
      </TItem>
      <TItem name="condition" label="申报条件" rules={[FormRules.required('必填')]} {...layout}>
        <RichText base64 readOnly={!editVisible} />
      </TItem>
      <TItem name="supportEffort" label="扶持力度" {...layout}>
        <RichText base64 readOnly={!editVisible} />
      </TItem>
      <TItem name="acceptDate" label="申报时间详情" {...layout}>
        <Input disabled={!editVisible} />
      </TItem>
      <TItem name="timeTags" label="申报时间" {...layout}>
        <TimeTable disabled={!editVisible} />
      </TItem>
      <TItem name="departments" label="受理部门" rules={[FormRules.required('必填')]} {...layout}>
        <AcceptDepartment form={formRef} disabled={!editVisible} />
      </TItem>
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="ZDLX"
          dictType="tree"
          multiple
          placeholder="请选择终端类型"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name="sourceType" label="来源方式" rules={[FormRules.required('必填')]} {...layout}>
        <TSelect disabled={!editVisible}>
          {_.map(sourceType, (v, k) => (
            <Option value={v} key={k}>
              {sourceType.$names[k]}
            </Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="source" label="项目来源" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect dict="LYQD0001" placeholder="请选择项目来源" disabled={!editVisible} />
      </TItem>
      <TItem name="support" label="扶持力度简称" {...layout}>
        <Input placeholder="请输入扶持力度简称" disabled={!editVisible} />
      </TItem>
      <TItem name="supportHighlight" label="高亮展示字段" {...layout}>
        <Input placeholder="请输入高亮展示字段" disabled={!editVisible} />
      </TItem>
      <TItem name="createTime" label="创建时间" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name="collectDepartment" label="创建部门" {...layout}>
        <DepartmentTreeSelect disabled />
      </TItem>
      <TItem name="updateTime" label="更新时间" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name="updateDept" label="更新部门" {...layout}>
        <DepartmentTreeSelect disabled />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
