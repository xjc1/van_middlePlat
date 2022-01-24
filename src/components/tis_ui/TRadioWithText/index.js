/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Col, Radio, Row } from 'antd';
import _ from 'lodash';
import emptyFn from '../utils/EmptyFn';

function TRadioWithText({ datasource, text, contentCol, disabled, value, onChange = emptyFn }) {
  return (
    <Row>
      <Radio.Group
        disabled={disabled}
        value={value}
        onChange={({ target: { value: val } }) => {
          onChange(val);
        }}
      >
        {_.map(datasource, (v, k) => (
          <Radio key={k} value={v}>
            {datasource.$names[k]}
          </Radio>
        ))}
      </Radio.Group>
      <Col span={24 - contentCol}>
        <span>{text}</span>
      </Col>
    </Row>
  );
}

export default TRadioWithText;
