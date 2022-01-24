import React, { PureComponent } from 'react';
import _ from 'lodash';
import DictTreeSelect from './DictTreeSelect';

function isChildData(select, children = []) {
  const isExist = _.find(children, child => {
    const { value: childCode, children: children2 } = child;
    if (select === childCode) {
      return true;
    }
    if (children2 && children2.length > 0) {
      return isChildData(select, children2);
    }
    return false;
  });

  return !!isExist;
}

class MultiRootDictTreeSelect extends PureComponent {
  treeData = [];

  render() {
    const { onChange, needFormat = true, ...others } = this.props;
    return (
      <DictTreeSelect
        onTreeData={treeData => {
          this.treeData = treeData;
        }}
        cleanValue={rootCodes => {
          // 需要格式化才进行分类
          if (needFormat) {
            return _.reduce(
              rootCodes,
              (result, rootCode) => {
                const { codes } = rootCode;
                return _.concat(result, codes);
              },
              [],
            );
          }
          return rootCodes;
        }}
        onChange={selects => {
          // 需要格式化root字段
          if (needFormat) {
            const codes = _.map(this.treeData, ({ value, children = [] }) => {
              return {
                rootCode: value,
                codes: _.reduce(
                  selects,
                  (result, select) => {
                    if (isChildData(select, children)) {
                      result.push(select);
                    }
                    return result;
                  },
                  [],
                ),
              };
            });
            onChange(_.filter(codes, ({ codes: childrenCodes }) => childrenCodes.length > 0));
          } else {
            onChange(selects);
          }
        }}
        {...others}
      />
    );
  }
}

export default MultiRootDictTreeSelect;
