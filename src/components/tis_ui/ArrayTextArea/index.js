/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import EmptyFn from '../utils/EmptyFn';

function ArrayTextArea({ value, onChange, separator, ...others }) {
  return (
    <Input.TextArea
      autoSize={{ maxRows: 6 }}
      value={value ? value.join(separator) : []}
      onChange={e => {
        const { value: textVal } = e.target;
        onChange(textVal.split(separator));
      }}
      {...others}
    />
  );
}

ArrayTextArea.defaultProps = {
  onChange: EmptyFn,
  value: [],
  separator: ',',
};

ArrayTextArea.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  separator: PropTypes.string,
};

export default ArrayTextArea;
