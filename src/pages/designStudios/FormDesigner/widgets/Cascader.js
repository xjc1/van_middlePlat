import React, { useMemo } from 'react';
import classNames from 'classnames';
import { EmptyObj } from '@/components/tis_ui';
import { Cascader, Form } from 'antd';
import { getlabel } from './tools';

const CascaderHoc = React.memo(
  ({
    id,
    extraClass = [],
    style = EmptyObj,
    disabled,
    readonly,
    leaveOnly = false,
    addonAfter,
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
        <Cascader
          options={options}
          className={classNames(extraClass)}
          changeOnSelect={leaveOnly}
          style={style}
          disabled={disabled || readonly}
          addonAfter={addonAfter}
        />
      </Form.Item>
    );
  },
);

export default CascaderHoc;
