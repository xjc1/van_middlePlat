import React, { Component } from 'react';
import { Button, Input, message, Modal, Table, Form, Divider } from 'antd';
import { TItem } from '@/components/tis_ui';
import { connect } from 'dva';
import _ from 'lodash';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

@connect(({ hotWords }) => ({ ...hotWords }))
class AddHotWords extends Component {
  state = {
    addHotWords: false,
    data: this.props.hotWords,
    showData: {},
  };

  addWords = () => {
    this.setState({ addHotWords: true });
  };

  save = () => {
    const { hotWords } = this.props;
    const { showData } = this.state;
    if (!showData.name) {
      message.info('请输入名称');
    }
    const data = _.unionBy(hotWords, [showData], 'name');
    if (data.length === hotWords.length) {
      message.info(`您已经添加过【${showData.name}】,请不要重复添加`);
      return;
    }
    hotWords.push(showData);
    this.saveHotWords(hotWords);
    this.setState({ addHotWords: false, showData: {}, data: [...hotWords] });
  };

  deleteWords = record => {
    const { hotWords } = this.props;
    if (hotWords.length > 0) {
      hotWords.forEach((item, index) => {
        if (item.name === record.name) {
          hotWords.splice(index, 1);
        }
      });
    }
    this.saveHotWords(hotWords);
    this.setState({ data: [...hotWords] });
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
    this.saveHotWords(data);
    this.setState({ data: [...data] });
  };

  saveHotWords = hotWords => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotWords/save',
      payload: hotWords,
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
    this.saveHotWords(data);
    this.setState({ data: [...data] });
  };

  render() {
    const { data } = this.state;
    const { check } = this.props;
    const column = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '70%',
      },
      {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        render: (text, record) => (
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
        <TItem label="已添加热词" {...layout}>
          <Button disabled={check} onClick={this.addWords}>
            添加
          </Button>
          <Table columns={column} dataSource={data} rowKey="id" />
        </TItem>
        <Modal
          title="添加热词"
          visible={this.state.addHotWords}
          onOk={this.save}
          destroyOnClose
          onCancel={() => this.setState({ addHotWords: false })}
        >
          <Form.Item label="热词名称" {...layout}>
            <Input id="name" onChange={this.updateText} />
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

export default AddHotWords;
