import React from 'react';
import { TItem, TabForm, FormRules, TSelect } from '@/components/tis_ui';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import { Select, Input } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import {
  commonApplicationType,
  commonObjectType, commonYesNo, matterApprovalSystemType, matterExerciseLevel, matterProvinceProvideName,
  matterSource,
  matterStatus, matterSystemOpenStatus,
} from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo({ disabled, changeObjectType = EmptyFn, ...props }) {
  return (
    <TabForm.Tab {...props}>
      <TItem name="title" label="事项名称" {...layout}>
        <Input disabled={disabled} placeholder="请输入事项名称" />
      </TItem>
      <TItem name="name" label="分项名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} placeholder="请输入分项名称" />
      </TItem>
      <TItem name="subItemName" label="办理项名称" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理项名称" />
      </TItem>
      <TItem name="provinceProvideName" label="省市监控提供事项名称" {...layout}>
        <Input disabled={disabled} placeholder="请输入省市监控提供事项名称" />
      </TItem>
      <TItem name="exerciseLevel" label="行使层级" {...layout}>
        <TSelect
          disabled={disabled}
          placeholder="请选择行使层级"
        >
          {_.map(matterExerciseLevel, (v, k) => (
            <Select.Option key={k} value={v} label={matterExerciseLevel.$names[k]}>
              {matterExerciseLevel.$names[k]}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="approvalResultLicense" label="审批结果证照" {...layout}>
        <Input disabled={disabled} placeholder="请输入审批结果证照" />
      </TItem>
      <TItem name="isCorrespondTo51" label="是否与51本证照对应" {...layout}>
        <TSelect
          disabled={disabled}
          placeholder="请选择是否与51本证照对应"
        >
          {_.map(commonYesNo, (v, k) => (
            <Select.Option key={k} value={v} label={commonYesNo.$names[k]}>
              {commonYesNo.$names[k]}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="nonCollectionReason" label="未归集原因" {...layout}>
        <Input disabled={disabled} placeholder="请输入未归集原因" />
      </TItem>
      <TItem name="approvalSystem" label="对应审批系统" {...layout}>
        <Input disabled={disabled} placeholder="请输入对应审批系统" />
      </TItem>
      <TItem name="approvalSystemType" label="对应审批系统类型" {...layout}>
        <TSelect
          disabled={disabled}
          placeholder="请选择对应审批系统类型"
        >
          {_.map(matterApprovalSystemType, (v, k) => (
            <Select.Option key={k} value={v} label={matterApprovalSystemType.$names[k]}>
              {matterApprovalSystemType.$names[k]}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="systemOpenStatus" label="系统打通情况" {...layout}>
        <TSelect
          disabled={disabled}
          placeholder="请选择系统打通情况"
        >
          {_.map(matterSystemOpenStatus, (v, k) => (
            <Select.Option key={k} value={v} label={matterSystemOpenStatus.$names[k]}>
              {matterSystemOpenStatus.$names[k]}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="matterCode" label="事项编码" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} placeholder="请输入事项编码" />
      </TItem>
      <TItem name="code" label="主项编码" {...layout}>
        <Input disabled={disabled} placeholder="请输入主项编码" />
      </TItem>
      <TItem name="subItemCode" label="分项编码" {...layout}>
        <Input disabled={disabled} placeholder="请输入分项编码" />
      </TItem>
      <TItem name="object" label="对象类型" {...layout}>
        <Select
          disabled={disabled}
          placeholder="请选择对象类型"
          onChange={val => changeObjectType(val)}
        >
          {_.map(commonObjectType, (v, k) => (
            <Select.Option key={k} value={v} label={commonObjectType.$names[k]}>
              {commonObjectType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          disabled={disabled}
          dict="ZDLX"
          dictType="tree"
          multiple
          placeholder="请选择终端类型"
        />
      </TItem>
      <TItem name="appType" label="应用类型" {...layout}>
        <TSelect disabled={disabled} mode="multiple" allowClear>
          {_.map(commonApplicationType, (v, k) => (
            <TSelect.Option key={k} value={v}>
              {commonApplicationType.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="disassembly" label="事项状态" {...layout}>
        <Select disabled={disabled} placeholder="请选择事项状态">
          {_.map(matterStatus, (v, k) => (
            <Select.Option key={k} value={v} label={matterStatus.$names[k]}>
              {matterStatus.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="matterType" label="事项分类" {...layout}>
        <Input disabled={disabled} placeholder="请输入事项分类" />
      </TItem>
      <TItem name="source" label="事项来源" {...layout}>
        <Select disabled={disabled} placeholder="请选择事项来源">
          {_.map(matterSource, (v, k) => (
            <Select.Option key={k} value={v} label={matterSource.$names[k]}>
              {matterSource.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="lawBasisArr" label="法律依据" {...layout}>
        <TSearchSelector disabled={disabled} type="law" placeholder="请选择法律依据" />
      </TItem>
      <TItem name="term" label="承诺期限" {...layout}>
        <Input disabled={disabled} placeholder="请输入承诺期限" />
      </TItem>
      <TItem name="phone" label="咨询电话" {...layout}>
        <Input disabled={disabled} placeholder="请输入咨询电话" />
      </TItem>
      <TItem name="acceptTime" label="办理时间" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理时间" />
      </TItem>
      <TItem name="address" label="办理地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理地址" />
      </TItem>
      <TItem name="fileImg" label="流程图地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入流程图地址" />
      </TItem>
      <TItem name="regions" label="行政区划" {...layout}>
        <DictSelect
          disabled={disabled}
          dict="SH00XZQH"
          dictType="tree"
          allowClear
          placeholder="请选择行政区划"
        />
      </TItem>
      <TItem name="department" label="实施部门" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          disabled={disabled}
          showSearch
          allowClear
          treeNodeFilterProp="title"
          dictType="tree"
          treeDefaultExpandAll
          treeNodeLabelProp="title"
          dict="SHSSBMSH"
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
