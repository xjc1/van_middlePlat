import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Input, Form, Tabs } from 'antd';
import { TItem, CodeCard, RichText } from '@/components/tis_ui';
import uiStyles from '@/components/tis_ui/tis.less';
import { connect } from 'dva';
import authEnum, { authCheck } from '@/utils/auth';
import StageHelper from '@/pages/projectExam/StageHelper';
import classNames from 'classnames';
import Styles from '@/pages/projectExam/index.less';
import { CaretRightOutlined } from '@ant-design/icons';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Style from './index.less';
import StageSliderGroup from './StageSliderGroup';
import 'codemirror/mode/javascript/javascript';
import QuestionGroupConfig from './QuestionGroupConfig';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function generateFormData(previewFormData) {
  return `
/*
  formData 模拟数据, 通过勾选左侧预览体检表单, 生成formData 数据,
  (不可手动修改)
*/
const formData = ${JSON.stringify(previewFormData, null, 2)};

                  `;
}

@connect(({ policyExam }) => ({ policyExam }))
class ProjectForm extends PureComponent {
  projectForm = null;

  codeMirrorRef = React.createRef();

  setProjectRemarks = _.debounce(() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setProjectRemarks',
      remarks: this.projectForm.getFieldValue('remarks'),
    });
  }, 500);

  onCustomizeChange = _.debounce(() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setProjectCustomize',
      customize: this.projectForm.getFieldValue('customize'),
    });
  }, 500);

  onStageChange = _.debounce(([score, scoreStage]) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setScore',
      payload: StageHelper.create(score, scoreStage),
    });
  }, 500);

  onAccordStageChange = _.debounce(([score, scoreStage]) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setAccordScore',
      payload: StageHelper.create(score, scoreStage),
    });
  }, 500);

  onUpdateTemp = _.debounce(temp => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setTemp',
      temp,
    });
  }, 300);

  onUpdateUserData = _.debounce(mockUserData => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/setUserData',
      mockUserData,
    });
  }, 300);

  // setPolicyWords = _.debounce((nameItemKey, index) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'policyExam/setProjectPolicyWords',
  //     payload: {
  //       index,
  //       policyWords: _.map(this.projectForm.getFieldValue(`policyWords`), ({ key }) => ({
  //         id: key,
  //       })),
  //     },
  //   });
  // }, 500);

  render() {
    const { policyExam, dispatch, ...others } = this.props;
    const {
      scoreStageHelper,
      remarks,
      customize,
      temp,
      mockUserData,
      accordScoreStageHelper,
      previewFormData,
      questions,
    } = policyExam;
    const formDataTemp = generateFormData(previewFormData);
    return (
      <div {...others}>
        <Tabs defaultActiveKey="projectForm" className={Styles.projectTab}>
          <Tabs.TabPane tab={<span>项目配置</span>} key="projectForm">
            <div className={classNames(Style.projectForm, uiStyles.innerboxScroll)}>
              <Form
                ref={form => {
                  this.projectForm = form;
                }}
                initialValues={{
                  remarks,
                  customize,
                }}
              >
                <TItem col="24" name="remarks" label="项目备注" {...formLayout}>
                  <Input.TextArea rows={4} onChange={this.setProjectRemarks} />
                </TItem>
                <TItem col="24" name="customize" label="报告自定义" {...formLayout}>
                  <RichText base64 onChange={this.onCustomizeChange} />
                </TItem>
              </Form>
              <CodeCard className={Style.marginBtm20}>
                <StageSliderGroup
                  key="score"
                  title="匹配度规则"
                  childTitle="名称"
                  stageHelper={scoreStageHelper}
                  onStageChange={this.onStageChange}
                />
              </CodeCard>

              <CodeCard>
                <StageSliderGroup
                  key="accordScore"
                  title="符合度规则"
                  childTitle="名称"
                  stageHelper={accordScoreStageHelper}
                  onStageChange={this.onAccordStageChange}
                />
              </CodeCard>
            </div>
          </Tabs.TabPane>
          {authCheck(
            [authEnum.projectManage_publish, authEnum.projectManage_operate],
            <Tabs.TabPane
              tab={<span>计算配置</span>}
              key="computeProcess"
              className={Styles.computeTabs}
            >
              <Tabs tabPosition="left">
                <Tabs.TabPane tab="模拟参数" key="1">
                  <CodeMirror
                    value={formDataTemp}
                    className={Styles.codemirrorParams}
                    options={{
                      mode: 'javascript',
                      theme: 'eclipse',
                      lineNumbers: true,
                      smartIndent: true,
                      autoRefresh: true,
                      indentUnit: 4,
                      readOnly: true,
                      autoCursor: true,
                    }}
                  />
                  <CodeMirror
                    value={mockUserData}
                    className={Styles.codemirrorParams2}
                    detach
                    options={{
                      mode: 'javascript',
                      theme: 'eclipse',
                      lineNumbers: true,
                      smartIndent: true,
                      indentUnit: 4,
                    }}
                    onChange={(editor, data, value) => {
                      this.onUpdateUserData(value);
                    }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <div>
                      计算过程 <CaretRightOutlined />
                    </div>
                  }
                  key="2"
                >
                  <CodeMirror
                    value={temp}
                    className={Styles.codemirrorCompute}
                    detach
                    options={{
                      mode: 'javascript',
                      theme: 'eclipse',
                      lineNumbers: true,
                      smartIndent: true,
                      indentUnit: 4,
                    }}
                    onChange={(editor, data, value) => {
                      this.onUpdateTemp(value);
                    }}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>,
          )}

          <Tabs.TabPane tab={<span>题目分组</span>} key="questionGroup">
            <QuestionGroupConfig questions={questions} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProjectForm;
