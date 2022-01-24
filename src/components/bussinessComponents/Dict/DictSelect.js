/* eslint-disable import/no-extraneous-dependencies  */
import React from 'react';
import PropTypes from 'prop-types';
import DictItemSelect from './DictSimpleSelect';
import DictLazyTreeSelect from './DictLazyTreeSelect';
import DictTreeSelect from './DictTreeSelect';

function DictSelect({
  dictType,
  dict,
  rootDict,
  treeNodeFilterProp,
  treeDefaultExpandAll,
  treeNodeLabelProp,
  ...others
}) {
  switch (dictType) {
    case 'lazyTree':
      return <DictLazyTreeSelect dict={dict} rootDict={rootDict} {...others} />;
    case 'tree':
      return (
        <DictTreeSelect
          dict={dict}
          rootDict={rootDict}
          treeNodeFilterProp={treeNodeFilterProp}
          treeDefaultExpandAll={treeDefaultExpandAll}
          treeNodeLabelProp={treeNodeLabelProp}
          {...others}
        />
      );
    case 'list':
    default:
      return (
        <DictItemSelect
          dict={dict}
          rootDict={rootDict}
          treeNodeFilterProp={treeNodeFilterProp}
          treeDefaultExpandAll={treeDefaultExpandAll}
          treeNodeLabelProp={treeNodeLabelProp}
          {...others}
        />
      );
  }
}

DictSelect.defaultProps = {
  dictType: 'list',
  showCode: false,
};

DictSelect.propTypes = {
  /** 字典码 */
  dict: PropTypes.string.isRequired,
  /** 是否显示code */
  showCode: PropTypes.bool,
  /**
   * 选择框类型
   * @param 可选值 tree / lazyTree / list
   */
  dictType: PropTypes.string,
};

export default DictSelect;
