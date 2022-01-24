import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TLink } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect, DictCascader } from '@/components/bussinessComponents';
import _ from 'lodash';

import { commonContentType, commonObjectType } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const { Option } = Select;

const SCENE = () => {
  return (
    <>
      <TItem col={8} name="name" label="主题名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="publishDept" label="发布部门">
        <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
      </TItem>
      <TItem col={8} name="regions" label="行政区划">
        <DictSelect dict="SH00XZQH" dictType="tree" allowClear />
      </TItem>
      <TItem col={8} name="objectType" label="对象类型">
        <Select allowClear>
          <Option value="">全部</Option>
          {_.map(commonObjectType, (v, k) => (
            <Option value={v} key={k}>
              {commonObjectType.$names[k]}
            </Option>
          ))}
        </Select>
      </TItem>
    </>
  );
};
const MATTER = () => {
  return (
    <>
      <TItem col={8} name="name" label="事项名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="object" label="对象类型">
        <Select allowClear>
          <Option value="" label="全部">
            全部
          </Option>
          {_.map(commonObjectType, (v, k) => (
            <Option key={k} value={v} label={commonObjectType.$names[k]}>
              {commonObjectType.$names[k]}
            </Option>
          ))}
        </Select>
      </TItem>
      <TItem col={8} name="regions" label="行政区划">
        <DictSelect dict="SH00XZQH" dictType="tree" />
      </TItem>
    </>
  );
};
const QUESTION = () => {
  return (
    <>
      <TItem col={8} name="name" label="问答名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="regions" label="行政区划">
        <DictSelect
          dict="SH00XZQH"
          name="regions"
          dictType="tree"
          allowClear
          style={{ width: '100%' }}
        />
      </TItem>
      <TItem tip="字典: SHGSBMSH" col={8} name="attributionDepartment" label="归属部门">
        <DictSelect dict="SHGSBMSH" dictType="tree" treeNodeFilterProp="title" />
      </TItem>
    </>
  );
};
const SERVICE = () => {
  return (
    <>
      <TItem col={8} name="name" label="服务名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="objectType" label="对象类型">
        <DictSelect dict="DXLX0001" allowClear />
      </TItem>
      <TItem name="publishDept" label="发布部门" col={8}>
        <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
      </TItem>
    </>
  );
};
const POLICY = () => {
  return (
    <>
      <TItem col={8} name="name" label="政策名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="district" label="行政区划">
        <DictSelect
          showSearch
          treeNodeFilterProp="title"
          dictType="tree"
          treeNodeLabelProp="title"
          dict="SH00XZQH"
        />
      </TItem>
      <TItem col={8} name="publishDept" label="发布部门">
        <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
      </TItem>

      <TItem col={8} name="attributionDepartment" label="归属部门">
        <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
      </TItem>
    </>
  );
};
const WIKI = () => {
  return (
    <>
      <TItem col={8} name="name" label="百科名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="source" label="来源渠道">
        <DictSelect
          dict="LYQD0001"
          name="source"
          dictType="list"
          allowClear
          style={{ width: '100%' }}
        />
      </TItem>
      <TItem name="clientType" label="终端类型" col={8}>
        <DictSelect dict="ZDLX" dictType="tree" />
      </TItem>
    </>
  );
};
const PROJECT = () => {
  return (
    <>
      <TItem col={8} name="name" label="项目名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="publishDept" label="发布部门">
        <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
      </TItem>
      <TItem col={8} name="classification" label="项目分类">
        <DictCascader dict="XMYLNEW" />
      </TItem>
      <TItem col={8} name="objectType" label="面向对象">
        <DictSelect dict="DXLX0001" />
      </TItem>
      <TItem col={8} name="department" label="受理部门">
        <Input allowClear />
      </TItem>
    </>
  );
};
const ARTICLE = () => {
  return (
    <>
      <TItem col={8} name="name" label="文章名称">
        <Input allowClear />
      </TItem>
      <TItem col={8} name="level" label="文章级别">
        <DictSelect dict="ZCJB0001" />
      </TItem>
      <TItem col={8} name="region" label="行政区划">
        <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
      </TItem>
      <TItem col={8} name="attributionDepartment" label="归属部门">
        <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
      </TItem>
      <TItem name="objectType" label="对象类型" col={8}>
        <DictSelect dict="DXLX0001" dictType="tree" />
      </TItem>
    </>
  );
};

const QUERY_EXTERNAL = {
  [commonContentType.SCENE]: SCENE,
  [commonContentType.MATTER]: MATTER,
  [commonContentType.QUESTION]: QUESTION,
  [commonContentType.SERVICE]: SERVICE,
  [commonContentType.POLICY]: POLICY,
  [commonContentType.WIKI]: WIKI,
  [commonContentType.PROJECT]: PROJECT,
  [commonContentType.ARTICLE]: ARTICLE,
};

class AnswerQueryBar extends PureComponent {
  queryForm = null;

  render() {
    const { dispatch, list, focusItem, selectedType, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={form => {
          this.queryForm = form;
        }}
        {...others}
        onValuesChange={({ type }) => {
          if (!_.isUndefined(type)) {
            this.queryForm.resetFields();
            this.queryForm.setFieldsValue({ type });
          }
        }}
      >
        <TItem name="type" label="知识类型" col={8}>
          <Select>
            {_.map(commonContentType, (v, k) => (
              <Select.Option key={v} value={v}>
                {commonContentType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TLink dependencies={['type']}>
          {({ type }) => {
            const TITEMS = QUERY_EXTERNAL[type];
            return <TITEMS />;
          }}
        </TLink>
      </QueryBarCard>
    );
  }
}

export default AnswerQueryBar;
