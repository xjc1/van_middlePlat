/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import EmptyFn from '../utils/EmptyFn';
import _ from 'lodash';
import Styles from './checkboxGroup.less';

function CheckboxGroup({
  title,
  col = 6,
  dataset = [],
  onChange = EmptyFn,
  disabled = false,
  value = [],
  ...others
}) {
  return (
    <div className={Styles.checkboxGroupWrapper} {...others}>
      {title && (
        <div className={Styles.checkboxGroupTitle}>
          {title}
          <Checkbox
            disabled={disabled}
            style={{
              textAlign: 'right',
            }}
            checked={value.length === dataset.length}
            onChange={({ target: { checked } }) => {
              if (checked) {
                onChange(_.map(dataset, ({ value: val }) => val));
                return;
              }
              onChange([]);
            }}
          >
            全选
          </Checkbox>
        </div>
      )}
      <div className={Styles.checkboxGroupContent}>
        <Checkbox.Group
          disabled={disabled}
          value={value}
          style={{ width: '100%' }}
          onChange={onChange}
        >
          <Row>
            {_.map(dataset, ({ label, value: val }) => (
              <Col span={col} key={val}>
                <Checkbox value={val} label={label}>
                  {label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
}

export default CheckboxGroup;
