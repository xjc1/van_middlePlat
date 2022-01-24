const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const inquirer = require('inquirer');

const mainJs = `

`;

var temps = {
  blank: '空白页面',
  qttt: '查询工具栏 + 主表格',
  summaryInfo: '统计信息页面',
  f3r7: '左右栏布局, 左3右7  + 查询工具栏 + 主表格',
  step: '分布提交表单',
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
        console.info(temp);
        switch (temp) {
          case temps.qttt:
            fs.mkdirSync(dirr);
            fs.mkdirSync(path.join(dirr, 'models'));
            const qttt = require('./qtttTemp');
            qttt(dirr, name);
            break;

          case temps.summaryInfo:
            nextStep = { nextStepType: 'summaryInfo' };
            break;

          case temps.f3r7:
            fs.mkdirSync(dirr);
            fs.mkdirSync(path.join(dirr, 'models'));
            const f3r7 = require('./f3r7Temp');
            f3r7(dirr, name);
            break;

          case temps.blank:
            fs.mkdirSync(dirr);
            const blank = require('./blank');
            blank(dirr, name);
            break;

          case temps.step:
            fs.mkdirSync(dirr);
            fs.mkdirSync(path.join(dirr, 'models'));
            fs.mkdirSync(path.join(dirr, 'components'));
            fs.mkdirSync(path.join(dirr, 'components', 'Step1'));
            fs.mkdirSync(path.join(dirr, 'components', 'Step2'));
            fs.mkdirSync(path.join(dirr, 'components', 'Step3'));
            const step = require('./stepForm');
            step(dirr, name);
            break;
          default:
            break;
        }
        if (!nextStep) {
          console.info('创建完成');
        }else {
          return nextStep;
        }
      })
      .then(data => {
        const { nextStepType } = data || {};
        if (nextStepType === 'summaryInfo') {
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'type',
                choices: _.map(summaryInfoType, (v, k) => {
                  return { name: v, value: v };
                }),
                message: '选择你的展示类型?',
              },
            ])
            .then(({ type }) => {
              fs.mkdirSync(dirr);
              fs.mkdirSync(path.join(dirr, 'models'));
              const summaryInfo = require('./summaryInfo');
              summaryInfo(dirr, name, type);
              console.info('创建完成');
            });
        }
      });
  } else {
    console.error(`[${dirr}], 此目录已经存在, 不能再操作.`);
  }
};
