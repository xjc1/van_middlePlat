import React, { Component } from 'react';
import {
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
import moment from 'moment';
import styles from '../../synonyms/createOrEditQuestionForm/index.less';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@connect(({ subscription }) => subscription)
class ReviewModel extends Component {
  queryForm = React.createRef();

  componentDidMount() {}

  handleSave = () => {
    const { dispatch, id, info } = this.props;
    dispatch({
      type: 'subscription/reviewSubscription',
      payload: {
        id,
        review: info.review === 0 ? 1 : 0,
        status: info.status,
      },
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'subscription/resetReviewViewView',
      payload: { reviewView: false, id: null, info: {} },
    });
  };


  render() {
    const { info } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.queryForm = form;
        }}
        initialValues={{
          ...info,
          subscribeTime:
            info.subscribeTime && info.subscribeTime.startTime
              ? [
                  moment(new Date(info.subscribeTime.startTime), dateFormat),
                  moment(new Date(info.subscribeTime.endTime), dateFormat),
                ]
              : [],
        }}
        visible
        okText={info.review === 0 ? '通过' : '撤销'}
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
            <Input disabled />
          </TItem>
          <TItem name="subscribeTime" label="订阅时间">
            <RangePicker disabled showTime format={dateFormat} />
          </TItem>
          <TItem name="describe" label="订阅用途说明">
            <Input disabled />
          </TItem>
          <TItem name="department" label="订阅机构">
            <Input disabled />
          </TItem>

          <div className={styles.desc}>
            <strong>订阅信息</strong>
          </div>
          <Divider style={{ margin: '10px 0 10px' }} />
          <TItem name="key" label="key">
            <Input disabled />
          </TItem>
          <TItem name="callCommand" label="调用口令">
            <Input disabled />
          </TItem>
          <TItem name="password" label="调用密码">
            <Input disabled />
          </TItem>
          <TItem name="url" label="调用地址">
            <Input disabled />
          </TItem>
        </div>
      </ModalForm>
    );
  }
}

export default ReviewModel;
