import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class TaskManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="jobName" label="任务名称">
          <Input placeholder="请输入任务名称" />
        </TItem>
        <TItem col={8} name="timeRange" label="创建时间">
          <RangePicker allowEmpty={[true,true]} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default TaskManageQueryBar;
