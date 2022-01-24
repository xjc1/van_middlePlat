import React from 'react';
import { Input, Row, Radio } from 'antd';
import { FormCard, TItem, FormRules } from '@/components/tis_ui';
import {
  taskCreateStatus,
} from '@/utils/constantEnum';
import _ from 'lodash';

function TaskForm({ editAble = false, ...others }) {
  return (
    <FormCard title="任务信息" {...others}>
      <Row style={{ flex: 'auto', minWidth: 0 }}>
        <TItem label="任务名称" name="jobName" rules={[FormRules.required('必填')]}>
          <Input disabled={!editAble} />
        </TItem>
        <TItem label="任务描述" name="remark" rules={[FormRules.required('必填')]}>
          <Input disabled={!editAble} />
        </TItem>
        <TItem label="Bean名称" rules={[FormRules.required('必填')]} name="beanName">
          <Input disabled={!editAble} />
        </TItem>

        <TItem label="执行方法" name="methodName" rules={[FormRules.required('必填')]}>
          <Input disabled={!editAble} />
        </TItem>

        <TItem label="Cron表达式" name="cronExpression" rules={[FormRules.required('必填')]}>
          <Input disabled={!editAble} />
        </TItem>

        <TItem label="任务负责人" name="personInCharge">
          <Input disabled={!editAble} />
        </TItem>

        <TItem label="告警邮箱" name="email">
          <Input placeholder="多个用逗号隔开" disabled={!editAble} />
        </TItem>

        <TItem label="任务状态" name="status">
          <Radio.Group disabled={!editAble}>
            {_.map(taskCreateStatus, (v, k) => (
              <Radio key={k} value={v}>
                {taskCreateStatus.$names[k]}
              </Radio>
            ))}
          </Radio.Group>
        </TItem>
        <TItem label="参数内容" name="params">
          <Input.TextArea disabled={!editAble} />
        </TItem>
      </Row>
    </FormCard>
  );
}

export default TaskForm;
