import React from 'react';
import { connect } from 'dva';
import { Row, Input } from 'antd';
import { TabForm, TItem, FormRules, EmptyFn, TSelect, TRadioWithText } from '@/components/tis_ui';
import { DictIdSelect, DictSelect } from '@/components/bussinessComponents';
import MultiRootDictTreeSelect from '@/components/bussinessComponents/Dict/MultiRootDictTreeSelect';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { objectDict } from '@/constants';
import _ from 'lodash';
import { commonApplicationType, commonAbsence } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function PolicyProps({
  form,
  initSingleSelect,
  disabled = true,
  setObjectType = EmptyFn,
  showPredict,
  ...others
}) {
  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem
          label="政策名称"
          name="name"
          rules={[{ required: true, message: '政策名称不能为空!' }]}
          {...layout}
        >
          <Input disabled={disabled} />
        </TItem>
        <TItem label="政策文号" name="code" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem
          label="政策级别"
          rules={[{ required: true, message: '政策级别不能为空!' }]}
          name="level"
          {...layout}
        >
          <DictSelect dict="ZCJB0001" disabled={disabled} />
        </TItem>
        <TItem
          label="政策分类"
          name="category"
          rules={[FormRules.required('政策类型不能为空')]}
          {...layout}
        >
          <DictIdSelect
            disabled={disabled}
            dict="ZCFL"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem
          label="政策分类(机提)"
          name={['policyInfoPredicted', 'category']}
          style={{ display: !showPredict && 'none' }}
          {...layout}
        >
          <MultiRootDictTreeSelect needFormat={false} disabled multiple dict="ZCFL" />
        </TItem>
        {disabled && (
          <>
            <TItem name="createTime" label="创建时间" {...layout}>
              <Input disabled />
            </TItem>
            <TItem name="collectDepartment" label="创建部门" {...layout}>
              <DepartmentTreeSelect disabled />
            </TItem>
          </>
        )}
        <TItem
          label="发布部门"
          name="publishDepartment"
          rules={[{ required: true, message: '发布部门不能为空!' }]}
          {...layout}
        >
          <DepartmentTreeSelect disabled={disabled} />
        </TItem>
        <TItem name="derive" label="政策来源" {...layout}>
          <DictSelect
            multiple
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="ZCLY"
            disabled={disabled}
          />
        </TItem>
        {disabled && (
          <>
            <TItem name="updateTime" label="更新时间" {...layout}>
              <Input disabled />
            </TItem>
            <TItem name="updateDept" label="更新部门" {...layout}>
              <DepartmentTreeSelect disabled />
            </TItem>
          </>
        )}
        <TItem label="原文链接" name="url" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem
          label="咨询电话"
          name="phone"
          // rules={[FormRules.required('咨询电话必填!'), FormRules.phone()]}
          // rules={[FormRules.required('咨询电话必填!')]}
          {...layout}
        >
          <Input disabled={disabled} />
        </TItem>
        <TItem
          label="行政区划"
          name="regions"
          rules={[{ required: true, message: '行政区划不能为空!' }]}
          {...layout}
        >
          <DictSelect
            disabled={disabled}
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeNodeLabelProp="title"
            dict="SH00XZQH"
          />
        </TItem>

        <TItem
          label="对象类型"
          name="objectType"
          rules={[{ required: true, message: '对象类型不能为空!' }]}
          {...layout}
        >
          <DictSelect
            onChange={val => {
              setObjectType(val);
              form.setFieldsValue({ threeType: undefined });
              if (val === objectDict.legalPerson) {
                form.setFieldsValue({ personalUnnecessaryPortraitTag: [] });
                form.setFieldsValue({ personalPortraitTag: [] });
                form.setFieldsValue({ restrictiveCondition: [] });
              }
              if (val === objectDict.person) {
                form.setFieldsValue({ legalPersonPortraitTag: [] });
                form.setFieldsValue({ legalPersonUnnecessaryPortraitTag: [] });
                form.setFieldsValue({ restrictiveConditionLegalPerson: [] });
              }
            }}
            disabled={disabled}
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dictType="tree"
            dict="DXLX0001"
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

        <TItem
          name="clientType"
          label="终端类型"
          rules={[{ required: true, message: '终端类型必填' }]}
          {...layout}
        >
          <DictSelect dict="ZDLX" dictType="tree" multiple disabled={disabled} />
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
      </Row>
    </TabForm.Tab>
  );
}

export default connect(({ policyContent }) => ({ createParams: policyContent.createParams }))(
  PolicyProps,
);
