import { TItem, TLink } from '@/components/tis_ui';
import React from 'react';
import { Input, Checkbox } from 'antd';
import { messageConfigType } from '@/utils/constantEnum';
import MessageConfigSelect from '@/pages/messageConfig/MessageConfigSelect';
import _ from 'lodash';

function typeBool2Code(pullMsg, pushMsg) {
  return _.filter(
    [pullMsg && messageConfigType.classify, pushMsg && messageConfigType.notice],
    val => val,
  );
}

function BaseInfo({ isCheck }) {
  return (
    <>
      <TItem
        name="title"
        label="消息标题"
        rules={[{ required: true, message: '消息标题不能为空!' }]}
      >
        <Input disabled={isCheck} />
      </TItem>
      <TItem
        col={12}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 15 }}
        name="pullMsg"
        valuePropName="checked"
        label="发送方式"
      >
        <Checkbox disabled={isCheck}>消息列表</Checkbox>
      </TItem>
      <TItem valuePropName="checked" col={12} name="pushMsg" label="">
        <Checkbox disabled={isCheck}>消息推送</Checkbox>
      </TItem>
      <TLink dependencies={['pullMsg', 'pushMsg']}>
        {({ pullMsg, pushMsg }) => {
          const flterType = typeBool2Code(pullMsg, pushMsg);
          return (
            <TItem
              name="msgType"
              label="消息分类"
              rules={[{ required: true, message: '消息分类不能为空!' }]}
            >
              <MessageConfigSelect
                type={messageConfigType.classify}
                key={_.join(flterType, '_')}
                disabled={isCheck}
                applicationScenario={flterType}
              />
            </TItem>
          );
        }}
      </TLink>
    </>
  );
}
export default BaseInfo;
