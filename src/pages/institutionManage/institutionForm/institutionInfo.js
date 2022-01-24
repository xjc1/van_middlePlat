import React from 'react';
import { Input, Select } from 'antd';
import { FormRules, RichText, TItem, TRadioWithText } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import _ from 'lodash';
import { appUserType, commonAbsence } from '@/utils/constantEnum';

function InstitutionInfo(props) {
  const { disabled } = props;

  return (
    <>
      <TItem
        name="code"
        label="部门编码"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[a-zA-Z0-9]+$/, 'g'),
            message: '部门编码仅支持字母或数组',
          },
        ]}
      >
        <Input disabled={disabled} />
      </TItem>
      <TItem name="name" label="部门名称" rules={[{ required: true }]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="summary" label="部门简介">
        <RichText readOnly={disabled} base64 />
      </TItem>
      <TItem name="regions" label="行政区划" rules={[{ required: true }]}>
        <DictSelect
          dict="SH00XZQH"
          dictType="tree"
          allowClear
          placeholder="请选择行政区划"
          disabled={disabled}
        />
      </TItem>
      <TItem name="phone" label="联系电话" rules={[{ required: true }]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="address" label="联系地址" rules={[{ required: true }]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="postalCode" label="邮政编码" rules={[{ required: true }]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="officialAddress" label="官网地址">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="memo" label="备注">
        <Input disabled={disabled} />
      </TItem>
      {disabled && (
        <>
          <TItem name="createTime" label="创建时间">
            <Input disabled />
          </TItem>
          <TItem name="collectDepartment" label="创建部门">
            <DepartmentTreeSelect disabled />
          </TItem>
          <TItem name="updateTime" label="更新时间">
            <Input disabled />
          </TItem>
          <TItem name="updateDept" label="更新部门">
            <DepartmentTreeSelect disabled />
          </TItem>
        </>
      )}
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]}>
        <DictSelect dict="ZDLX" dictType="tree" multiple disabled={disabled} />
      </TItem>
      <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]}>
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

export default InstitutionInfo;
