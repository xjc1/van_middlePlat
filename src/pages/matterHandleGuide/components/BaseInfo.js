import React from 'react';
import { TItem, TabForm, FormRules, RichText, TRadioWithText } from '@/components/tis_ui';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';
import { appUserType, commonAbsence } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo(props) {
  const { editVisible } = props;

  return (
    <TabForm.Tab {...props}>
      <TItem name="guideTopic" label="导办主题" rules={[FormRules.required('必填')]} {...layout}>
        <Input placeholder="请输入导办主题名称" disabled={!editVisible} />
      </TItem>
      <TItem name="guideContent" label="导办内容" rules={[FormRules.required('必填')]} {...layout}>
        <RichText base64 readOnly={!editVisible} />
      </TItem>
      <TItem name="regions" label="行政区划" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="SH00XZQH"
          dictType="tree"
          allowClear
          placeholder="请选择行政区划"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name="sourceUrl" label="原文链接" {...layout}>
        <Input placeholder="请输入原文链接" disabled={!editVisible} />
      </TItem>
      <TItem name="relatedPolicies" label="关联政策" {...layout}>
        <TSearchSelector type="policyLibrary" disabled={!editVisible} />
      </TItem>
      <TItem name="relatedMatters" label="关联事项" {...layout}>
        <TSearchSelector type="matter" disabled={!editVisible} />
      </TItem>
      <TItem name="relatedServices" label="关联服务" {...layout}>
        <TSearchSelector type="convenience" disabled={!editVisible} />
      </TItem>
      <TItem name="relatedProjects" label="关联项目" {...layout}>
        <TSearchSelector type="project" disabled={!editVisible} />
      </TItem>
      <TItem name="relatedArticles" label="关联文章" {...layout}>
        <TSearchSelector type="article" disabled={!editVisible} />
      </TItem>
      {!editVisible && (
        <>
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
        </>
      )}
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="ZDLX"
          dictType="tree"
          multiple
          placeholder="请选择终端类型"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
        <Select disabled={!editVisible}>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem
        name="attributionDepartment"
        label="归属部门"
        tip="字典: SHGSBMSH"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <DictSelect
          disabled={!editVisible}
          dict="SHGSBMSH"
          dictType="tree"
          showSearch
          multiple
          treeNodeFilterProp="title"
        />
      </TItem>
      <TItem
        label="线上帮办"
        name="onlineHelp"
        {...layout}
        disabled={!editVisible}
        rules={[{ required: true, message: '线上帮办必填' }]}
      >
        <TRadioWithText
          contentCol={4}
          disabled={!editVisible}
          datasource={commonAbsence}
          text="（若该内容为线上帮办使用，请勾选【是】，否则请勾选【否】）"
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
