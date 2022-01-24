import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const keyGenerator = new IDGenerator('treeKey_init');

function treeEach(root, fn) {
  const { children, key: parentKey } = fn(root);
  _.forEach(children, (item, key) => {
    treeEach({ ...item, key, pathKey: [...parentKey, key] }, fn);
  });
}

function treeSchema(root, fn) {
  const { children, pathKey: parentPathKey = [], desPath = [], type: parentType } = fn(root);
  _.forEach(children, (item, key) => {
    treeSchema(
      {
        ...item,
        key,
        desPath: [...desPath, item.description],
        pathKey: [...parentPathKey, key],
        parentType,
      },
      fn,
    );
  });
}

function flattenSchema(schema) {
  const schemaItems = [];
  if (schema.properties) {
    treeSchema(schema, item => {
      const {
        properties: children = [],
        items = [],
        desPath = [],
        description,
        type: nextType,
        key,
        pathKey = [],
        parentType,
      } = item;
      switch (nextType) {
        case 'array':
          // eslint-disable-next-line no-case-declarations
          const { properties: arrayProperties = [] } = items;
          schemaItems.push({
            key,
            description,
            pathKey,
            type: nextType,
            desPath,
            childrenLength: arrayProperties.length,
            parentType,
          });
          return {
            key,
            pathKey,
            desPath,
            type: nextType,
            children: arrayProperties,
          };
        default:
          schemaItems.push({
            key,
            description,
            pathKey,
            type: nextType,
            desPath,
            childrenLength: children.length,
            parentType,
          });
          return {
            key,
            pathKey,
            desPath,
            type: nextType,
            children,
          };
      }
    });
  }
  return schemaItems;
}

function treeAppendKey(tree, isRoot = true) {
  return _.map(tree, item => {
    const { children = [], conditionInfo = {} } = item;
    const formatItem = {
      ...item,
      isRoot,
      key: conditionInfo.id || keyGenerator.next(),
      children: treeAppendKey(children, false),
    };

    return formatItem;
  });
}

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);

// 递归获取key对应的值
function getTreeKeyItem(data= [], targetKey){
  return  _.reduce(data, (result = [], item) => {
      if(item[targetKey]) {
        result.push(item[targetKey])
      }
      if(item.children &&item.children.length){
       const childKeyItems =  getTreeKeyItem(item.children, targetKey);
       // eslint-disable-next-line no-param-reassign
       result = result.concat(childKeyItems)
    }
    return result
    }, [])  
  }

export { treeEach, flattenSchema, treeAppendKey, flatBy, getTreeKeyItem };
