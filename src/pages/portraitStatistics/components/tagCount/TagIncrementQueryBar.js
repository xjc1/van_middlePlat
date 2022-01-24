import React from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DatePicker } from 'antd';
import moment from 'moment';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const { RangePicker } = DatePicker;

function DetailQueryBar({ onForm, ...others }) {
  const disableDate = current => {
    return current && current > moment().endOf('month'); // 不晚于这个月
  };
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem col={6} name="timeRange" label="选择时间" {...layout}>
        <RangePicker disabledDate={disableDate} picker="month" style={{ width: 250 }} />
      </TItem>
    </QueryBarCard>
  );
}

export default DetailQueryBar;
