import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select, TreeSelect } from 'antd';
import { userType, policyUpDownStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';

class MenuSettingQueryBar extends PureComponent {
  formatToTreeNode = treeData => {
    return _.map(treeData, ({ name, id, children = [] }) => ({
      title: name,
      value: id,
      children: this.formatToTreeNode(children),
    }));
  };

  render() {
    const { dispatch, list, focusItem, onForm, menuTree = [], ...others } = this.props;
    const treeData = this.formatToTreeNode(menuTree);
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="菜单名称">
          <Input />
        </TItem>
        <TItem col={8} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(userType, (value, key) => (
              <Select.Option key={key} value={value}>
                {userType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={8} name="status" label="上下架状态">
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="parentId" label="父级菜单">
          <TreeSelect treeData={treeData} allowClear />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MenuSettingQueryBar;
