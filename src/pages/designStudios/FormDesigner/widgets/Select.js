import React from 'react';
import { EmptyFn, EmptyObj, utils } from '@/components/tis_ui';
import { Form, Select } from 'antd';
import { getlabel } from '@/pages/designStudios/FormDesigner/widgets/tools';

const { IDGenerator } = utils;
const selectIdGenerator = new IDGenerator('select');
const { Option } = Select;

const SelectHoc = React.memo(
  ({
    style = EmptyObj,
    id,
    label,
    innerSpan,
    content = [],
    disabled,
    readonly,
    onChange = EmptyFn,
    displayName,
    orderIndex,
    className,
  }) => {
    return (
      <Form.Item
        className={className}
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <Select style={style} disabled={disabled || readonly} onChange={onChange}>
          {content.map(({ value, label: optionLabel, key }) => {
            return (
              <Option key={key || selectIdGenerator.next()} value={value}>
                {optionLabel}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  },
);

export default SelectHoc;
