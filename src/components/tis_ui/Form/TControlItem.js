/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { Checkbox, Skeleton } from 'antd';
import TItem from './TItem';
import classNames from 'classnames';
import Styles from './TControlItem.less';
import EmptyFn from '../utils/EmptyFn';

function TControlItem({
  onValidChange = EmptyFn,
  defaultValid = false,
  children,
  label,
  ...others
}) {
  const [isValid, setIsValid] = useState(defaultValid);

  return (
    <TItem
      className={classNames(Styles.controlItem_fixed_width, !isValid && Styles.notValid)}
      label={
        <Checkbox
          checked={isValid}
          onChange={({ target }) => {
            const { checked } = target;
            setIsValid(checked);
            onValidChange(checked);
          }}
        >
          {label}
        </Checkbox>
      }
      {...others}
    >
      {isValid ? children : <Skeleton.Input />}
    </TItem>
  );
}

export default TControlItem;
