import React from 'react';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import { InputNumber, Row } from 'antd';
import _ from 'lodash';
import { commonPeriodic } from '@/utils/constantEnum';
import style from './UpdateCycle.less';

function UpdateCycle({ disabled, value = {}, onChange = EmptyFn }) {
  const { type: period, value: days } = value;

  return (
    <Row>
      <div className={style.updateCycle}>
        <div className={style.updateCycleSelect}>
          每
          <TSelect
            value={period}
            allowClear
            disabled={disabled}
            placeholder="请选择周期"
            onChange={val => {
              onChange({ type: val, value: '' });
            }}
          >
            {_.map(commonPeriodic, (v, k) => (
              <TSelect.Option key={k} value={k}>
                {commonPeriodic.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </div>
        <div className={style.updateCycleInput}>
          <div>
            第
            <InputNumber
              key={period}
              disabled={disabled}
              placeholder="请输入天数"
              value={days}
              onChange={val => {
                onChange({ type: period, value: val });
              }}
              max={commonPeriodic[period]}
              min={commonPeriodic.daily}
            />
            天
          </div>
        </div>
      </div>
    </Row>
  );
}

export default UpdateCycle;
