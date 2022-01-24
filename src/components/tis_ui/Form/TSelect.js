/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

function getParentContainer(triggerNode) {
  return triggerNode.parentElement;
}

function TSelect({ allowClear = true, getPopupContainer = getParentContainer, ...others }) {
  return <Select allowClear={allowClear} getPopupContainer={getPopupContainer} {...others} />;
}

TSelect.Option = Select.Option;

TSelect.propTypes = {
  /** 是否支持清除 */
  allowClear: PropTypes.bool,
  /** 处理下拉框的渲染位置 */
  getPopupContainer: PropTypes.func,
}

export default TSelect;
