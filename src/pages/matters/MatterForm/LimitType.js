import React from 'react';
import { InputNumber, Row, Select, DatePicker } from 'antd';
import { matterTimeLimitType } from '@/utils/constantEnum';
import _ from 'lodash';
import { EmptyFn } from '@/components/tis_ui';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const getTimeValue = val => moment(val);

function LimitType({ idFixedTime, disabled, value = {}, onChange = EmptyFn }) {
  const { dateNumber, dateUnit, startTime = '', endTime = '' } = value;
  let dateValue = [];
  if (idFixedTime && startTime) {
    dateValue = [getTimeValue(startTime), getTimeValue(endTime)];
  }
  return (
    <Row>
      {idFixedTime && (
        <div>
          <RangePicker
            value={dateValue}
            onChange={(time, val) => {
              const [startStr, endStr] = val;
              onChange({
                startTime: moment(startStr).format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment(endStr).format('YYYY-MM-DD HH:mm:ss'),
              });
            }}
            disabled={disabled}
            format={dateFormat}
          />
        </div>
      )}
      {!idFixedTime && (
        <div style={{ display: 'flex' }}>
          <InputNumber
            style={{ marginRight: '20px', minWidth: '100px' }}
            disabled={disabled}
            min={1}
            value={dateNumber}
            onChange={val => {
              if (_.isEmpty(dateUnit)) {
                onChange({ dateNumber: val, dateUnit: matterTimeLimitType.weekday });
                return;
              }
              onChange({ dateNumber: val, dateUnit });
            }}
          />
          <Select
            placeholder="请选择时限类型"
            disabled={disabled}
            defaultValue={matterTimeLimitType.weekday}
            value={dateUnit}
            onChange={val => {
              onChange({ dateNumber, dateUnit: val });
            }}
          >
            {_.map(matterTimeLimitType, (v, k) => (
              <Select.Option value={v} key={k}>
                {matterTimeLimitType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
    </Row>
  );
}

export default LimitType;
