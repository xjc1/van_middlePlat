import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { Input, DatePicker } from "antd";
import moment from 'moment';

const { RangePicker } = DatePicker;

class LogRecordsQueryBar extends PureComponent {

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard
        onForm={onForm}
        {...others}
      >
        <TItem
          col={6}
          name="userName"
          label="账号"
        ><Input /></TItem>
        <TItem col={12} name="dateRange" label="操作时间">
          <RangePicker format="YYYY-MM-DD HH:mm:ss"
                       showTime={{
                         hideDisabledOptions: true,
                         defaultValue: [
                           moment('00:00:00', 'HH:mm:ss'),
                           moment('11:59:59', 'HH:mm:ss')
                         ],
                       }} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default LogRecordsQueryBar;
