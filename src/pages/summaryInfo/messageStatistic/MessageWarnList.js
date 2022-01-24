import React, { PureComponent } from 'react';
import MessageListStatistic from './index';
import { messageRoutes } from '@/../config/summaryInfoRoutes';

const WARN_MESSAGE_TYPE = 2;

class MessageWarnList extends PureComponent {
  render() {
    return (
      <MessageListStatistic type={WARN_MESSAGE_TYPE} activeTab={messageRoutes.warnList.rName} />
    );
  }
}

export default MessageWarnList;
