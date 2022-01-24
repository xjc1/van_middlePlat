import React, { PureComponent } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { sourceType, commonAuditState } from '@/utils/constantEnum';

const { Option } = TSelect;

class KnowledgeLibWorkOrderQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="id" label="工单编号">
          <Input />
        </TItem>
        <TItem col={8} name="name" label="知识名称">
          <Input />
        </TItem>
        <TItem col={8} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" />
        </TItem>
        <TItem col={8} name="source" label="来源方式">
          <TSelect>
            {_.map(sourceType, (v, k) => (
              <Option value={v} key={k}>
                {sourceType.$names[k]}
              </Option>
            ))}
          </TSelect>
        </TItem>
        <TItem col={8} name="review" label="审核状态">
          <TSelect>
            {_.map(commonAuditState, (v, k) => (
              <Option value={v} key={k}>
                {commonAuditState.$names[k]}
              </Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default KnowledgeLibWorkOrderQueryBar;
