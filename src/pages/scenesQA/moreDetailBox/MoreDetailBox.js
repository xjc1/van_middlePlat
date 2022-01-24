import React from 'react';
import { connect } from 'dva';
import { Popover } from 'antd';
import QuestionPreCard from './QuestionPreCard';
import AnswerPreCard from './AnswerPreCard';

function MoreDetailBox({ preView, node, children }) {
  const { name, type, question, title } = node;
  switch (preView) {
    case 'whole':
      return (
        <Popover
          placement="right"
          title={name}
          trigger="click"
          style={{
            width: 400,
          }}
          content={
            question ? (
              <QuestionPreCard question={question} />
            ) : (
              <AnswerPreCard name={name} title={title} />
            )
          }
        >
          <div>{children}</div>
        </Popover>
      );
    default:
      return children;
  }
}

export default connect(({ scenesQA }) => ({ preView: scenesQA.preView }))(MoreDetailBox);
