const [node, dojs, action, ...others] = process.argv;
switch (action) {
  case 'project':
    const project = require('./project');
    project(others);
    break;
  case 'new':
    const nPage = require('./page');
    nPage(others);
    break;
  case 'api':
    const gApi = require('./api');
    gApi();
    break;
  case 'msgapi':
    const gApi2 = require('./api/copyApi');
    gApi2('', 'http://10.10.22.224:13000/v2/api-docs', 'msgapi', ['notify']);
    break;
  case 'const':
    const constant = require('./constant');
    constant();
    break;
  case 'right':
    const right = require('./right');
    right();
    break;
  default:
    console.error('参数错误, 没有具体的操作类型[ page ]');
}
