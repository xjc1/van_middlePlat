import React from 'react';
import { Input, Select } from 'antd';
import { FormRules as Rules, FormRules, RichText, TItem } from '@/components/tis_ui';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo({ disabled = false }) {
  return (
    <>
      <TItem name="topic" label="解读主题" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="content" label="解读内容" rules={[FormRules.required('必填')]} {...layout}>
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TItem name="regions" label="行政区划" rules={[Rules.required('必填')]} {...layout}>
        <DictSelect
          dict="SH00XZQH"
          disabled={disabled}
          treeNodeFilterProp="title"
          showSearch
          dictType="tree"
          rules={[Rules.required('行政区划必填')]}
        />
      </TItem>
      <TItem label="原文链接" name="sourceUrl" {...layout}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="createTime" label="创建时间" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name="collectDepartment" label="创建部门" {...layout}>
        <DepartmentTreeSelect disabled />
      </TItem>
      <TItem name="relatedPolicies" label="关联政策" {...layout}>
        <TSearchSelector type="policyLibrary" disabled={disabled} />
      </TItem>
      <TItem name="relatedMatters" label="关联事项" {...layout}>
        <TSearchSelector type="matter" disabled={disabled} />
      </TItem>
      <TItem name="relatedServices" label="关联服务" {...layout}>
        <TSearchSelector type="convenience" disabled={disabled} />
      </TItem>
      <TItem name="relatedProjects" label="关联项目" {...layout}>
        <TSearchSelector type="project" disabled={disabled} />
      </TItem>
      <TItem name="relatedArticles" label="关联文章" {...layout}>
        <TSearchSelector type="article" disabled={disabled} />
      </TItem>
      <TItem name="updateTime" label="更新时间" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name="updateDept" label="更新部门" {...layout}>
        <DepartmentTreeSelect disabled />
      </TItem>
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="ZDLX"
          dictType="tree"
          placeholder="请选择终端类型"
          multiple
          disabled={disabled}
        />
      </TItem>
      <TItem name="attributionDepartment" label="归属部门" tip="字典: SHGSBMSH" {...layout}>
        <DictSelect
          disabled={disabled}
          dict="SHGSBMSH"
          dictType="tree"
          showSearch
          multiple
          treeNodeFilterProp="title"
        />
      </TItem>
      <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
        <Select disabled={disabled}>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
    </>
  );
}

export default BaseInfo;
