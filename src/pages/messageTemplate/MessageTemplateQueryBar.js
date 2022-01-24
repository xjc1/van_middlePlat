import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { messageSendType, appUserType } from '@/utils/constantEnum';

class MessageTemplateQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="moduleTitle" label="模版标题">
          <Input />
        </TItem>
        <TItem col={8} name="moduleId" label="模版编码">
          <Input />
        </TItem>
        <TItem name="objectType" label="对象类型" col={8}>
          <TSelect>
            {_.map(_.omit(appUserType, 'selfAndLegalPerson'), (v, k) => (
              <TSelect.Option key={k} value={v}>
                {appUserType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={8} name="sendType" label="转发类型">
          <TSelect>
            {_.map(messageSendType, (v, k) => (
              <TSelect.Option key={k} value={v}>
                {messageSendType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MessageTemplateQueryBar;
