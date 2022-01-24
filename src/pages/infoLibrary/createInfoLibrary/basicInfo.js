import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard, RichText } from '@/components/tis_ui';
import {
  DictSelect,
  ConditionSelector,
  MultiTableDictCascader,
} from '@/components/bussinessComponents';
import { appUserType, implementationLevel } from '@/utils/constantEnum';
import { Input, Row, Select, InputNumber } from 'antd';
import _ from 'lodash';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
  col: 12,
};

function BasicInfo(props) {
  return (
    <>
      <FormCard title="基本信息" style={{ border: 'unset' }}>
        <Row>
          <TItem rules={[FormRules.required()]} {...layout} name="code" label="主题编码">
            <Input placeholder="请输入主题编码" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="name" label="主题名称">
            <Input placeholder="请输入主题名称" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="lifecycle" label="生命周期">
            {/* <Input placeholder="请输入生命周期" /> */}
            <DictSelect
              dictType="tree"
              labelInValue
              showSearch
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              treeNodeLabelProp="title"
              dict="1000"
            />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="object" label="服务对象">
            {/* <Input placeholder="请输入服务对象" /> */}
            <Select>
              {_.map(appUserType, (v, k) => (
                <Select.Option key={k} value={v}>
                  {appUserType.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="executiveLevel" label="实施层级">
            {/* <Input placeholder="请输入实施层级" /> */}
            <Select>
              {_.map(implementationLevel, (v, k) => (
                <Select.Option key={k} value={v}>
                  {implementationLevel.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="regions" label="行政区划">
            {/* <Input placeholder="请输入行政区划" /> */}
            <DictSelect dict="SH00XZQH" treeNodeFilterProp="title" showSearch dictType="tree" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="headDept" label="牵头部门">
            {/* <Input placeholder="请输入牵头部门" /> */}
            <DictSelect dict="SHSSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="cooperationOrg" label="联办机构">
            <Input placeholder="请输入联办机构" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="executiveSubject" label="实施主体">
            {/* <Input placeholder="请输入实施主体" /> */}
            <DictSelect dict="SHSSBMSH" dictType="tree" treeNodeFilterProp="title" showSearch />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="promiseDays" label="承诺办理时间">
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入承诺办理时间(天)" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="netHandleExtent" label="网办程度">
            {/* <Input placeholder="请输入网办程度" /> */}
            <DictSelect dict="WBCD" treeNodeFilterProp="title" showSearch />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="count" label="事项服务数">
            {/* <Input placeholder="请输入事项服务数" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入事项服务数(个)" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="phone" label="办理电话" rule={[FormRules.phone()]}>
            <Input  placeholder="请输入办理电话" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="address" label="办理地址">
            <Input placeholder="请输入办理地址" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="url" label="链接地址">
            <Input placeholder="请输入链接地址" />
          </TItem>
        </Row>
      </FormCard>
      <FormCard title="优化信息" style={{ border: 'unset', marginTop: 10 }}>
        <Row>
          <TItem rules={[FormRules.required()]} {...layout} name="originalHandleDays" label="原办理时间（工作日）">
            {/* <Input placeholder="请输入原办理时间" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入原办理时间（工作日）" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="currentHandleDays" label="现办理时间（工作日）">
            {/* <Input placeholder="请输入现办理时间" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入现办理时间（工作日）" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="originalHandleNum" label="原跑动次数">
            {/* <Input placeholder="请输入原跑动次数" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入原跑动次数" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="currentHandleNum" label="现跑动次数">
            {/* <Input placeholder="请输入现跑动次数" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入现跑动次数" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="originalMaterialNum" label="原材料数">
            {/* <Input placeholder="请输入原材料数" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入原材料数(份)" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="currentMaterialNum" label="现材料数">
            {/* <Input placeholder="请输入现材料数" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入现材料数(份)" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="originalFormNum" label="原填表项">
            {/* <Input placeholder="请输入原填表项" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入原填表项数" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="currentFormNum" label="现填表项">
            {/* <Input placeholder="请输入现填表项" /> */}
            <InputNumber style={{width: '100%'}} min={0} placeholder="请输入现填表项数" />
          </TItem>
          <TItem rules={[FormRules.required()]} {...layout} name="reasons" label="线下跑动原因和环节">
            <Input placeholder="请输入线下跑动原因和环节" />
          </TItem>
          {/* <TItem rules={[FormRules.required()]} {...layout} name="fillNotice" label="填报须知">
            <Input placeholder="请输入填报须知" />
          </TItem> */}
        </Row>
      </FormCard>

      <FormCard title="填报须知" style={{ border: 'unset', marginTop: 10 }}>
        <Row style={{ flex: 'auto' }}>
          <TItem rules={[FormRules.required()]}
            style={{ display: 'flex', justifyContent: 'center' }}
            name="fillNotice"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
          >
            <RichText />
          </TItem>
        </Row>
      </FormCard>
    </>
  );
}

export default BasicInfo;
