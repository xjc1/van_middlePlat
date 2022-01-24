/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import _ from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './style.less';
import EmptyFn from '../utils/EmptyFn';

function ArrayFormatTextArea({
  value,
  onChange,
  filter,
  separator,
  onSubmit,
  tip,
  loading,
  ...others
}) {
  const [temp, setTemp] = useState(value.join['\n']);
  const [current, setCurrent] = useState(0);
  function formartInput(val) {
    const reg = new RegExp(`[${filter.join('')}]`, 'g');
    const formatValue = _.replace(val, reg, separator);

    // 格式化并清除空值
    const formatValueArray = _.compact(_.split(formatValue, separator));
    setTemp(formatValueArray.join(separator));
    onChange(formatValueArray);
  }
  return (
    <>
      <Input.TextArea
        autoSize={{ minRows: 10, maxRows: 10 }}
        value={temp}
        onChange={e => {
          setTemp(e.target.value);
          setCurrent(0);
        }}
        {...others}
      />
      <div className={styles.stepButtonBox}>
        {tip && (
          <div className={styles.tipText}>
            <Space>
              <InfoCircleOutlined />
              <span>{tip}</span>
            </Space>
          </div>
        )}
        <div>
          <Space>
            <Button
              onClick={() => {
                formartInput(temp);
                setCurrent(1);
              }}
            >
              格式化
            </Button>
            <Button
              loading={loading}
              type="primary"
              disabled={current !== 1}
              onClick={() => onSubmit(value)}
            >
              确定
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}

ArrayFormatTextArea.defaultProps = {
  value: [],
  onChange: EmptyFn,
  filter: [],
  separator: '\n',
  onSubmit: EmptyFn,
  others: {},
  loading: false,
  tip: '请点击格式化后确认参数再点击确定提交',
};

ArrayFormatTextArea.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  separator: PropTypes.string,
  filter: PropTypes.array,
  onSubmit: PropTypes.func,
  others: PropTypes.object,
  tip: PropTypes.string,
  loading: PropTypes.bool,
};

export default ArrayFormatTextArea;
