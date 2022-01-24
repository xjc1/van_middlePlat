const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const inquirer = require('inquirer');

const mainJs = `

`;

var temps = {
  tableQuery: '查询工具栏 + 主表格',
};

var summaryInfoType = {
  list: '列表',
  total: '总览',
};

module.exports = ([pageName]) => {
  console.info('开始创建新页面');
  const names = pageName.split('/');
  const name = names[names.length - 1];
  let nextStep = null;
  const dirr = path.join(process.cwd(), 'src', 'pages', ...names);
  if (!fs.existsSync(dirr)) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'temp',
          choices: _.map(temps, (v, k) => {
            return { name: v, value: v };
          }),
          message: '选择你的模板类型?',
        },
      ])
      .then(({ temp }) => {
        switch (temp) {
          case temps.tableQuery:
            fs.mkdirSync(dirr);
            fs.mkdirSync(path.join(dirr, 'models'));
            fs.mkdirSync(path.join(dirr, 'editComponents'));
            const generator = require('./tableQuery');
            generator({ dirr, pageName, name });
            break;
          default:
            break;
        }
        if (!nextStep) {
          console.info('创建完成');
        } else {
          return nextStep;
        }
      });
  } else {
    console.error(`[${dirr}], 此目录已经存在, 不能再操作.`);
  }
};
