import React, { Component } from 'react';
import { Form, Row, Input, InputNumber, Button, Checkbox } from 'antd';
import { TItem, RichText, TSelect, TButton } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents';
import { connect } from 'dva';
import _ from 'lodash';
import { stringYesNo, formDisplayMode, formType, formYesNo } from '@/utils/constantEnum';
import styles from './editPages.less';
import questionsImg from './undraw_questions_75e0.png';
import RuleSelecter from '@/pages/scenesQA/editPages/RuleSelecter';

const defaultQuestion = {
  type: formType.radio,
  isRequired: stringYesNo.yes,
  title: '',
  name: '',
  colCount: '',
  cue: '',
  hidden: formYesNo.no,
  displayMode: 0,
  policyWords: [],
};

@connect(({ scenesQA }) => ({ focusNode: scenesQA.focusNode, tree: scenesQA.tree }))
export default class Question extends Component {
  isFinish = false;

  form = React.createRef();

  update = _.debounce((formData = true) => {
    if (this.isFinish) return;
    const { focusNode, dispatch } = this.props;
    if (this.form && this.form.current && formData) {
      const vals = this.form.current.getFieldsValue();
      const { policyWords = [] } = vals;
      focusNode.question = {
        ...vals,
        policyWords: _.map(policyWords, ({ value }) => ({ rid: value })),
      };

    }
    dispatch({
      type: 'scenesQA/touch',
    });
  }, 500);

  componentWillUnmount() {
    const { focusNode } = this.props;
    this.isFinish = true;
    if (this.form && this.form.current && !_.isUndefined(focusNode.question)) {
      const vals = this.form.current.getFieldsValue();
      const { policyWords = [] } = vals;
      focusNode.question = {
        ...vals,
        policyWords: _.map(policyWords, ({ value }) => ({ rid: value })),
      };
    }
  }

  render() {
    const { focusNode } = this.props;
    const { question } = focusNode;
    return (
      <>
        {question ? (
          <Form
            key={focusNode.cid}
            ref={this.form}
            initialValues={{
              ...question,
              policyWords: _.map(question.policyWords || [], ({ rid }) => rid),
            }}
            style={{ padding: '0 5%' }}
          >
            <Row>
              <TItem label="????????????" name="name">
                <Input onChange={this.update} />
              </TItem>

              <TItem label="????????????" name="title">
                <Input onChange={this.update} />
              </TItem>

              <TItem label="????????????" name="type">
                <TSelect onChange={this.update}>
                  {_.map(formType, (val, key) => (
                    <TSelect.Option key={key} value={val}>
                      {formType.$names[key]}
                    </TSelect.Option>
                  ))}
                </TSelect>
              </TItem>

              <TItem label="??????????????????" name="colCount">
                <InputNumber onChange={this.update} style={{ width: '100%' }} min={1} />
              </TItem>

              <TItem label="??????" name="isRequired">
                <TSelect onChange={this.update}>
                  {_.map(stringYesNo, (val, key) => (
                    <TSelect.Option key={key} value={val}>
                      {stringYesNo.$v_names[val]}
                    </TSelect.Option>
                  ))}
                </TSelect>
              </TItem>

              <TItem label="??????" name="hidden" valuePropName="checked">
                <Checkbox onChange={this.update} />
              </TItem>

              <TItem label="??????????????????" name="displayMode">
                <TSelect onChange={this.update}>
                  {_.map(formDisplayMode, (val, key) => (
                    <TSelect.Option key={key} value={val}>
                      {formDisplayMode.$names[key]}
                    </TSelect.Option>
                  ))}
                </TSelect>
              </TItem>

              <TItem label="????????????" name="policyWords">
                <TSearchSelector onChange={this.update} type="policyWords" />
              </TItem>

              <TItem label="????????????" name="regular">
                <RuleSelecter onChange={this.update} />
              </TItem>

              <TItem
                labelCol={{ span: 6, offset: 18 }}
                wrapperCol={{ span: 24 }}
                label="??????????????????"
                name="cue"
              >
                <RichText
                  base64
                  onChange={() => {
                    this.update();
                  }}
                />
              </TItem>
            </Row>
            <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
              <TButton.Delete
                block
                ghost={false}
                confirmText="??????"
                confirmContent="????????????????????????????"
                style={{
                  marginTop: 20,
                }}
                onClick={() => {
                  focusNode.question = undefined;
                  this.form.current.setFieldsValue(defaultQuestion);
                  this.update(false);
                }}
              >
                ????????????
              </TButton.Delete>
            </TItem>
          </Form>
        ) : (
          <div className={styles.flexCenter}>
            <div className={styles.centered}>
              <img alt="questions" src={questionsImg} width={400} />
              <Button
                type="primary"
                onClick={() => {
                  focusNode.question = defaultQuestion;
                  this.update(false);
                }}
              >
                ????????????
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
