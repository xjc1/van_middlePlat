import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DatePicker, Form } from 'antd';
import { getlabel } from './tools';

const defaultStyles = {
  width: '100%',
};

const DatePickerHoc = React.memo(
  ({
    extraClass = [],
    style = defaultStyles,
    disabled,
    readonly,
    id,
    label,
    innerSpan,
    displayName,
    orderIndex,
    className,
    initialValue = {},
  }) => {
    const options = useMemo(() => {
      const { initValueType, initValueStatic } = initialValue;
      try {
        switch (initValueType) {
          case 'static': {
            return JSON.parse(initValueStatic);
          }
          default: {
            return [];
          }
        }
      } catch (e) {
        return [];
      }
    }, [initialValue]);

    return (
      <Form.Item
        className={className}
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <DatePicker
          options={options}
          className={classNames(extraClass)}
          style={style}
          disabled={disabled || readonly}
        />
      </Form.Item>
    );
  },
);

export default DatePickerHoc;
