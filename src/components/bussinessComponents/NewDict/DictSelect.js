/* eslint-disable import/no-extraneous-dependencies  */
import React from 'react';
import PropTypes from 'prop-types';
import DictItemSelect from './DictSimpleSelect';
import DictLazyTreeSelect from './DictLazyTreeSelect';
import DictTreeSelect from './DictTreeSelect';

/*
 * 多root模式下的DictSelect目前只支持 tree 一种模式
 * */
function DictSelect({ dictType, dict, ...others }) {
  switch (dictType) {
    case 'lazyTree':
      return <DictLazyTreeSelect dict={dict} {...others} />;
    case 'tree':
      return <DictTreeSelect dict={dict} {...others} />;
    case 'list':
    default:
      return <DictItemSelect dict={dict} {...others} />;
  }
}

DictSelect.defaultProps = {
  dictType: 'list',
};

DictSelect.propTypes = {
  /** 字典码 */
  dict: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  /**
   * 选择框类型
   * @param 可选值 tree / lazyTree / list
   */
  dictType: PropTypes.string,
};

export default DictSelect;
