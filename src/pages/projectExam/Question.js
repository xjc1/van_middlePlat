import React, { Component } from 'react';
import _ from 'lodash';
import { Card, Radio, Alert, Checkbox, InputNumber, Tooltip, Tag, Form } from 'antd';
import CheckIcon from './compontents/CheckIcon';
import style from './preview.less';
import classNames from 'classnames';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  marginRight: '4px',
};

const checkboxStyle = {
  marginLeft: '0px',
  display: 'block',
  // height: '30px',
  lineHeight: '30px',
  marginRight: '8px',
};

const checkicon = {
  float: 'right',
  marginLeft: 'auto',
  display: 'inline-block',
  lineHeight: '30px',
};

const QuestionType = {
  OneOf: { id: 'oneof', txt: '单选' },
  SomeOf: { id: 'someof', txt: '多选' },
  NumInput: { id: 'numinput', txt: '输入' },
};

function aliasSpan(aliasCode) {
  return aliasCode ? (
    <span
      style={{
        fontSize: '10px',
        fontStyle: 'italic',
        color: '#52c41a',
      }}
    >
      {aliasCode}
    </span>
  ) : null;
}

class DyForm extends Component {
  state = {
    showTip: '填写数值，可测试提示结果',
  };

  addNum = _.debounce((rules, val) => {
    const numVal = Number(val);
    if (_.isNumber(numVal)) {
      const result = _.find(rules, item => {
        const { items } = item;
        const compareResult = _.filter(items, ({ rule, value }) => {
          switch (rule) {
            case '>':
              return numVal > value;
            case '>=':
              return numVal >= value;
            case '=':
              return numVal === value;
            case '<':
              return numVal < value;
            case '<=':
              return numVal <= value;
          }
        });
        return compareResult.length === items.length;
      });
      this.setState({
        showTip: result ? result.tip : '没有适应的规则',
      });
    }
  }, 500);

  render() {
    const { type, items, rules, formName, onChange } = this.props;
    const { showTip } = this.state;
    switch (type) {
      case QuestionType.OneOf.id:
        return (
          <Form.Item name={formName}>
            <Radio.Group onChange={onChange}>
              {_.map(items, ({ id, value, text, score, aliasCode }) => (
                <Radio key={id} style={radioStyle} value={value}>
                  <span> {text}</span> {aliasSpan(aliasCode)}
                  <CheckIcon style={checkicon} status={text && value && score && 'success'} />
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case QuestionType.SomeOf.id:
        return (
          <Form.Item name={formName}>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              {_.map(items, ({ id, value, text, score, aliasCode }) => (
                <Checkbox key={id} style={checkboxStyle} value={value}>
                  <span> {text} </span> {aliasSpan(aliasCode)}
                  <CheckIcon style={checkicon} status={text && value && score && 'success'} />
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        );
      case QuestionType.NumInput.id:
        return (
          <Tooltip placement="topLeft" title={showTip}>
            <Form.Item name={formName}>
              <InputNumber
                style={{ width: '100%' }}
                onChange={val => {
                  this.addNum(rules, val);
                  onChange();
                }}
              />
            </Form.Item>
          </Tooltip>
        );
      default:
        return <Alert message="请选择表单类型" type="success" />;
    }
  }
}

function Question({
  id,
  name,
  items,
  rules,
  type,
  remarks,
  onClick,
  className,
  onChange,
  moveButtons = <></>,
}) {
  return (
    <Card
      style={{ position: 'relative' }}
      className={classNames(style.question, className)}
      size="small"
      title={
        <div>
          <Tag>{id}</Tag>
          <a
            style={{
              borderBottom: '1px solid #1890ff',
            }}
            onClick={e => {
              e.stopPropagation();
              if (e.target.nodeName === 'INPUT') return;
              onClick();
            }}
          >
            {name || (
              <span
                style={{
                  fontStyle: 'italic',
                  color: '#999',
                }}
              >
                点击编辑题目
              </span>
            )}
          </a>
        </div>
      }
      extra={<CheckIcon status={name && 'success'} />}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <pre
        style={{
          marginBottom: 10,
          fontStyle: 'italic',
          color: '#999999',
          fontSize: 10,
          background: '#e6f7ff',
        }}
      >
        {remarks}
      </pre>
      <DyForm type={type} formName={id} items={items} rules={rules} onChange={onChange} />
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>{moveButtons}</div>
    </Card>
  );
}

export default Question;
export { QuestionType };
