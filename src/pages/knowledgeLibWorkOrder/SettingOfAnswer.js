import React from 'react';
import { Input, Row } from 'antd';
import { FormCard, TItem, RichText } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents'

const { TextArea } = Input;

function SettingOfAnswer({ readOnly = false }) {
  return (
    <FormCard title="答案配置" bordered={false}>
      <Row style={{ flex: 'auto', minWidth: 0 }}>
        <TItem label="答案" name="answer">
          <TextArea disabled={readOnly} />
        </TItem>
        <TItem label="回复内容" name="content">
          <RichText base64 readOnly={readOnly} />
        </TItem>
        <TItem name="relationMatchScene" label="关联主题">
          <TSearchSelector type="scene" disabled={readOnly} />
        </TItem>
        <TItem name="relationMatchMatter" label="关联事项">
          <TSearchSelector type="matter" disabled={readOnly} />
        </TItem>
        <TItem name="relationMatchService" label="关联服务">
          <TSearchSelector type="convenience" disabled={readOnly} />
        </TItem>
        <TItem name="relationMatchPolicy" label="关联政策">
          <TSearchSelector type="policyLibrary" disabled={readOnly} />
        </TItem>
        <TItem name="relationMatchProject" label="关联项目">
          <TSearchSelector type="project" disabled={readOnly} />
        </TItem>
      </Row>
    </FormCard>
  );
}

export default SettingOfAnswer;
