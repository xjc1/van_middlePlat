import React from 'react';
import { Input, Select } from 'antd';
import { TItem } from '@/components/tis_ui';
import { modulesContentType, appUserType, commonStrategyType } from '@/utils/constantEnum';
import _ from 'lodash';
import LogsTable from './LogsTable';
import ModulesTable from './ModulesTable';

function BaseInfo({ disabled = false }) {
  return (
    <>
      <TItem name="name" label="策略名称">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="objectType" label="对象类型">
        <Select>
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="type" label="策略类型">
        <Select>
          {_.map(commonStrategyType, (v, k) => (
            <Select.Option key={k} value={v}>
              {commonStrategyType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="contentType" label="适用内容类型">
        <Select>
          {_.map(modulesContentType, (v, k) => (
            <Select.Option key={k} value={v}>
              {modulesContentType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="contentType" label="适用内容类型">
        <Select>
          {_.map(modulesContentType, (v, k) => (
            <Select.Option key={k} value={v}>
              {modulesContentType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="logs" label="更新日志">
        <LogsTable />
      </TItem>
      <TItem name="modules" label="应用模块">
        <ModulesTable />
      </TItem>
    </>
  );
}

export default BaseInfo;
