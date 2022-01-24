import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import MessageConfigSelect from '@/pages/messageConfig/MessageConfigSelect';
import { appUserType, messageStatus, messageConfigType } from '@/utils/constantEnum';

class MessageManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} label="消息标题" name="title">
          <Input />
        </TItem>
        <TItem col={8} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(_.omit(appUserType, 'selfAndLegalPerson'), (v, k) => (
              <Select.Option key={k} value={v} label={appUserType.$names[k]}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="msgType" label="消息分类" col={8}>
          <MessageConfigSelect type={messageConfigType.classify} />
        </TItem>
        <TItem name="status" label="消息状态" col={8} expanded>
          <Select>
            {_.map(_.omit(messageStatus, 'allRevoked'), (value, key) => (
              <Select.Option key={key} value={value}>
                {messageStatus.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="clientType" label="终端类型" placeholder="请选择" col={8} expanded>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MessageManageQueryBar;
