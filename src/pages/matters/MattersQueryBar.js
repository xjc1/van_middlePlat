import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import _ from 'lodash';
import {
  matterIsResolvedMaterials,
  matterStatus,
  matterSource,
  commonObjectType,
  policyUpDownStatus,
  matterHavePreMatter,
  matterMissMaterial,
} from '@/utils/constantEnum';
import { adaptText } from '@/utils/AdaptiveHelper';

const { Option } = Select;

class MattersQuerybar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="title" label={adaptText('一级名称')} expanded>
          <Input />
        </TItem>
        <TItem col={6} name="name" label={adaptText('二级名称')}>
          <Input />
        </TItem>
        <TItem col={6} name="subItemName" label={adaptText('三级名称')} expanded>
          <Input />
        </TItem>
        <TItem col={6} name="matterCode" label="事项编码">
          <Input />
        </TItem>
        <TItem col={6} name="haveResolveMaterial" label={adaptText('拆解状态')}>
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(matterIsResolvedMaterials, (v, k) => (
              <Option key={k} value={v} label={adaptText(matterIsResolvedMaterials.$names[k])}>
                {adaptText(matterIsResolvedMaterials.$names[k])}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="source" label="事项来源" expanded>
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(matterSource, (v, k) => (
              <Option key={k} value={v} label={matterSource.$names[k]}>
                {matterSource.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="disassembly" label="事项状态">
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(matterStatus, (v, k) => (
              <Option key={k} value={v} label={matterStatus.$names[k]}>
                {matterStatus.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="matterType" label="事项分类" expanded>
          <Input />
        </TItem>
        <TItem col={6} name="object" label="对象类型">
          <Select allowClear>
            <Option value="" label="全部">
              全部
            </Option>
            {_.map(commonObjectType, (v, k) => (
              <Option key={k} value={v} label={commonObjectType.$names[k]}>
                {commonObjectType.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(policyUpDownStatus, (v, k) => (
              <Option key={k} value={v} label={policyUpDownStatus.$names[k]}>
                {policyUpDownStatus.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" />
        </TItem>
        <TItem col={6} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={6} name="havePreMatter" label="是否有前置" expanded>
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(matterHavePreMatter, (v, k) => (
              <Option key={k} value={v} label={matterHavePreMatter.$names[k]}>
                {matterHavePreMatter.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="missMaterial" label="是否缺失" expanded>
          <Select allowClear>
            <Option value={-1} label="全部">
              全部
            </Option>
            {_.map(matterMissMaterial, (v, k) => (
              <Option key={k} value={v} label={matterMissMaterial.$names[k]}>
                {matterMissMaterial.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MattersQuerybar;
