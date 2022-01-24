import React from 'react';
import { Avatar, Tooltip, Comment } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import moment from 'moment';
import RadioOption from './RadioOption';

function getOptions(type, items) {
  switch (type) {
    case 'radio':
      return <RadioOption items={items} />;
    default:
      return <p>没有对应的表单类型</p>;
  }
}

function QuestionComment({ node, onNext }) {
  const { children, question } = node;
  const { title, type } = question;
  return (
    <Comment
      author={<a>中台助手</a>}
      avatar={<Avatar icon={<SmileTwoTone style={{ fontSize: '30px' }} />} alt="模拟机器人" />}
      content={
        <div>
          <p>{title}?</p>
          {getOptions(type, children)}
        </div>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default QuestionComment;
