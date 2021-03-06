import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Row, InputNumber, Checkbox, Button, Divider } from 'antd';
import _ from 'lodash';
import { TItem, TSelect, RichText, TButton } from '@/components/tis_ui';
import {
  appUserType,
  commonObjectType,
  commonYesNo,
  formDisplayMode,
  formType,
  formYesNo,
} from '@/utils/constantEnum';
import { PortraitTagDrawerSelect, TSearchSelector } from '@/components/bussinessComponents';
import classNames from 'classnames';
import globalStyles from '@/global.less';
import styles from '@/pages/scenesQA/scenesQA.less';
import questionsImg from './undraw_questions_75e0.png';
import RuleSelecter from '@/pages/scenesQA/editPages/RuleSelecter';

const defaultQuestion = {
  type: formType.radio,
  isRequired: commonYesNo.yes,
  title: '',
  name: '',
  colCount: '',
  cue: '',
  hidden: formYesNo.no,
  displayMode: 0,
  policyWords: [],
};

@connect(({ handlingConditions }) => handlingConditions)
class HcEditPage extends Component {
  policyWordsRef = React.createRef();

  form = React.createRef();

  update = _.debounce((formData = true) => {
    const { selectedNode, dispatch } = this.props;
    if (this.form && this.form.current && formData) {
      const vals = this.form.current.getFieldsValue();
      const { policyWords = [], cue, questionCue, optionRegular, questionRegular } = vals;
      selectedNode.question = {
        ...vals,
        regular: questionRegular,
        cue: questionCue,
        policyWords: _.map(policyWords, ({ value }) => ({ rid: value })),
      };
      selectedNode.cue = cue;
      selectedNode.regular = optionRegular;
    }
    dispatch({
      type: 'handlingConditions/refreshTree',
    });
  }, 500);

  render() {
    const { selectedNode, curSceneObjectType = '' } = this.props;
    const {
      name,
      question = {},
      regular: optionRegular,
      complianceTag,
      personalPortraitTag = [],
      legalPersonPortraitTag = [],
      cue,
    } = selectedNode;
    return (
      <Card
        title={name}
        bordered
        style={{
          height: '100%',
          position: 'relative',
        }}
        bodyStyle={{
          maxHeight: '100%',
        }}
      >
        <div
          style={{
            padding: '10px 0 10px 10px',
          }}
          className={classNames(
            styles.editPageInnerbox,
            styles.editPageInnerbox_short,
            globalStyles.innerboxScroll,
          )}
        >
          {question ? (
            <Form
              key={selectedNode.cid}
              ref={this.form}
              initialValues={{
                ...question,
                questionRegular: question && question.regular,
                optionRegular,
                policyWords: _.map(question.policyWords || [], ({ rid }) => rid),
                complianceTag,
                personalPortraitTag: _.map(personalPortraitTag, ({ tagId }) => tagId),
                legalPersonPortraitTag: _.map(legalPersonPortraitTag, ({ tagId }) => tagId),
                questionCue: question.cue,
                cue,
              }}
              style={{ padding: '0 5%' }}
            >
              <Divider orientation="left">????????????</Divider>
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
                    {_.map(commonYesNo, (val, key) => (
                      <TSelect.Option key={key} value={val}>
                        {commonYesNo.$v_names[val]}
                      </TSelect.Option>
                    ))}
                  </TSelect>
                </TItem>

                <TItem label="??????" name="hidden" valuePropName="checked">
                  <Checkbox onChange={this.update} />
                </TItem>

                <TItem label="????????????" name="complianceTag">
                  <TSelect
                    onChange={val => {
                      selectedNode.complianceTag = val;
                    }}
                  >
                    <TSelect.Option value={1}>??????</TSelect.Option>
                    <TSelect.Option value={0}>?????????</TSelect.Option>
                  </TSelect>
                </TItem>
                <TItem label="????????????" name="questionRegular">
                  <RuleSelecter onChange={this.update} />
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
                  <TSearchSelector
                    ref={this.policyWordsRef}
                    onChange={() => {
                      if (
                        !this.policyWordsRef.current.isUnmount &&
                        this.policyWordsRef.current.isReady
                      ) {
                        this.update();
                      }
                    }}
                    type="policyWords"
                  />
                </TItem>
                <TItem
                  labelCol={{ span: 6, offset: 18 }}
                  wrapperCol={{ span: 24 }}
                  label="??????????????????"
                  name="questionCue"
                >
                  <RichText base64 onChange={this.update} />
                </TItem>
              </Row>
              <Divider orientation="left">????????????</Divider>
              <Row>
                <TItem label="????????????" name="optionRegular">
                  <RuleSelecter onChange={this.update} />
                </TItem>
                <TItem name="personalPortraitTag" label="??????????????????">
                  <PortraitTagDrawerSelect
                    type={appUserType.self}
                    disabled={!curSceneObjectType.includes(commonObjectType.personal)}
                    onChange={(val = []) => {
                      selectedNode.personalPortraitTag = _.map(val, ({ key }) => ({ tagId: key }));
                    }}
                  />
                </TItem>
                <TItem name="legalPersonPortraitTag" label="??????????????????">
                  <PortraitTagDrawerSelect
                    type={appUserType.legalPerson}
                    disabled={!curSceneObjectType.includes(commonObjectType.legalPerson)}
                    onChange={(val = []) => {
                      selectedNode.legalPersonPortraitTag = _.map(val, ({ key }) => ({
                        tagId: key,
                      }));
                    }}
                  />
                </TItem>
                <TItem
                  label="??????????????????"
                  name="cue"
                  labelCol={{ span: 6, offset: 18 }}
                  wrapperCol={{ span: 24 }}
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
                    selectedNode.question = undefined;
                    selectedNode.complianceTag = undefined;
                    selectedNode.regular = undefined;
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
                    selectedNode.question = defaultQuestion;
                    this.update(false);
                  }}
                >
                  ????????????
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default HcEditPage;
