import React, { useContext } from 'react';
import { Input, Descriptions } from 'antd';
import { TItem, FormRules } from '@/components/tis_ui';
import { policyUpDownStatus, commonReview } from '@/utils/constantEnum';

const { Item } = Descriptions;

function NormalCopy({ info }) {
  const { object, region, status, auditState } = info;

  return (
    <>
      <div
        style={{
          height: '50px',
          lineHeight: '50px',
          margin: '20px 0',
          paddingLeft: '10px',
          borderLeft: '4px solid red',
          background: '#efefef',
        }}
      >
        普通复制只复制复制源的所有的信息，事项主题问答不做相关对应处理
      </div>
      <Descriptions
        title="复制的部分主题信息如下："
        bordered
        size="small"
        column={4}
        layout="vertical"
      >
        <Item label="主题名称" span={4}>
          <div style={{ marginBottom: '5px', color: 'red', fontSize: '12px' }}>
            （注：可编辑，但不允许为空）
          </div>
          <TItem name="name" rules={[FormRules.required('必填')]}>
            <Input autoFocus />
          </TItem>
        </Item>
        <Item label="申报对象">{object}</Item>
        <Item label="行政区划">{region}</Item>
        <Item label="上下架状态">{policyUpDownStatus.$v_names[status]}</Item>
        <Item label="总体审核状态">{commonReview.$v_names[auditState]}</Item>
      </Descriptions>
    </>
  );
}

export default NormalCopy;
