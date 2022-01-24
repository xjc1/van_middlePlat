/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

function TLink({ dependencies, children }) {
  return (
    <Form.Item dependencies={dependencies} noStyle>
      {({ getFieldsValue }) => {
        const vals = getFieldsValue(true);
        return children(vals);
      }}
    </Form.Item>
  );
}

TLink.propTypes = {
  children: PropTypes.func.isRequired,
  dependencies: PropTypes.array.isRequired,
};

export default TLink;
