import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input } from 'antd';

class DictDepartmentManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="deptName" label="部门名称">
          <Input />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default DictDepartmentManageQueryBar;
