import React from 'react';
import { Input, Select } from 'antd';
import {
  FormRules as Rules,
  FormRules,
  RichText,
  TItem,
  TRadioWithText,
} from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';
import { appUserType, commonAbsence } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo({ disabled = false }) {
  return (
    <>
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
      <TItem name="number" label="热线电话" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="summary" label="热线简介" {...layout}>
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TItem
        label="单位名称"
        name="departmentName"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <DictSelect
          disabled={disabled}
          dict="DWBM"
          dictType="tree"
          showSearch
          treeNodeFilterProp="title"
        />
      </TItem>
      <TItem label="备注" name="note" {...layout}>
        <Input disabled={disabled} />
      </TItem>
      {disabled && (
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
          placeholder="请选择终端类型"
          multiple
          disabled={disabled}
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
      <TItem
        name="attributionDepartment"
        label="归属部门"
        tip="字典: SHGSBMSH"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <DictSelect
          disabled={disabled}
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
        disabled={disabled}
        rules={[{ required: true, message: '线上帮办必填' }]}
      >
        <TRadioWithText
          contentCol={4}
          disabled={disabled}
          datasource={commonAbsence}
          text="（若该内容为线上帮办使用，请勾选【是】，否则请勾选【否】）"
        />
      </TItem>
    </>
  );
}

export default BaseInfo;
