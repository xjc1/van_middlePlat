import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input } from 'antd';

class PolicyWordsQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="词条名称">
          <Input />
        </TItem>
        <TItem col={8} name="source" label="来源渠道">
          <DictSelect
            dict="LYQD0001"
            name="source"
            dictType="list"
            allowClear
            style={{ width: '100%' }}
          />
        </TItem>
        <TItem name="clientType" label="终端类型" col={8}>
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PolicyWordsQueryBar;
