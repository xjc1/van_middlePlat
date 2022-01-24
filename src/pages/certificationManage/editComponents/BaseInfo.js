import React from 'react';
import { TItem, TabForm, FormRules } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo(props) {
  const { editVisible } = props;

  return (
    <TabForm.Tab {...props}>
      <TItem name="name" label="证照名称"
             rules={[FormRules.required('必填')]}
             {...layout}>
        <Input placeholder="请输入证照名称"
               disabled={!editVisible} />
      </TItem>
      <TItem name="code" label="证照编码"
             rules={[FormRules.required('必填')]}
             {...layout}>
        <Input placeholder="请输入证照编码" disabled={!editVisible} />
      </TItem>
      <TItem name="formatCode"
             label="证照格式编码" {...layout}>
        <Input placeholder="请输入证照编码" disabled={!editVisible} />
      </TItem>
      <TItem name="objectType"
             label="对象类型"
             rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect dict="DXLX0001" allowClear />
      </TItem>
      <TItem name="depart"
             label="发证部门" {...layout}>
        <Input placeholder="请输入发证部门" disabled={!editVisible} />
      </TItem>
      <TItem name="type"
             label="证照类型" {...layout}>
        <Input placeholder="请输入证照类型" disabled={!editVisible} />
      </TItem>
      <TItem name="category"
             label="证照类别" {...layout}>
        <Input placeholder="请输入证照类别" disabled={!editVisible} />
      </TItem>
      <TItem name="level"
             label="证照级别" {...layout}>
        <Input placeholder="请输入证照级别" disabled={!editVisible} />
      </TItem>
      <TItem name="source"
             label="证照来源" {...layout}>
        <Input placeholder="请输入证照来源" disabled={!editVisible} />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
