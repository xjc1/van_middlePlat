import React from 'react';
import { Row, Input } from 'antd';
import { TItem, FormCard, FormRules } from '@/components/tis_ui';
import { DictSelect, DictCascader } from '@/components/bussinessComponents';

function SettingOfQuestion({ readOnly = false }) {
  return (
    <FormCard title="问题配置" bordered={false}>
      <Row style={{ flex: 'auto', minWidth: 0 }}>
        <TItem label="知识名称" name="name" rules={[FormRules.required('必填')]}>
          <Input disabled={readOnly} />
        </TItem>
        <TItem label="调节词" name="tuningWord">
          <Input disabled={readOnly} />
        </TItem>
        <TItem label="行政区划" name="regions">
          <DictSelect dict="SH00XZQH" dictType="tree" disabled={readOnly} />
        </TItem>
        <TItem name="department" label="实施部门">
          <DictCascader
            dict="SHSSBMSH"
            showSearch
            placeholder="请选择实施部门"
            disabled={readOnly}
          />
        </TItem>
      </Row>
    </FormCard>
  );
}

export default SettingOfQuestion;
