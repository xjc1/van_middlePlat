/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

function CheckIcon({ status = 'info', ...others }) {
  switch (status) {
    case 'info':
      return <InfoCircleOutlined {...others} twoToneColor="#eb2f96" theme="twoTone" />;
    case 'success':
      return (
        <CheckCircleOutlined
          {...others}
          type="check-circle"
          twoToneColor="#52c41a"
          theme="twoTone"
        />
      );
    case 'question':
      return <QuestionCircleOutlined {...others} type="question-circle" theme="twoTone" />;
    case 'fail':
      return (
        <CloseCircleOutlined
          {...others}
          type="close-circle"
          twoToneColor="#eb2f96"
          theme="twoTone"
        />
      );
    default:
      return (
        <CheckCircleOutlined
          {...others}
          type="check-circle"
          twoToneColor="#52c41a"
          theme="twoTone"
        />
      );
  }
}

export default CheckIcon;
