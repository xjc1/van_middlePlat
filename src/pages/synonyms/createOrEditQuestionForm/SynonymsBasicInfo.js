import React from 'react';
import { Row, Input, Select } from 'antd';
import { TabForm, TItem, FormRules as Rules, FormRules, TRadioWithText } from '@/components/tis_ui';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType, commonAbsence } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SynonymsBasicInfo({ check, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem name="question" label="问题" rules={[Rules.required('问题必填')]} {...layout}>
          <Input disabled={check} />
        </TItem>
        <TItem name="answer" label="答案" rules={[Rules.required('答案必填')]} {...layout}>
          <Input.TextArea rows={4} disabled={check} />
        </TItem>
        <TItem name="regions" label="行政区划" rules={[Rules.required('必填')]} {...layout}>
          <DictSelect
            dict="SH00XZQH"
            disabled={check}
            treeNodeFilterProp="title"
            showSearch
            dictType="tree"
            rules={[Rules.required('行政区划必填')]}
          />
        </TItem>
        <TItem name="relationMatchPolicy" label="关联政策" {...layout}>
          <TSearchSelector type="policyLibrary" disabled={check} />
        </TItem>
        <TItem name="relationMatchMatters" label="关联事项" {...layout}>
          <TSearchSelector type="matter" disabled={check} />
        </TItem>
        <TItem name="relationMatchService" label="关联服务" {...layout}>
          <TSearchSelector type="convenience" disabled={check} />
        </TItem>
        <TItem name="relationMatchProject" label="关联项目" {...layout}>
          <TSearchSelector type="project" disabled={check} />
        </TItem>
        <TItem name="relationMatchArticle" label="关联文章" {...layout}>
          <TSearchSelector type="article" />
        </TItem>
        {check && (
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
        <TItem name="clientType" label="终端类型" {...layout}>
          <DictSelect dict="ZDLX" dictType="tree" disabled={check} multiple />
        </TItem>
        <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
          <Select disabled={check}>
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
          rules={[FormRules.required('必填')]}
          {...layout}
        >
          <DictSelect
            disabled={check}
            dict="SHGSBMSH"
            dictType="tree"
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem
          label="线上帮办"
          name="onlineHelp"
          {...layout}
          disabled={check}
          rules={[{ required: true, message: '线上帮办必填' }]}
        >
          <TRadioWithText
            contentCol={4}
            disabled={check}
            datasource={commonAbsence}
            text="（若该内容为线上帮办使用，请勾选【是】，否则请勾选【否】）"
          />
        </TItem>
      </Row>
    </TabForm.Tab>
  );
}

export default SynonymsBasicInfo;
