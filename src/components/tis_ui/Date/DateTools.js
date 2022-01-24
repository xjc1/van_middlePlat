/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';
const shortDefaultFormat = 'YYYY-MM-DD';

const range = {
  today: [moment().startOf('day'), moment().endOf('day')],
  thisMonth: [moment().startOf('month'), moment().endOf('month')],
  thisYear: [moment().startOf('year'), moment().endOf('year')],
  lastMonth: [
    moment()
      .subtract(1, 'months')
      .startOf('month'),
    moment()
      .subtract(1, 'months')
      .endOf('month'),
  ],
  lastYear: [
    moment()
      .subtract(1, 'years')
      .startOf('year'),
    moment()
      .subtract(1, 'years')
      .endOf('year'),
  ],
};

export default {
  range,
  defaultFormat,
  transformDefaultFormat: timeStr =>
    timeStr && (
      <Tooltip placement="topLeft" title={moment(timeStr).format(defaultFormat)}>
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {moment(timeStr).format(shortDefaultFormat)}
        </span>
      </Tooltip>
    ),
};
