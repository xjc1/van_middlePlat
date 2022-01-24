const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const generateStepModel = require('./generateStepModel');
const { generateStep1, generateStep1CSS } = require('./generateStep1');
const { generateStep2, generateStep2CSS } = require('./generateStep2');
const { generateStep3, generateStep3CSS } = require('./generateStep3');

function generateIndex(name, upperFirstName) {
  return `
import { Card, Steps } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
import { confirmAble } from "@/components/tis_ui";

const { Step } = Steps;

@connect(({ ${name} }) => ({ current: ${name}.current }))
class ${upperFirstName} extends PureComponent {
  static defaultProps = {
    role: null,
  };

  getCurrentStep() {
    const { current } = this.props;

    switch (current) {
      case 'p1':
        return 0;
      case 'p2':
        return 1;
      case 'p3':
        return 2;
      default:
        return 0;
    }
  }

  back2list = confirmAble({
    confirmText: '警告',
    confirmContent: "现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到XXXX吗?",
    onClick: () => {
      const { dispatch } = this.props;
      dispatch({ type: '${name}/resetVisible', payload: false })
    }
  });

  render() {
    const { role } = this.props;
    const currentStep = this.getCurrentStep();
    let stepComponent;

    if (currentStep === 1) {
      stepComponent = <Step2/>;
    } else if (currentStep === 2) {
      stepComponent = <Step3/>;
    } else {
      stepComponent = <Step1/>;
    }

    return (
      <div>
        <Card
          bordered
          title={<span>
            <a onClick={this.back2list}>角色列表</a>
            <span> / </span>{role ? <span>编辑角色</span> : <span>创建角色</span>}
          </span>}
        >
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="p1"/>
              <Step title="p2"/>
              <Step title="p3"/>
            </Steps>
            {stepComponent}
          </>
        </Card>
      </div>
    );
  }
}

export default ${upperFirstName};

    `
};

function generateCss(name, upperFirstName) {

  return `
@import '~antd/es/style/themes/default.less';

.card {
  margin-bottom: 24px;
}

.heading {
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 22px;
}

.steps:global(.ant-steps) {
  max-width: 750px;
  margin: 16px auto;
}

.errorIcon {
  margin-right: 24px;
  color: @error-color;
  cursor: pointer;
  span.anticon {
    margin-right: 4px;
  }
}

.errorPopover {
  :global {
    .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
}

.errorListItem {
  padding: 8px 16px;
  list-style: none;
  border-bottom: 1px solid @border-color-split;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: @primary-1;
  }
  &:last-child {
    border: 0;
  }
  .errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: @error-color;
  }
  .errorField {
    margin-top: 2px;
    color: @text-color-secondary;
    font-size: 12px;
  }
}

.editable {
  td {
    padding-top: 13px !important;
    padding-bottom: 12.5px !important;
  }
}

// custom footer for fixed footer toolbar
.advancedForm + div {
  padding-bottom: 64px;
}

.advancedForm {
  :global {
    .ant-form .ant-row:last-child .ant-form-item {
      margin-bottom: 24px;
    }
    .ant-table td {
      transition: none !important;
    }
  }
}

.optional {
  color: @text-color-secondary;
  font-style: normal;
}

  `;
}

module.exports = (dir, name) => {
  const upperFirstName = _.upperFirst(name);
  fs.writeFileSync(path.join(dir, 'index.js'), generateIndex(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'models', `${name}.js`), generateStepModel(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step1',`index.js`), generateStep1(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step1',`index.less`), generateStep1CSS(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step2',`index.js`), generateStep2(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step2',`index.less`), generateStep2CSS(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step3',`index.js`), generateStep3(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, 'components', 'Step3',`index.less`), generateStep3CSS(name, upperFirstName), { encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, `style.less`), generateCss(name, upperFirstName), { encoding: 'utf8' });
};
