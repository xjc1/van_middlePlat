/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import _ from 'lodash';

const defaultCss = {
  width: '100%',
  lineHeight: 'inherit',
};

const TCheckbox = ({
  options = [],
  colSpan = 6,
  style = {},
  checkAllLabel = '全选',
  onCheckAll,
  value: checkList,
  ...others
}) => {
  return (
    <>
      {onCheckAll && (
        <Row style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            onChange={e => {
              onCheckAll(e.target.checked);
            }}
            checked={checkList.length === options.length}
          >
            {checkAllLabel}
          </Checkbox>
        </Row>
      )}
      <Checkbox.Group style={_.defaults(style, defaultCss)} value={checkList} {...others}>
        <Row>
          {_.map(options, ({ label, value }) => (
            <Col style={{ lineHeight: 'inherit' }} span={colSpan}>
              <Checkbox value={value || label}>{label}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </>
  );
};

export default TCheckbox;
