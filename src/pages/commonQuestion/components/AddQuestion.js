import React, { Component } from 'react';
import { Button, Input, message, Modal, Table, Form, Divider } from 'antd';
import { connect } from 'dva';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

@connect(({ commonQuestion: { questions } }) => ({ questions }))
class AddQuestion extends Component {
  state = {
    addQuestions: false,
    data: [],
    showData: {},
  };

  componentDidMount() {
    const { value = [], dispatch } = this.props;
    const newValue = value.map(it => ({ name: it }));
    this.setState({ data: newValue });
    // 数据初始化
    dispatch({
      type: 'commonQuestion/saveQuestion',
      payload: newValue,
    });
  }

  addWords = () => {
    this.setState({ addQuestions: true });
  };

  save = () => {
    const { questions } = this.props;
    const { showData } = this.state;
    if (!showData.name) {
      message.info('请输入名称');
      return;
    }
    const data = _.unionBy(questions, [showData], 'name');
    if (data.length === questions.length) {
      message.info(`您已经添加过【${showData.name}】,请不要重复添加`);
      return;
    }
    questions.push(showData);
    this.saveQuestions(questions);
    this.setState({ addQuestions: false, showData: {}, data: [...questions] });
  };

  deleteWords = record => {
    const { questions } = this.props;
    if (questions.length > 0) {
      questions.forEach((item, index) => {
        if (item.name === record.name) {
          questions.splice(index, 1);
        }
      });
    }
    this.saveQuestions(questions);
    this.setState({ data: [...questions] });
  };

  updateText = event => {
    const { showData } = this.state;
    showData[event.target.id] = event.target.value;
    this.setState({ showData });
  };

  handleUpScene = item => {
    const { data } = this.state;
    if (data) {
      data.map((scene, index) => {
        if (item.name === scene.name) {
          if (index === 0) {
            message.info('已经是第一个，无法再上移了');
          } else {
            const name = data[index - 1];
            data.splice(index - 1, 1, data[index]);
            data.splice(index, 1, name);
          }
        }
      });
    }
    this.saveQuestions(data);
    this.setState({ data: [...data] });
  };

  saveQuestions = questions => {
    const { dispatch, onChange = EmptyFn } = this.props;
    const newValue = questions.map(({ name }) => name);
    onChange(newValue);
    dispatch({
      type: 'commonQuestion/saveQuestion',
      payload: questions,
    });
  };

  handleDownScene = item => {
    const { data } = this.state;
    let count = 0;
    let ix = 0;
    if (data) {
      data.map((scene, index) => {
        if (item.name === scene.name) {
          if (index === data.length - 1) {
            message.info('已经是最后一个，无法再下移了');
          } else {
            count = 1;
            ix = index;
          }
        }
      });
      if (count > 0) {
        const name = data[ix];
        data.splice(ix, 1, data[ix + 1]);
        data.splice(ix + 1, 1, name);
      }
    }
    this.saveQuestions(data);
    this.setState({ data: [...data] });
  };

  render() {
    const { data } = this.state;
    const { disabled } = this.props;
    const column = [
      {
        title: '名称',
        dataIndex: 'name',
        width: '70%',
      },
      {
        title: '操作',
        key: 'operator',
        render: (text, record) =>
          !disabled && (
            <span>
              <a style={{ color: 'red' }} onClick={this.deleteWords.bind(this, record)}>
                删除
              </a>
              <Divider type="vertical" />
              <a onClick={this.handleUpScene.bind(this, record)}>上移</a>
              <Divider type="vertical" />
              <a onClick={this.handleDownScene.bind(this, record)}>下移</a>
            </span>
          ),
      },
    ];
    return (
      <div>
        <Button disabled={disabled} onClick={this.addWords}>
          添加
        </Button>
        <Table columns={column} dataSource={data} rowKey={item => item.name} />
        <Modal
          title="添加常用问句"
          visible={this.state.addQuestions}
          onOk={this.save}
          destroyOnClose
          onCancel={() => this.setState({ addQuestions: false })}
        >
          <Form.Item label="问句名称" {...layout}>
            <Input id="name" onChange={this.updateText} />
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

export default AddQuestion;
