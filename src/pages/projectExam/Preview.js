import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Card, Typography, Statistic, Divider, Button, Modal, Input, Form, message } from 'antd';
import { TItem } from '@/components/tis_ui';
import styles from './preview.less';
import { QuestionType } from './Question';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import CheckIcon from './compontents/CheckIcon';
import { connect } from 'dva';

const { Paragraph } = Typography;

function checkQuestionId(questions, nextId) {
  if (/^[A-Za-z0-9]+$/.test(nextId)) {
    if (_.find(questions, { id: nextId })) {
      message.error('ID 重复');
      return false;
    }
    return true;
  }
  message.error('问题ID只能为数字或者字符串的组合');
  return false;
}

function checkOptionValue(options, nextValue) {
  if (/^[A-Za-z0-9]+$/.test(nextValue)) {
    if (_.find(options, { value: nextValue })) {
      message.error('注意! value 和其他选项重复');
      return false;
    }
    return true;
  }
  message.error('选项value只能为数字或者字符串的组合');
  return false;
}

@connect(({ policyExam }) => ({ policyExam }))
class Preview extends PureComponent {
  render() {
    const {
      policyExam,
      currentProject,
      projectName,
      onClick,
      children,
      dispatch,
      resetFields,
      ...others
    } = this.props;
    const { scoreStageHelper, remarks, questions } = policyExam;
    const { score } = scoreStageHelper;
    let maxScore = 0;
    _.forEach(questions, ({ items, rules, type }) => {
      switch (type) {
        case QuestionType.OneOf.id:
          const qMax = _.maxBy(items, item => item.score);
          maxScore += qMax ? qMax.score : 0;
          break;
        case QuestionType.SomeOf.id:
          _.forEach(items, item => (maxScore += item.score || 0));
          break;
        case QuestionType.NumInput.id:
          const rMax = _.maxBy(rules, item => item.score);
          maxScore += rMax ? rMax.score : 0;
          break;
        default:
          break;
      }
    });
    return (
      <div {...others}>
        <Card
          className={styles.preview}
          title={currentProject.name}
          extra={
            <div>
              <Statistic
                style={{
                  display: 'inline-block',
                  marginRight: '15px',
                  lineHeight: 1,
                }}
                value={maxScore}
                suffix={`/ ${score}`}
              />
              <CheckIcon status={score && remarks ? 'success' : 'info'} />
            </div>
          }
          bodyStyle={{
            position: 'absolute',
            width: '100%',
            bottom: '0px',
            overflowY: 'auto',
            top: '60px',
            padding: '10px',
          }}
          onClick={onClick}
        >
          <Paragraph>
            <pre>{remarks}</pre>
          </Paragraph>
          {children}
          <Divider orientation="center" style={{ paddingTop: 15 }}>
            <Button.Group>
              <Button
                // type="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  Modal.confirm({
                    title: '确定重置表单数据?',

                    onOk() {
                      resetFields();
                      dispatch({
                        type: 'policyExam/updateFormData',
                        previewFormData: {},
                      });
                    },
                  });
                }}
              >
                <RedoOutlined />
                重置表单
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  let idForm = null;
                  Modal.confirm({
                    title: '创建一个新的题目?',
                    content: (
                      <Form
                        ref={form => {
                          idForm = form;
                        }}
                      >
                        <TItem col="24" name="newQuestionId" label="新题目id">
                          <Input />
                        </TItem>
                      </Form>
                    ),
                    onOk() {
                      const nextId = idForm.getFieldValue('newQuestionId');
                      if (checkQuestionId(questions, nextId)) {
                        dispatch({
                          type: 'policyExam/newQuestion',
                          id: nextId,
                        });
                      }
                    },
                  });
                }}
              >
                <PlusOutlined /> 新建题目
              </Button>
            </Button.Group>
          </Divider>
        </Card>
      </div>
    );
  }
}

export default Preview;
export { checkQuestionId, checkOptionValue };
