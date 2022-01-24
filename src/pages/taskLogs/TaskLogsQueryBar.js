import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { taskLastExecuteStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import { Input, DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;

class TaskLogsQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="jobName" label="任务名称">
          <Input placeholder="请输入任务名称" />
        </TItem>
        <TItem col={8} name="status" label="日志状态">
          <Select allowClear>
            {_.map(taskLastExecuteStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {taskLastExecuteStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="timeRange" label="创建时间">
          <RangePicker allowEmpty={[true, true]} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default TaskLogsQueryBar;
