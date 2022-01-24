import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { appUserType, tableManageTableType, commonYesNo } from '@/utils/constantEnum';
import _ from 'lodash';

class TableManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="cnName" label="库表中文名">
          <Input />
        </TItem>
        <TItem col={8} name="enName" label="库表英文名">
          <Input />
        </TItem>
        <TItem col={8} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="type" label="库表类型">
          <Select allowClear>
            {_.map(tableManageTableType, (v, k) => (
              <Select.Option key={k} value={v}>
                {tableManageTableType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="isUsedByFunc" label="应用至函数">
          <Select allowClear>
            {_.map(commonYesNo, (v, k) => (
              <Select.Option key={k} value={v}>
                {commonYesNo.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default TableManageQueryBar;
