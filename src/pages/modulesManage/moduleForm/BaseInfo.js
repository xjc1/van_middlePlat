import React from 'react';
import { FormRules, TabForm, TItem, TSelect } from '@/components/tis_ui';
import { Input } from 'antd';
import _ from 'lodash';
import { recommendAppUserType } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo({ disabled = false, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <TItem name="name" label="模块名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} allowClear />
      </TItem>
      <TItem name="code" label="模块编码" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} allowClear />
      </TItem>
      <TItem name="object" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
        <TSelect disabled={disabled} allowClear>
          {_.map(recommendAppUserType, (v, k) => (
            <TSelect.Option key={k} value={v}>
              {recommendAppUserType.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="region" label="行政区划" {...layout}>
        <DictSelect
          disabled={disabled}
          multiple
          dict="SH00XZQH"
          dictType="tree"
          allowClear
          placeholder="请选择行政区划"
        />
      </TItem>
      <TItem name="clientType" label="终端类型" {...layout}>
        <DictSelect dict="ZDLX" dictType="tree" multiple disabled={disabled} />
      </TItem>
      <TItem name="description" label="模块简介" {...layout}>
        <Input.TextArea disabled={disabled} allowClear />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
