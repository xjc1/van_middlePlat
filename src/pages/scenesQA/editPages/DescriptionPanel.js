import React from 'react';
import { Descriptions, Tag } from 'antd';
import _ from 'lodash';
import { terminalType } from '@/utils/constantEnum';
import router from "@/utils/tRouter";

function DescriptionPanel({ node }) {
  const { name, sid, id, clientType = [], regionsText } = node;

  return (
    <Descriptions
      title={
        <a
          onClick={() => {
            window.open(`#${router.path({ name: 'scenesQA_none', params: { scenesId: id } })}`);
          }}
        >
          {name}
        </a>
      }
      size="small"
      bordered
    >
      <Descriptions.Item label="主题ID">{sid}</Descriptions.Item>
      <Descriptions.Item label="id" span={2}>
        {id}
      </Descriptions.Item>
      <Descriptions.Item label="终端类型" span={3}>
        {_.map(clientType, type => (
          <Tag key={type}>{terminalType.$v_names[type]}</Tag>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label="行政区划" span={2}>
        {regionsText}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default DescriptionPanel;
