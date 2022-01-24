import { TItem } from '@/components/tis_ui';
import { messageConfigType,messageUseScence } from '@/utils/constantEnum';
import MessageConfigSelect from '@/pages/messageConfig/MessageConfigSelect';
import React from 'react';
import { Input } from 'antd';

function BaseInfo({ isCheck }) {
  return (
    <>
      <TItem
        name="title"
        label="提醒标题"
        rules={[{ required: true, message: '提醒标题不能为空!' }]}
      >
        <Input disabled={isCheck} />
      </TItem>
      <TItem
        name="msgType"
        label="消息类型"
        rules={[{ required: true, message: '消息类型不能为空!' }]}
      >
        <MessageConfigSelect type={messageConfigType.classify} applicationScenario={[messageUseScence.notice]} disabled={isCheck} />
      </TItem>
    </>
  );
}
export default BaseInfo;
