import React from 'react';
import { Input } from 'antd';
import { QueryBarCard, TItem } from '@/components/tis_ui';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

function OneFormQueryBar(props) {
  return (
    <QueryBarCard {...props}>
      <TItem col={8} label="ID" name="formId" {...layout}>
        <Input allowClear />
      </TItem>
      <TItem col={8} label="表单名称" name="formName" {...layout}>
        <Input allowClear />
      </TItem>
    </QueryBarCard>
  );
}

export default OneFormQueryBar;
