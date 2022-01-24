import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import {
  appUserType,
  portraitApplyScenario,
  portraitLinkUser,
  portraitLogicType,
} from '@/utils/constantEnum';
import { TagSource } from '@/components/bussinessComponents';

class PortraitTagsQueryBar extends PureComponent {
  render() {
    const { dispatch, list, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="标签名称">
          <Input />
        </TItem>
        <TItem col={8} name="logicType" label="判断类型">
          <Select allowClear>
            {_.map(portraitLogicType, (v, k) => (
              <Select.Option key={k} value={v} label={portraitLogicType.$names[k]}>
                {portraitLogicType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="applyScenario" label="应用场景">
          <TSelect>
            {_.map(portraitApplyScenario, (v, k) => (
              <TSelect.Option key={k} value={v} label={portraitApplyScenario.$names[k]}>
                {portraitApplyScenario.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem col={8} name="object" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v} label={appUserType.$names[k]}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="sourceType" label="标签来源">
          <TagSource mode="" labelInValue={false} prefetch placeholder="" />
        </TItem>
        <TItem col={8} name="isLinkUser" label="关联用户">
          <TSelect
            options={_.map(portraitLinkUser, (v, k) => ({
              value: v,
              label: portraitLinkUser.$names[k],
            }))}
          />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PortraitTagsQueryBar;
