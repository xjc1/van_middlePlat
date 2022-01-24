import React, { PureComponent } from 'react';
import _ from 'lodash';
import { RichText, TItem, TControlItem } from '@/components/tis_ui';
import { Input, InputNumber, Divider, Button, Modal, Form, Select } from 'antd';
import { checkOptionValue } from './Preview';
import { connect } from 'dva';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { TSearchSelector, DictSelect } from '@/components/bussinessComponents';
import { policyexamNecessary, commonAbsence } from '@/utils/constantEnum';

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

@connect()
class OptionQuestionForm extends PureComponent {
  optionForm = null;

  state = {
    initialValues: null,
  };

  componentDidMount() {
    const { items } = this.props;
    const initialValues = {};
    _.forEach(items, ({ policyWords, cue, id, aliasCode }) => {
      initialValues[`policyWords_${id}`] = policyWords;
      initialValues[`sec_${id}`] = cue;
      initialValues[`aliasCode_${id}`] = aliasCode;
    });
    this.setState({ initialValues });
  }

  setOption = id => {
    const { dispatch } = this.props;
    const aliasCode = this.optionForm.getFieldValue(`aliasCode_${id}`);
    dispatch({
      type: 'policyExam/setOption',
      payload: {
        id,
        remarks: this.optionForm.getFieldValue(`remarks_${id}`),
        policyWords: _.map(this.optionForm.getFieldValue(`policyWords_${id}`), ({ key }) => key),
        value: this.optionForm.getFieldValue(`value_${id}`),
        score: this.optionForm.getFieldValue(`score_${id}`),
        accordScore: this.optionForm.getFieldValue(`accordScore_${id}`),
        text: this.optionForm.getFieldValue(`text_${id}`),
        cue: this.optionForm.getFieldValue(`sec_${id}`),
        mutex: this.optionForm.getFieldValue(`mutex_${id}`),
        aliasCode: _.isArray(aliasCode) ? aliasCode[aliasCode.length - 1] : aliasCode,
      },
    });
  };

  // setRichText = (id, html) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'policyExam/setOptionRichText',
  //     payload: {
  //       id,
  //       cue: _.isString(html) ? window.btoa(unescape(encodeURIComponent(html))) : null,
  //     },
  //   });
  // };

  render() {
    const { items, dispatch, required, ...others } = this.props;
    const { initialValues } = this.state;

    return (
      <div {...others}>
        {items && items.length > 0 && initialValues && (
          <Form
            ref={form => {
              this.optionForm = form;
            }}
            initialValues={initialValues}
          >
            {_.map(
              items,
              ({ id, score, text, value, remarks, accordScore = 1, mutex = false }, index) => (
                <div
                  key={value}
                  style={{
                    position: 'relative',
                  }}
                >
                  <Divider orientation="left" style={{ paddingTop: 20 }}>
                    选项{index + 1}{' '}
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
                          title: '确定要删除此选项吗?',
                          onOk() {
                            dispatch({
                              type: 'policyExam/removeOption',
                              id,
                            });
                          },
                        });
                      }}
                    />
                  </Divider>
                  <TItem
                    col={24}
                    initialValue={score}
                    name={`score_${id}`}
                    label="选项分值"
                    {...formLayout}
                  >
                    <InputNumber
                      onChange={() => {
                        this.setOption(id);
                      }}
                    />
                  </TItem>
                  {!_.isNil(required) && required === policyexamNecessary.plus && (
                    <TItem
                      col={24}
                      initialValue={accordScore}
                      name={`accordScore_${id}`}
                      label="符合度分值"
                      {...formLayout}
                    >
                      <InputNumber
                        onChange={() => {
                          this.setOption(id);
                        }}
                      />
                    </TItem>
                  )}
                  <TItem
                    col={24}
                    initialValue={text}
                    name={`text_${id}`}
                    label="选项名称"
                    {...formLayout}
                  >
                    <Input
                      onChange={() => {
                        this.setOption(id);
                      }}
                    />
                  </TItem>
                  <TControlItem
                    col={24}
                    defaultValid={initialValues[`aliasCode_${id}`]}
                    onValidChange={valid => {
                      if (!valid) {
                        this.optionForm.setFieldsValue({
                          [`aliasCode_${id}`]: undefined,
                        });
                      }
                      this.setOption(id);
                    }}
                    name={`aliasCode_${id}`}
                    label="别名"
                    {...formLayout}
                  >
                    <DictSelect
                      leafOnly
                      dict="physicalEx"
                      dictType="tree"
                      onChange={() => {
                        this.setOption(id);
                      }}
                    />
                  </TControlItem>
                  <TItem
                    col={24}
                    initialValue={value}
                    name={`value_${id}`}
                    label="选项值"
                    {...formLayout}
                  >
                    <Input
                      onBlur={() => {
                        const nextValue = this.optionForm.getFieldValue(`value_${id}`);
                        if (nextValue === value) return;
                        if (checkOptionValue(items, nextValue)) {
                          Modal.confirm({
                            title: `注意, 题目value将被替换 ${value} => ${nextValue}?`,
                            onOk: () => {
                              this.setOption(id);
                            },
                            onCancel: () => {
                              this.optionForm.setFieldsValue({ [`value_${id}`]: value });
                            },
                          });
                        } else {
                          this.optionForm.setFieldsValue({ [`value_${id}`]: value });
                        }
                      }}
                    />
                  </TItem>

                  <TItem
                    col={24}
                    initialValue={mutex}
                    name={`mutex_${id}`}
                    label="是否互斥"
                    {...formLayout}
                  >
                    <Select
                      onChange={() => {
                        this.setOption(id);
                      }}
                    >
                      {_.map(commonAbsence, (v, k) => (
                        <Select.Option value={v} key={k}>
                          {commonAbsence.$names[k]}
                        </Select.Option>
                      ))}
                    </Select>
                  </TItem>
                  <TItem
                    col={24}
                    initialValue={remarks}
                    name={`remarks_${id}`}
                    label="选项备注"
                    {...formLayout}
                  >
                    <Input
                      onChange={() => {
                        this.setOption(id);
                      }}
                    />
                  </TItem>
                  <TItem col={24} name={`policyWords_${id}`} label="百科词条" {...formLayout}>
                    <TSearchSelector
                      type="policyWords"
                      onChange={() => {
                        if (this.optionForm) {
                          this.setOption(id);
                        }
                      }}
                    />
                  </TItem>
                  <TItem col={24} name={`sec_${id}`} label="关联提示" {...formLayout}>
                    <RichText
                      base64
                      onChange={() => {
                        this.setOption(id);
                      }}
                    />
                  </TItem>
                </div>
              ),
            )}
          </Form>
        )}
        <Divider orientation="center" style={{ paddingTop: 15 }}>
          <Button
            type="primary"
            // shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              let optionForm = null;
              Modal.confirm({
                title: '创建一个新的选项?',
                content: (
                  <Form
                    ref={form => {
                      optionForm = form;
                    }}
                  >
                    <TItem col={24} name="newOptionValue" label="新选项value">
                      <Input />
                    </TItem>
                  </Form>
                ),
                onOk() {
                  const nextVal = optionForm.getFieldValue('newOptionValue');
                  if (checkOptionValue(items, nextVal)) {
                    dispatch({
                      type: 'policyExam/newOption',
                      value: nextVal,
                    });
                  }
                },
              });
            }}
          >
            添加新选项
          </Button>
        </Divider>
      </div>
    );
  }
}

export default OptionQuestionForm;
