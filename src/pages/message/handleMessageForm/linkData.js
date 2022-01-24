import React, { Component } from 'react';
import { Button, Input, message, Modal, Table, Form } from 'antd';
import { TItem } from '@/components/tis_ui';
import { connect } from 'react-redux';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

@connect(({ createMessageForm }) => ({
  ...createMessageForm.step,
}))
class LinkData extends Component {
  state = {
    addLink: false,
    showData: {},
    data: this.props.linkData,
  };

  addLink = () => {
    this.setState({ addLink: true });
  };

  addLinkData = () => {
    const { dispatch, linkData } = this.props;
    const showText = document.getElementById('showText');
    const linkUrl = document.getElementById('linkUrl');
    if (!showText.value) {
      message.info('请填写显示文本');
      return;
    }
    if (!linkUrl.value) {
      message.info('请填写链接地址');
      return;
    }
    linkData.push({ showText: showText.value, linkUrl: linkUrl.value });
    dispatch({
      type: 'createMessageForm/changeLinkData',
      payload: linkData,
    });
    this.setState({ addLink: false, showData: {}, data: [...linkData] });
  };

  deleteLink = record => {
    const { dispatch, linkData } = this.props;
    if (linkData.length > 0) {
      linkData.forEach((item, index) => {
        if (item.showText === record.showText && record.linkUrl === item.linkUrl) {
          linkData.splice(index, 1);
        }
      });
    }
    dispatch({
      type: 'createMessageForm/changeLinkData',
      payload: linkData,
    });
    this.setState({data: [...linkData]})
  };

  updateText = event => {
    const { showData } = this.state;
    showData[event.target.id] = event.target.value;
    this.setState({ showData });
  };

  render() {
    const column = [
      {
        title: '显示文本',
        dataIndex: 'showText',
        key: 'showText',
      },
      {
        title: '链接地址',
        dataIndex: 'linkUrl',
        key: 'linkUrl',
      },
      {
        title: '操作',
        dataIndex: 'operator',
        key:"operator",
        render: (text, record) => <a onClick={this.deleteLink.bind(this, record)}>删除</a>,
      },
    ];

    const { showData, data } = this.state;
    return (
      <div>
        <TItem label="已添加链接地址" {...layout}>
          <Button onClick={this.addLink}>添加 </Button>
          <Table columns={column} dataSource={data} />
        </TItem>
        <Modal
          title="添加链接地址信息"
          visible={this.state.addLink}
          onOk={this.addLinkData}
          onCancel={() => this.setState({ addLink: false, showData: {} })}
        >
          <Form.Item label="显示文本" {...layout}>
            <Input id="showText" onChange={this.updateText} value={showData.showText} />
          </Form.Item>
          <Form.Item label="链接地址" {...layout}>
            <Input id="linkUrl" onChange={this.updateText} value={showData.linkUrl} />
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

export default LinkData;
