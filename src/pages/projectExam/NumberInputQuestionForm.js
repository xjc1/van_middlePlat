import React, { Component } from 'react';
import _ from 'lodash';
import { TItem } from '@/components/tis_ui';
import { Input, Select, InputNumber, Divider, Button, Form, Modal, Row } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { policyexamIsAccord, policyexamNecessary } from '@/utils/constantEnum';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formLayout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 11 },
};

const compareSelect = {
  '>': '大于',
  '>=': '大于等于',
  '<': '小于',
  '<=': '小于等于',
  '=': '等于',
};

@connect()
class NumberInputQuestionForm extends Component {
  rulesForm = {};

  setRule = _.debounce(() => {
    const { dispatch, rules } = this.props;
    const result = _.map(rules, ({ id, items }) => {
      const form = this.rulesForm[id];
      const {
        rule_k,
        rule_v,
        rule_score,
        rule_accord_score,
        rule_tip,
        rule_accord,
      } = form.getFieldsValue();
      const itemVals = _.map(items, ({ id: itemId }) => {
        return {
          rule: rule_k[itemId],
          value: `${rule_v[itemId]}`,
          id: itemId,
        };
      });
      return {
        items: itemVals,
        score: rule_score,
        tip: rule_tip,
        accordScore: rule_accord_score,
        accord: rule_accord,
        id,
      };
    });
    dispatch({
      type: 'policyExam/setRules',
      rules: result,
    });
  }, 200);

  render() {
    const { rules = [], dispatch, required, ...others } = this.props;
    return (
      <div {...others}>
        {_.map(rules, ({ items, tip, score, accordScore = 0, accord = 0, id }, index) => (
          <div
            key={id}
            style={{
              position: 'relative',
            }}
          >
            <Divider orientation="left" style={{ paddingTop: 20 }}>
              规则{index + 1}
              <Button
                type="danger"
                shape="circle"
                icon={<CloseOutlined />}
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 10,
                  top: 15,
                }}
                onClick={() => {
                  Modal.confirm({
                    title: '确定要删除此规则吗?',
                    onOk() {
                      dispatch({
                        type: 'policyExam/removeRule',
                        removeId: id,
                      });
                    },
                  });
                }}
              />
            </Divider>
            <Form
              ref={form => {
                this.rulesForm[id] = form;
              }}
            >
              {_.map(items, (item, indexII) => {
                return (
                  <Row key={item.id}>
                    <TItem
                      col={12}
                      initialValue={item.rule}
                      name={['rule_k', item.id]}
                      label="条件分值"
                      {...formLayout}
                    >
                      <Select onChange={this.setRule}>
                        {_.map(compareSelect, (v, k) => (
                          <Select.Option key={k} value={k}>
                            {v}
                          </Select.Option>
                        ))}
                      </Select>
                    </TItem>
                    <TItem
                      col={8}
                      initialValue={item.value}
                      name={['rule_v', item.id]}
                      label=""
                      labelCol={{ span: 2 }}
                      wrapperCol={{ span: 22 }}
                    >
                      <InputNumber
                        onChange={value => {
                          // 没有值给默认值0
                          if (!value) {
                            // 先取值
                            const rulesValue = this.rulesForm[id].getFieldValue('rule_v');
                            this.rulesForm[id].setFieldsValue({
                              rule_v: { ...rulesValue, [item.id]: 0 },
                            });
                          }
                          this.setRule();
                        }}
                      />
                    </TItem>
                    {items.length !== 1 && (
                      <TItem col={2} style={{ textAlign: 'center' }}>
                        <Button
                          type="danger"
                          icon={<MinusOutlined />}
                          onClick={() => {
                            dispatch({
                              type: 'policyExam/removeRuleItem',
                              payload: {
                                id,
                                removeId: item.id,
                              },
                            });
                          }}
                        />
                      </TItem>
                    )}
                    {items.length === indexII + 1 && (
                      <TItem col={2} style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            dispatch({
                              type: 'policyExam/addRuleItem',
                              id,
                            });
                          }}
                        />
                      </TItem>
                    )}
                  </Row>
                );
              })}

              <TItem col="24" initialValue={score} name="rule_score" label="分值" {...formLayout2}>
                <InputNumber style={{ width: '100%' }} onChange={this.setRule} />
              </TItem>

              {!_.isNil(required) && required === policyexamNecessary.plus && (
                <TItem
                  col="24"
                  initialValue={accordScore}
                  name="rule_accord_score"
                  label="符合度分值"
                  {...formLayout2}
                >
                  <InputNumber style={{ width: '100%' }} onChange={this.setRule} />
                </TItem>
              )}

              <TItem
                col="24"
                initialValue={accord}
                name="rule_accord"
                label="报告辨识度"
                {...formLayout2}
              >
                <Select onChange={this.setRule}>
                  {_.map(policyexamIsAccord, (v, k) => (
                    <Select.Option key={k} value={v}>
                      {policyexamIsAccord.$names[k]}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>

              <TItem col="24" initialValue={tip} name="rule_tip" label="提示" {...formLayout2}>
                <Input onChange={this.setRule} />
              </TItem>
            </Form>
          </div>
        ))}
        <Divider orientation="center" style={{ paddingTop: 15 }}>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch({
                type: 'policyExam/addRule',
              });
            }}
          />
        </Divider>
      </div>
    );
  }
}

export default NumberInputQuestionForm;
export { compareSelect };
