'use strict';

const fs = require('fs');
const _ = require('lodash');
const dict = require('./dict');

function generateListDict(items, parentKey, temp, allName, parentPath = [], feature = false) {
  _.forEach(
    items,
    ({ name, status, children, key: itemKey, desc, hasLeaf = false, alias }, key) => {
      const newKey = itemKey ? itemKey : key;
      const newAllName = allName ? `${allName}/${name}` : name;
      const paths = [...parentPath, newKey];
      if (status === 'VALID') {
        temp[newKey] = {
          key: newKey,
          parent: parentKey ? parentKey : 'root',
          paths,
          name,
          feature,
          allName: newAllName,
          hasLeaf,
          desc,
          status,
          alias,
        };
      }
      if (children) {
        generateListDict(children, newKey, temp, newAllName, paths, hasLeaf);
      }
    },
  );
  return temp;
}

function generateTreeDict(items, parentKey, tree) {
  tree += '[';
  _.forEach(
    items,
    ({ name, status, children, key: itemKey, desc, hasLeaf = false, alias }, key) => {
      const newKey = itemKey ? itemKey : key;
      tree += `
        {
          key: '${newKey}',
          name:'${name}',
          status: '${status}',
          desc: ${desc ? `'${desc}'` : null},
          hasLeaf: ${hasLeaf},
          children: ${children ? generateTreeDict(children, newKey, '') : `[]`}
        },
    `;
    },
  );
  tree += ']';
  return tree;
}

function arrayToObj(arr) {
  var obj = {};

  _.forEach(arr, ({ key, alias }, k) => {
    obj[key] = key;
    if (alias) {
      obj[`${key}_alias`] = [key, ...alias];
    }
  });

  return obj;
}

function defaultRewriteRight(dict) {
  return dict;
}

module.exports = (fn = defaultRewriteRight) => {
  const nextDict = fn(dict);
  const permissionItems = generateListDict(nextDict, undefined, {}, '');
  const treenodes = generateTreeDict(nextDict, null, '');
  const permissionKeys = _.keys(permissionItems);
  const authEnum = arrayToObj(permissionItems);
  const tempJson = JSON.stringify(permissionItems);

  fs.writeFileSync(
    __dirname + '/../../../src/utils/permissionEnum.js',
    `
const viewPermissions = ${tempJson.replace(/"(\w+)":/g, '$1:')};

const treePermissions = ${treenodes};

const permissionKeys = ${JSON.stringify(permissionKeys)};

const authEnum = ${JSON.stringify(authEnum)}

const global = {
    viewPermissions,
    treePermissions, 
    permissionKeys,
    authEnum,
}

export default global;
    `,
  );

  fs.writeFileSync(
    __dirname + '/../../../config/authEnum.js',
    `
const authEnum = ${JSON.stringify(authEnum)};

module.exports =  { authEnum };

    `,
  );
};
