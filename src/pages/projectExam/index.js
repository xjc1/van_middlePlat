import React, { PureComponent } from 'react';
import _ from 'lodash';
import authEnum, { authCheck } from '@/utils/auth';
import Preview from './Preview';
import QuestionForm from './QuestionForm';
import ProjectForm from './ProjectForm';
import router from '@/utils/tRouter';
import { connect } from 'dva';
// import fetch from "isomorphic-unfetch";
import styles from './index.less';
import previewStyles from './preview.less';
import Question from './Question';
import { Button, Form, Modal, Tooltip, Divider } from 'antd';
import {
  CloudUploadOutlined,
  CalculatorOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import jsRun from './jsRun';
import ArrayTools from '@/utils/ArrayTools';

const { upGo, downGo } = ArrayTools;

@connect(({ policyExam }) => ({ policyExam }))
class PolicyExam extends PureComponent {
  formRef = React.createRef();

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'policyExam/flushDeclareProject',
      id,
      examType: match.path.indexOf('projectView') > -1 ? 'projectView' : 'projectManage',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyExam/resetState',
    });
  }

  backToList = () => {
    const { match } = this.props;
    if (match.path.indexOf('projectView') > -1) {
      router.push({ name: `/content/policyKnowledgeLib/projectView` });
    } else {
      router.push({ name: `projectManage` });
    }
  };
  // id, projectName
  // policyExam, actions, currentProject

  render() {
    const { policyExam, match, dispatch } = this.props;
    const { id } = match.params;
    if (!policyExam) {
      return null;
    }
    const {
      currentProject,
      currentQuestionForm,
      questions,
      previewFormData,
      mockUserData,
      temp,
      questionGroups,
    } = policyExam;
    return (
      <div className={styles.policy_exam_page}>
        <Preview
          currentProject={currentProject}
          resetFields={() => this.formRef.current.resetFields()}
          onClick={() => {
            dispatch({
              type: 'policyExam/changeQuestion',
              questionId: null,
            });
          }}
          className={styles.preview_block}
        >
          <Form ref={this.formRef}>
            {_.map(questions, (question, index) => (
              <Question
                {...question}
                key={question.id}
                moveButtons={
                  <>
                    <Tooltip title="上移问题" placement="top">
                      <Button
                        style={{ height: 'unset', width: 'unset', padding: '0px 3px' }}
                        onClick={() => {
                          const newQuestions = [...questions];
                          upGo(newQuestions, index);
                          dispatch({
                            type: 'policyExam/changeQuestionIndex',
                            questions: newQuestions,
                          });
                        }}
                        type="text"
                        icon={<ArrowUpOutlined style={{ fontSize: 14, color: '#1890ff' }} />}
                      />
                    </Tooltip>
                    <Tooltip title="下移问题" placement="top">
                      <Button
                        style={{ height: 'unset', width: 'unset', padding: '0px 3px' }}
                        onClick={() => {
                          const newQuestions = [...questions];
                          downGo(newQuestions, index);
                          dispatch({
                            type: 'policyExam/changeQuestionIndex',
                            questions: newQuestions,
                          });
                        }}
                        type="text"
                        icon={<ArrowDownOutlined style={{ fontSize: 14, color: '#1890ff' }} />}
                      />
                    </Tooltip>
                  </>
                }
                onChange={() => {
                  const formData = this.formRef.current.getFieldsValue();
                  dispatch({
                    type: 'policyExam/updateFormData',
                    previewFormData: formData,
                  });
                }}
                className={
                  currentQuestionForm &&
                  currentQuestionForm.id === question.id &&
                  previewStyles.selected
                }
                onClick={() => {
                  dispatch({
                    type: 'policyExam/changeQuestion',
                    questionId: question.id,
                  });
                }}
              />
            ))}
          </Form>
        </Preview>
        {!currentQuestionForm && <ProjectForm className={styles.form_block} />}
        {currentQuestionForm && <QuestionForm className={styles.form_block} />}
        <Button type="link" style={{ position: 'absolute', right: 300 }} onClick={this.backToList}>
          取消并返回
        </Button>

        {authCheck(
          [authEnum.projectManage_operate, authEnum.projectManage_publish],
          <Button
            type="primary"
            style={{
              background: '#52c41a',
              borderColor: '#52c41a',
              position: 'absolute',
              right: 180,
              width: 120,
            }}
            onClick={() => {
              const formData = previewFormData;

              try {
                const extraData = JSON.parse(mockUserData);
                const result = jsRun(['formData', 'extraData', temp], formData, extraData);
                Modal.info({
                  title: '计算结果',
                  content: (
                    <div>
                      <p>{result.str}</p>
                      <Divider orientation="left">分组信息</Divider>
                      {_.map(questionGroups, group => {
                        return (
                          <div key={group.id} className={styles.testExamCard}>
                            <span className={styles.testExamCardGroupTitle}>
                              {`[${group.id}]${group.name || ''} `}
                            </span>
                            {result.data[group.id] ? (
                              <p>{result.data[group.id]}</p>
                            ) : (
                              <p className={styles.testExamCardGroupWarning}>
                                注意,没有分组体检结果
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ),
                });
              } catch (e) {
                Modal.info({
                  title: '发生异常',
                  content: (
                    <div>
                      <p>{e.message}</p>
                    </div>
                  ),
                });
              }
            }}
          >
            <CalculatorOutlined /> 模拟计算
          </Button>,
        )}

        <Button
          type="primary"
          icon={<CloudUploadOutlined />}
          style={{ position: 'absolute', right: 50, width: 120 }}
          onClick={() => {
            dispatch({
              type: 'policyExam/submitProjectExam',
              id,
              examType: match.path.indexOf('projectView') > -1 ? 'projectView' : 'projectManage',
            });
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default PolicyExam;
