import React from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { conditionObject, recommendContent, dataOrigin } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';

function RecommendTestQueryBar({ onForm, ...others }) {
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem name="type" label="对象类型">
        <Select allowClear>
          {_.map(conditionObject, (key, value) => (
            <Select.Option key={key} value={key}>
              {conditionObject.$names[value]}
            </Select.Option>
          ))}
        </Select>
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
      <TItem name="clientType" label="终端类型">
        <DictSelect dict="ZDLX" dictType="tree" />
      </TItem>
      <TItem name="contentType" label="推荐内容">
        <Select mode="multiple">
          {_.map(recommendContent, (key, value) => (
            <Select.Option key={key} value={key}>
              {recommendContent.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="userid" label="用户ID">
        <Input />
      </TItem>
      <TItem name="personInfo" label="用户信息">
        <Input.TextArea rows={3} />
      </TItem>
      <TItem name="sfzhm" label="身份证号码">
        <Input />
      </TItem>
      <TItem name="dataOrigin" label="数据来源">
        <Select mode="multiple">
          {_.map(dataOrigin, (key, value) => (
            <Select.Option key={key} value={key}>
              {dataOrigin.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
    </QueryBarCard>
  );
}

export default RecommendTestQueryBar;
