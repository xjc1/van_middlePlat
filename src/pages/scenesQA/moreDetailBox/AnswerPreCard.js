import React from 'react';
import { Descriptions } from 'antd';

function AnswerPreCard({ name, title }) {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="名称">{name}</Descriptions.Item>
      <Descriptions.Item label="标题 ">{title}</Descriptions.Item>
    </Descriptions>
  );
}

export default AnswerPreCard;
