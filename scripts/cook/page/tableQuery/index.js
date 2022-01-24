const fs = require('fs');
const ejs = require('ejs');
const _ = require('lodash');
const path = require('path');

module.exports = async function({ dirr, name, pageName }) {
  const data = {
    pageName,
    name,
    upperName: _.upperFirst(name),
  };
  const indexCode = await ejs.renderFile(path.join(__dirname, 'temp', 'index.tmp'), data);
  const queryCode = await ejs.renderFile(path.join(__dirname, 'temp', 'query.tmp'), data);
  const viewCode = await ejs.renderFile(path.join(__dirname, 'temp', 'view.tmp'), data);
  const modelCode = await ejs.renderFile(path.join(__dirname, 'temp', 'model.tmp'), data);
  const listCode = await ejs.renderFile(path.join(__dirname, 'temp', 'list.tmp'), data);
  const initCode = await ejs.renderFile(path.join(__dirname, 'temp', 'initData.tmp'), data);
  const editCode = await ejs.renderFile(path.join(__dirname, 'temp', 'edit.tmp'), data);
  const createCode = await ejs.renderFile(path.join(__dirname, 'temp', 'create.tmp'), data);
  const baseInfoCode = await ejs.renderFile(path.join(__dirname, 'temp', 'baseInfo.tmp'), data);
  const lessCode = await ejs.renderFile(path.join(__dirname, 'temp', 'less.tmp'), data);
  const option = { encoding: 'utf8' };
  fs.writeFileSync(path.join(dirr, 'index.js'), indexCode, option);
  fs.writeFileSync(path.join(dirr, 'models', `${name}.js`), modelCode, option);
  fs.writeFileSync(path.join(dirr, `${data.upperName}List.js`), listCode, option);
  fs.writeFileSync(path.join(dirr, `index.less`), lessCode, option);
  fs.writeFileSync(path.join(dirr, `${data.upperName}QueryBar.js`), queryCode, option);
  fs.writeFileSync(path.join(dirr, `View${data.upperName}.js`), viewCode, option);
  fs.writeFileSync(path.join(dirr, `Edit${data.upperName}.js`), editCode, option);
  fs.writeFileSync(path.join(dirr, `initData.js`), initCode, option);
  fs.writeFileSync(
    path.join(dirr, 'editComponents', `Create${data.upperName}.js`),
    createCode,
    option,
  );
  fs.writeFileSync(path.join(dirr, 'editComponents', `BaseInfo.js`), baseInfoCode, option);
};
