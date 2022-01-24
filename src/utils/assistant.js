import _ from 'lodash';

function recursiveTreeData(treeData, map) {
  const { id, name, children = [], extra = {} } = map(treeData);
  return {
    id,
    name,
    children: _.map(children, item => recursiveTreeData(item, map)),
    extra,
  };
}

export { recursiveTreeData };
