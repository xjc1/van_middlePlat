import React, { Component, Fragment } from 'react';
import {
  TForm,
  TItem,
  Layout,
  StandardOptions,
  TButton,
  TCheckbox,
  TRadio,
  ModalForm,
} from '@/components/tis_ui';
import { Input, DatePicker, Divider } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import moment from 'moment';
import styles from '../../synonyms/createOrEditQuestionForm/index.less';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD hh:mm:ss';
const { TextArea } = Input;

@connect(({ commonModel }) => commonModel)
class SubscribeModel extends Component {
  state = {
    subscribeTime: {},
  };
  createForm = React.createRef();

  componentDidMount() {}

  handleSave = () => {
    const { dispatch, modelId } = this.props;
    const { subscribeTime } = this.state;
    this.createForm.current.validateFields().then(vals => {
      if (subscribeTime.startTime) {
        vals.subscribeTime = subscribeTime;
      }
      vals.modelId = modelId;
      dispatch({
        type: 'commonModel/addSubscribe',
        payload: vals,
      });
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetSubscribeView',
      payload: { subscribeView: false, modelId: null },
    });
  };

  changeRangeTime = (data, dateString) => {
    this.setState({ subscribeTime: { startTime: dateString[0], endTime: dateString[1] } });
  };

  render() {
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible={true}
        okText="申请"
        title="模型简介"
        maskClosable={false}
        cancelText="取消"
        onOk={this.handleSave}
        handleCancel={this.handleCancel}
      >
        <div>
          <div className={styles.desc}>
            <strong>订阅信息</strong>
          </div>
          <Divider style={{ margin: '10px 0 10px' }} />
          <TItem name="address" label="白名单地址">
            <Input />
          </TItem>
          <TItem name="subscribeTime" label="订阅时间">
            <RangePicker showTime format={dateFormat} onChange={this.changeRangeTime} />
          </TItem>
          <TItem name="describe" label="订阅用途说明">
            <Input />
          </TItem>
          <TItem name="department" label="订阅机构">
            <Input />
          </TItem>
          <div className={styles.desc}>
            <strong>订阅信息</strong>
          </div>
          <Divider style={{ margin: '10px 0 10px' }} />
          <TItem name="key" label="key">
            <Input />
          </TItem>
          <TItem name="callCommand" label="调用口令">
            <Input />
          </TItem>
          <TItem name="password" label="调用密码">
            <Input />
          </TItem>
          <TItem name="url" label="调用地址">
            <Input />
          </TItem>
        </div>
      </ModalForm>
    );
  }
}

export default SubscribeModel;
