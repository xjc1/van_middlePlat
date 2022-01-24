import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';

@connect(({ scenesQA }) => scenesQA)
class SimpleScenesTree extends PureComponent {
  map2TreeData = (originTree, flatData) =>
    _.map(originTree, node => {
      const { cid, name, children = [], ybReusedField = {} } = node;
      flatData[cid] = node;
      const { showField = [], disableField = [], hideField = [] } = ybReusedField;
      return {
        key: `${cid}`,
        value: `${cid}`,
        title: name,
        disabled: showField.length === 0 && disableField.length === 0 && hideField.length === 0,
        children: this.map2TreeData(children, flatData),
      };
    });

  render() {
    const { tree, dispatch, onChange } = this.props;
    const flatData = {};
    const treeData = this.map2TreeData(tree, flatData);
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        treeNodeFilterProp="title"
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="选择要复制的主题节点"
        allowClear
        treeData={treeData}
        treeDefaultExpandAll
        onChange={id => {
          onChange(flatData[id]);
        }}
      />
    );
  }
}

export default SimpleScenesTree;
