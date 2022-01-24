const fs = require('fs');
const join = require('path').join;
const _ = require('lodash');
const generateSysConfig = require('./generateSysConfig');

function generateOptions(options) {
  return _.map(
    options,
    ([key, val, name]) => ` ${key}:${_.isNumber(val) || _.isBoolean(val) ? val : `'${val}'`}`,
  );
}

function generateOptionNames(options) {
  return _.map(options, ([key, val, name]) => ` ${key}:'${name}'`);
}

function generateValueNames(options) {
  return _.map(options, ([key, val, name]) => ` '${val}':'${name}'`);
}

function generateFile(namespace, constant) {
  return _.map(constant, (options, name) => {
    const enumName = _.camelCase(namespace + '_' + name);
    return `
const ${enumName} =  {

    ${_.join(generateOptions(options), ',')},

    $names: {
        ${_.join(generateOptionNames(options), ',')}
    },

    $v_names: {
        ${_.join(generateValueNames(options), ',')}
    },
};

Object.defineProperty(${enumName}, "$names", {
      enumerable: false
 });

 Object.defineProperty(${enumName}, "$v_names", {
      enumerable: false
 });

export {  ${enumName}  };
`;
  });
}

function generateConstant(files) {
  return _.map(files, file => {
    const constant = require(join(__dirname, 'files', file));
    Object.defineProperty(constant, 'namespace', {
      enumerable: false,
    });
    const namespace = constant.namespace ? constant.namespace : '';
    return _.join(generateFile(namespace, constant), '');
  });
}

module.exports = async () => {
  const configTemp = await generateSysConfig();
  fs.writeFileSync(join(__dirname, 'files', 'sysConfig.js'), configTemp);
  const allfiles = fs.readdirSync(join(__dirname, 'files'));
  const temp = `
// 此代码为生成, 不要修改

    ${_.join(generateConstant(allfiles), '')}

`;

  fs.writeFileSync(__dirname + '/../../../src/utils/constantEnum.js', temp);
};
