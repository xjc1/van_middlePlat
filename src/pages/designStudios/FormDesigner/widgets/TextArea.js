import React from 'react';
import { Form, Input } from 'antd';
import { EmptyFn, EmptyObj } from '@/components/tis_ui';
import { getlabel } from '@/pages/designStudios/FormDesigner/widgets/tools';
import classNames from 'classnames';

const { TextArea } = Input;

const TextAreaHoc = React.memo(
  ({
    id,
    extraClass = [],
    style = EmptyObj,
    disabled,
    readonly,
    onChange = EmptyFn,
    label,
    innerSpan,
    displayName,
    orderIndex,
    className,
    widgetConfig = {},
  }) => {
    const { rowsNum = 5 } = widgetConfig;

    return (
      <Form.Item
        className={className}
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <TextArea
          autoSize={{ minRows: rowsNum, maxRows: rowsNum }}
          className={classNames(extraClass)}
          style={style}
          disabled={disabled || readonly}
          onChange={e => onChange(e.target.value)}
        />
      </Form.Item>
    );
  },
);

export default TextAreaHoc;
