import React from 'react';
import { Form, Radio } from 'antd';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { EmptyFn, EmptyObj } from '@/components/tis_ui';
import { getlabel } from '@/pages/designStudios/FormDesigner/widgets/tools';

const radioIdGenerator = new IDGenerator('radio');
const RadioGroup = Radio.Group;

const RadioHoc = React.memo(
  ({
    content = [],
    id,
    label,
    innerSpan,
    style = EmptyObj,
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
        <RadioGroup
          style={style}
          disabled={disabled || readonly}
          onChange={e => onChange(e.target.value)}
        >
          {content.map((value, optionLabel, key) => (
            <Radio value={value} key={key || radioIdGenerator.next()}>
              {optionLabel || value}
            </Radio>
          ))}
        </RadioGroup>
      </Form.Item>
    );
  },
);

export default RadioHoc;
