import React from 'react';
import { FormRules, QueryBarCard, TItem, CodeEditor } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { modulesContentType } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';

function RecommendTestQueryBar({ onForm, ...others }) {
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem name="code" label="模块编码" rules={[FormRules.required('必填')]}>
        <Input />
      </TItem>
      <TItem name="uniqueId" label="证件号码">
        <Input />
      </TItem>
      <TItem name="region" label="行政区划">
        <DictSelect
          multiple
          dict="SH00XZQH"
          treeNodeFilterProp="title"
          showSearch
          dictType="tree"
          allowClear
          style={{ width: '100%' }}
        />
      </TItem>
      <TItem name="threeType" label="三级分类">
        <DictSelect dictType="tree" dict="1000" />
      </TItem>
      <TItem name="contentType" label="内容类型">
        <Select mode="multiple" allowClear>
          {_.map(modulesContentType, (key, value) => (
            <Select.Option key={key} value={key}>
              {modulesContentType.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="personInfo" label="用户信息">
        <CodeEditor mode="json" height="300px" />
      </TItem>
    </QueryBarCard>
  );
}

export default RecommendTestQueryBar;
