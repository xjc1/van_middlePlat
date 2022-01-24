import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Select, Alert, Button, Form, Modal, Tabs, Badge } from 'antd';
import { TItem } from '@/components/tis_ui';
import classNames from 'classnames';
import { MinusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { QuestionType } from './Question';
import OptionQuestionForm from './OptionQuestionForm';
import NumberInputQuestionForm from './NumberInputQuestionForm';
import Styles from './index.less';
import uiStyles from '@/components/tis_ui/tis.less';
import { checkQuestionId } from './Preview';
import { TSearchSelector } from '@/components/bussinessComponents';
import { policyexamNecessary } from '@/utils/constantEnum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function DyQuestionForm({ type, ...others }) {
  switch (type) {
    case QuestionType.OneOf.id:
      return <OptionQuestionForm {...others} />;
    case QuestionType.SomeOf.id:
      return <OptionQuestionForm {...others} />;
    case QuestionType.NumInput.id:
      return <NumberInputQuestionForm {...others} title="分值规则" />;
    default:
      return <Alert message="请选择表单类型" type="success" />;
  }
}

@connect(({ policyExam }) => ({ policyExam }))
class QuestionForm extends Component {
  questionForm = null;

  policyWordsRef = React.createRef();

  setQuestion = qid => {
    const { dispatch } = this.props;
    if (this.questionForm) {
      dispatch({
        type: 'policyExam/setQuestion',
        payload: {
          qid,
          id: this.questionForm.getFieldValue(`id_${qid}`),
          name: this.questionForm.getFieldValue(`name_${qid}`),
          type: this.questionForm.getFieldValue(`type_${qid}`),
          required: this.questionForm.getFieldValue(`required`),
          policyWords: _.map(
            this.questionForm.getFieldValue(`policyWords_${qid}`),
            ({ key }) => key,
          ),
          remarks: this.questionForm.getFieldValue(`remarks_${qid}`),
        },
      });
    }
  };

  render() {
    const { policyExam, dispatch, ...others } = this.props;
    const {
      currentQuestionForm: { id, qid, name, items, rules, type, remarks, policyWords, required },
    } = policyExam;
    return (
      <div {...others}>
        <Tabs defaultActiveKey="questionForm" className={Styles.questionTab} key={qid}>
          <Tabs.TabPane tab={<span>题目配置 [{id}]</span>} key="questionForm">
            <div className={classNames(Styles.questionForm, uiStyles.innerboxScroll)}>
              <Form
                ref={form => {
                  this.questionForm = form;
                }}
                initialValues={{
                  [`policyWords_${qid}`]: policyWords,
                  [`id_${qid}`]: id,
                  [`type_${qid}`]: type,
                  [`name_${qid}`]: name,
                  [`remarks_${qid}`]: remarks,
                  required,
                }}
              >
                <TItem col="24" name={`id_${qid}`} label="题目id" {...formLayout}>
                  <Input
                    onBlur={() => {
                      const { questions } = policyExam;
                      const nextId = this.questionForm.getFieldValue(`id_${qid}`);
                      if (nextId === id) return;
                      if (checkQuestionId(questions, nextId)) {
                        Modal.confirm({
                          title: `注意, 题目id将被替换 ${id} => ${nextId}?`,
                          onOk: () => {
                            this.setQuestion(qid);
                          },
                          onCancel: () => {
                            this.questionForm.setFieldsValue({ [`id_${qid}`]: id });
                          },
                        });
                      } else {
                        this.questionForm.setFieldsValue({ [`id_${qid}`]: id });
                      }
                    }}
                  />
                </TItem>
                <TItem col="24" name="required" label="必要条件选项" {...formLayout}>
                  <Select onChange={() => this.setQuestion(qid)}>
                    {_.map(policyexamNecessary, (val, key) => (
                      <Select.Option key={key} value={val}>
                        {policyexamNecessary.$names[key]}
                      </Select.Option>
                    ))}
                  </Select>
                </TItem>
                <TItem col="24" name={`type_${qid}`} label="题目表单类型" {...formLayout}>
                  <Select
                    onChange={() => {
                      Modal.confirm({
                        title: `切换题目类型会清空题目内容,并重新设置,确定切换吗?`,
                        onOk: () => {
                          dispatch({
                            type: 'policyExam/changeQuestionType',
                            nextType: this.questionForm.getFieldValue(`type_${qid}`),
                          });
                        },
                        onCancel: () => {
                          this.questionForm.setFieldsValue({
                            [`type_${qid}`]: type,
                          });
                        },
                      });
                    }}
                  >
                    {_.map(QuestionType, ({ id: typeId, txt }) => (
                      <Select.Option key={typeId} value={typeId}>
                        {txt}
                      </Select.Option>
                    ))}
                  </Select>
                </TItem>
                <TItem col="24" name={`name_${qid}`} label="题目内容" {...formLayout}>
                  <Input.TextArea rows={2} onChange={() => this.setQuestion(qid)} />
                </TItem>
                <TItem col="24" name={`remarks_${qid}`} label="题目备注" {...formLayout}>
                  <Input.TextArea rows={2} onChange={() => this.setQuestion(qid)} />
                </TItem>
                <TItem col="24" name={`policyWords_${qid}`} label="百科词条" {...formLayout}>
                  <TSearchSelector
                    ref={this.policyWordsRef}
                    type="policyWords"
                    onChange={() => {
                      if (
                        !this.policyWordsRef.current.isUnmount &&
                        this.policyWordsRef.current.isReady
                      ) {
                        this.setQuestion(qid);
                      }
                    }}
                  />
                </TItem>
                <div style={{ padding: '10px 0px', textAlign: 'center' }}>
                  <Button
                    type="danger"
                    icon={<MinusOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        title: `确定要删除当前题目吗[${id}]?`,
                        onOk: () => {
                          dispatch({
                            type: 'policyExam/removeQuestion',
                            removeId: qid,
                          });
                        },
                      });
                    }}
                  >
                    删除此题目
                  </Button>
                </div>
              </Form>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                选项设置{' '}
                {
                  <Badge
                    showZero
                    className={Styles.optionsNumBadge}
                    count={type === QuestionType.NumInput.id ? rules.length : items.length}
                  />
                }
              </span>
            }
            key="optionForm"
          >
            <DyQuestionForm
              key={id}
              className={classNames(Styles.questionForm, uiStyles.innerboxScroll)}
              type={type}
              items={items}
              required={required}
              rules={rules}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default QuestionForm;
