import React from 'react';
import { Descriptions, Badge } from 'antd';
import { commonYesNo } from '@/utils/constantEnum';

function QuestionPreCard({ question }) {
  const { type, isRequired, title, name, displayMode } = question;
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="类型">{type}</Descriptions.Item>
      <Descriptions.Item label="必填 ">{commonYesNo.$v_names[isRequired]}</Descriptions.Item>
      <Descriptions.Item label="名称">{name}</Descriptions.Item>
      <Descriptions.Item label="问题标题">{title}</Descriptions.Item>
      <Descriptions.Item label="显示模式">{displayMode}</Descriptions.Item>
    </Descriptions>
  );
}

export default QuestionPreCard;
