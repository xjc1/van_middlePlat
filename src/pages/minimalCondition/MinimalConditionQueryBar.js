import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input } from 'antd';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';
import { commonYesNo } from '@/utils/constantEnum';

const ORIGIN_RESOURCE = {
  [commonYesNo.yes]: '有来源',
  [commonYesNo.no]: '无来源',
};

const LINK_TAGS = {
  [commonYesNo.yes]: '已关联',
  [commonYesNo.no]: '未关联',
};

class MinimalConditionQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem name="name" label="条件名称" col={6}>
          <Input />
        </TItem>
        <TItem col={6} name="objectType" label="对象类型">
          <DictSelect
            placeholder="请选择对象类型"
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="DXLX0001"
          />
        </TItem>
        <TItem col={6} name="isLinkTag" label="关联标签">
          <TSelect showArrow>
            {_.map(commonYesNo, value => (
              <TSelect.Option key={value} value={Boolean(value)}>
                {LINK_TAGS[value]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem col={6} name="isLinkSource" label="来源内容">
          <TSelect showArrow>
            {_.map(commonYesNo, value => (
              <TSelect.Option key={value} value={Boolean(value)}>
                {ORIGIN_RESOURCE[value]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MinimalConditionQueryBar;
