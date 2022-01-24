import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { connect } from 'dva';
import { policyUpDownStatus } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';

@connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class ChatLibraryQueryBar extends Component {
  render() {
    const { onForm, deptCode, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="question" label="问题名称">
          <Input />
        </TItem>
        <TItem name="status" label="上下架状态" col={8}>
          <Select>
            <Select.Option value={-1}>全部</Select.Option>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem col={8} name="attributionDepartment" label="归属部门">
          <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>
        <TItem col={8} name="category" label="分类">
          <Input />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ChatLibraryQueryBar;
