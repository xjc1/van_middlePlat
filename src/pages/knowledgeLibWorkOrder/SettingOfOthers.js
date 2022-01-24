import React from 'react';
import { Input, Row } from 'antd';
import _ from 'lodash';
import { FormCard, TItem, TSelect } from '@/components/tis_ui';
import { DictSelect, FileUpload } from '@/components/bussinessComponents';
import { sourceType, commonYesNo } from '@/utils/constantEnum';

const { Option } = TSelect;

function SettingOfOthers({ readOnly = false }) {
  return (
    <FormCard title="答案配置" bordered={false}>
      <Row style={{ flex: 'auto', minWidth: 0 }}>
        <TItem label="标签" name="tag">
          <Input disabled={readOnly} />
        </TItem>
        <TItem name="isHandle" label="是否梳理">
          <TSelect disabled={readOnly}>
            {_.map(commonYesNo, (key, value) => (
              <Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Option>
            ))}
          </TSelect>
        </TItem>
        <TItem label="梳理问法" name="title">
          <Input disabled={readOnly} />
        </TItem>
        <TItem label="分类" name="group">
          <Input disabled={readOnly} />
        </TItem>
        <TItem name="sourceType" label="来源渠道">
          <DictSelect dict="LYQD0001" placeholder="请选择来源渠道" disabled={readOnly} />
        </TItem>
        <TItem name="source" label="来源方式">
          <TSelect disabled={readOnly}>
            {_.map(sourceType.$v_names, (value, key) => (
              <Option value={key} key={key}>
                {value}
              </Option>
            ))}
          </TSelect>
        </TItem>
        <TItem label="相关附件" name="file">
          <FileUpload download disabled={readOnly} />
        </TItem>
      </Row>
    </FormCard>
  );
}

export default SettingOfOthers;
