import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { Input } from 'antd';
import _ from 'lodash';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class ApplicationAuditQueryBar extends PureComponent {

  render() {
    const { onForm, ...others } = this.props;

    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="应用名">
          <Input />
        </TItem>
        <TItem col={8} {...layout} name="publishDepartment" label="发布部门">
          <DepartmentTreeSelect allowClear />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ApplicationAuditQueryBar;
