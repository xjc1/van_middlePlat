import React from 'react';
import { EmptyFn } from '@/components/tis_ui';
import { Select } from 'antd';
import { modulesMixType } from '@/utils/constantEnum';
import _ from 'lodash';
import MixStrategy from './mixStrategy';
import MixPercentStrategy from './mixPercentStrategy';

function MixStrategySelectItem({ value = {}, onChange = EmptyFn, disabled = false }) {
  const { type = modulesMixType.CONTENT } = value;

  return (
    <>
      <Select
        value={type}
        onChange={val => {
          onChange({ type: val });
        }}
      >
        {_.map(modulesMixType, (v, k) => (
          <Select.Option key={k} value={v} label={modulesMixType.$names[k]}>
            {modulesMixType.$names[k]}
          </Select.Option>
        ))}
      </Select>

      <div style={{ marginTop: 16 }}>
        {type === modulesMixType.CONTENT ? (
          <MixStrategy
            disabled={disabled}
            value={value.contentSort}
            onChange={val => {
              onChange({ ...value, contentSort: val });
            }}
          />
        ) : (
          <MixPercentStrategy
            disabled={disabled}
            value={value.percentages}
            onChange={val => {
              onChange({ ...value, percentages: val });
            }}
          />
        )}
      </div>
    </>
  );
}

export default MixStrategySelectItem;
