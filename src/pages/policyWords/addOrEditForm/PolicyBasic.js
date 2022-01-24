import React, { Fragment } from 'react';
import { FormRules, RichText, TItem, TRadioWithText } from '@/components/tis_ui';
import { Input, Row, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType, commonAbsence } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function PolicyBasic({ isCheck }) {
  return (
    <Fragment>
      <Row>
        <TItem
          name="name"
          label="词条名称"
          {...layout}
          rules={[{ required: true, message: '词条名称不能为空!' }]}
        >
          <Input disabled={isCheck} />
        </TItem>
        <TItem
          name="explain"
          label="词条解释"
          rules={[{ required: true, message: '词条解释不能为空!' }]}
          {...layout}
        >
          <RichText readOnly={isCheck} />
        </TItem>
        <TItem name="basicFiles" label="依据文件名称" {...layout}>
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="basicUrls" label="依据文件链接" {...layout}>
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="operator" label="采录人" {...layout}>
          <Input disabled />
        </TItem>
        {isCheck && (
          <>
            <TItem name="createTime" label="创建时间" {...layout}>
              <Input disabled />
            </TItem>{' '}
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
        <TItem name="attributionDepartment" label="归属部门" tip="字典: SHGSBMSH" {...layout}>
          <DictSelect
            disabled={isCheck}
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
          <Select disabled={isCheck}>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem
          name="clientType"
          label="终端类型"
          {...layout}
          rules={[{ required: true, message: '终端类型不能为空!' }]}
        >
          <DictSelect dict="ZDLX" dictType="tree" showArrow disabled={isCheck} multiple />
        </TItem>
        <TItem
          label="线上帮办"
          name="onlineHelp"
          {...layout}
          disabled={isCheck}
          rules={[{ required: true, message: '线上帮办必填' }]}
        >
          <TRadioWithText
            contentCol={6}
            disabled={isCheck}
            datasource={commonAbsence}
            text="（若该内容为线上帮办使用，请勾选【是】，否则请勾选【否】）"
          />
        </TItem>
      </Row>
    </Fragment>
  );
}

export default PolicyBasic;
