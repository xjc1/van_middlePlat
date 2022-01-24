import React from 'react';
import classNames from 'classnames';
import { InputNumber, Form } from 'antd';
import { getlabel } from './tools';

const defaultStyles = {
  width: '100%',
};

const InputNumberHoc = React.memo(
  ({
    id,
    extraClass = [],
    style = defaultStyles,
    disabled,
    readonly,
    addonAfter,
    label,
    innerSpan,
    displayName,
    orderIndex,
    className,
    widgetConfig,
  }) => {
    return (
      <Form.Item
        className={className}
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <InputNumber
          className={classNames(extraClass)}
          style={style}
          disabled={disabled || readonly}
          addonAfter={addonAfter}
          {...widgetConfig}
        />
      </Form.Item>
    );
  },
);

export default InputNumberHoc;
