import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { connect } from 'dva';
import { contentType, receivingRange, publishStatus, appUserType } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';

@connect(({ message }) => message)
class MessageQuerybar extends Component {
  render() {
    const { onForm, footer, actions, params } = this.props;
    return (
      <QueryBarCard footer={footer} actions={actions} onForm={onForm} initialValues={{ ...params }}>
        <TItem name="clientType" label="终端类型" placeholder="请选择" col={6}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem name="status" label="上下架状态" col={6}>
          <Select>
            <Select.Option value="1">上架</Select.Option>
            <Select.Option value="0">下架</Select.Option>
            <Select.Option value="">全部</Select.Option>
          </Select>
        </TItem>
        <TItem col={6} label="消息标题" name="title">
          <Input />
        </TItem>
        <TItem col={6} label="内容类型" name="contentType">
          <Select>
            {_.map(contentType, (value, key) => (
              <Select.Option key={key} value={value}>
                {contentType.$names[key]}
              </Select.Option>
            ))}
            <Select.Option value={-1}>全部</Select.Option>
          </Select>
        </TItem>
        <TItem name="publishStatus" label="发布状态" col={6} expanded>
          <Select>
            {_.map(publishStatus, (value, key) => (
              <Select.Option key={key} value={value}>
                {publishStatus.$names[key]}
              </Select.Option>
            ))}
            <Select.Option value={-1}>全部</Select.Option>
          </Select>
        </TItem>
        <TItem name="messageType" label="消息类型" col={6} expanded>
          <DictSelect
            dict="XXLX1000"
            dictType="tree"
            treeNodeFilterProp="title"
            showSearch
            allowClear
          />
        </TItem>
        <TItem name="userType" label="用户类型" col={6} expanded>
          <Select>
            <Select.Option value="">全部</Select.Option>
            {_.map(appUserType, (v, k) => (
              <Select.Option value={v} key={k}>
                {appUserType.$v_names[v]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="range" label="接收范围" col={6} expanded>
          <Select>
            {_.map(receivingRange, (value, key) => (
              <Select.Option key={key} value={value}>
                {receivingRange.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MessageQuerybar;
