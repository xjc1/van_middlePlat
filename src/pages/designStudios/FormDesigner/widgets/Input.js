import React from 'react';
import { Input, Form } from 'antd';
import { EmptyFn, EmptyObj } from '@/components/tis_ui';
import classNames from 'classnames';
import { getlabel } from './tools';

const InputHoc = React.memo(
  ({
    id,
    extraClass = [],
    type = 'string',
    style = EmptyObj,
    disabled,
    readonly,
    onChange = EmptyFn,
    addonAfter,
    label,
    innerSpan,
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
        <Input
          className={classNames(extraClass)}
          type={type}
          style={style}
          disabled={disabled || readonly}
          addonAfter={addonAfter}
          onChange={e => onChange(e.target.value)}
        />
      </Form.Item>
    );
  },
);

export default InputHoc;
