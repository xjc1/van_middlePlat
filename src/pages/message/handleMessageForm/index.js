import { Card, Button, Form, Row } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { confirmAble, TItem } from '@/components/tis_ui';
import _ from 'lodash';
import moment from 'moment';
import router from '@/utils/tRouter';
import BasicInfoSettings from './BasicInfoSettings';
import ReceiveRangeSettings from './ReceivingRange';
import MessageContentSettings from './MessageContentSettings';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@connect(({ createMessageForm, message }) => ({
  ...message,
  ...createMessageForm,
  ...createMessageForm.step,
}))
class HandleMessageForm extends PureComponent {
  createForm = React.createRef();

  back2list = confirmAble({
    confirmText: '警告',
    confirmContent: '现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到消息列表吗?',
    onClick: () => {
      router.replace('message');
    },
  });

  back = () => {
    router.replace('message');
  };

  handleData = data => {
    const result = [];
    if (data && data.length > 0) {
      data.forEach(item => {
        result.push({ id: item.key });
      });
    }
    return result;
  };

  // base64编码
  static base64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  onValidateForm = value => {
    const { formData, linkData, copy, dispatch } = this.props;
    const messageContent = {
      content: value.content === undefined ? '' : value.content,
      richContent:
        formData.richContent === undefined ? '' : HandleMessageForm.base64(formData.richContent),
      scenes: this.handleData(value.scenes),
      matters: this.handleData(value.matters),
      policy: this.handleData(value.policy),
      services: this.handleData(value.services),
      qa: this.handleData(value.qa),
      articles: this.handleData(value.articles),
      customLinks: linkData,
    };
    // eslint-disable-next-line no-param-reassign
    value.personalLabels = (value.personalLabels || []).map(({ key }) => key).join(',');
    // eslint-disable-next-line no-param-reassign
    value.legalLabels = (value.legalLabels || []).map(({ key }) => key).join(',');
    const step3 = {
      title: value.title,
      messageContent: JSON.stringify(messageContent),
      id: copy ? null : formData.id,
      status: formData.status === undefined ? 0 : formData.status,
    };
    const body = _.assign(
      value,
      {
        regions: _.isArray(value.regions) ? value.regions.join(',') : '',
        clientType: _.isArray(value.clientType) ? value.clientType.join(',') : '',
        startTime: formData.startTime,
        endTime: formData.endTime,
        contentLists: formData.contentLists,
      },
      step3,
    );
    if (dispatch) {
      dispatch({
        type: 'message/submitStepForm',
        payload: body,
      });
      dispatch({ type: 'createMessageForm/resetVisible', payload: false });
    }
    router.replace('message');
  };

  changeTitle = () => {
    const { check, copy, edit } = this.props;
    if (check) {
      return <span>查看消息</span>;
    }
    if (copy) {
      return <span>复制消息</span>;
    }
    if (edit) {
      return <span>编辑消息</span>;
    }
    return <span>创建消息</span>;
  };

  render() {
    const { formData, check } = this.props;
    return (
      <div>
        <Card
          bordered
          title={
            <span>
              <span>消息列表</span> /{this.changeTitle()}
              <a style={{ float: 'right' }} onClick={check ? this.back : this.back2list}>
                返回消息列表
              </a>
            </span>
          }
        >
          <Form
            ref={this.createForm}
            onFinish={this.onValidateForm}
            initialValues={{
              ...formData,
              source: formData.source ? formData.source : '运营中台',
              ...formData.messageContent,
              rangeTime: formData.startTime
                ? [moment(formData.startTime, dateFormat), moment(formData.endTime, dateFormat)]
                : [],
            }}
          >
            <BasicInfoSettings />
            <ReceiveRangeSettings formRef={this.createForm} />
            <MessageContentSettings />
            <Row>
              <TItem labelCol={{ span: 0 }} style={{ textAlign: 'center' }}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ display: check ? 'none' : '' }}
                >
                  提交
                </Button>
                <Button
                  size="large"
                  onClick={this.back2list}
                  style={{ marginLeft: 8, display: check ? 'none' : '' }}
                >
                  关闭
                </Button>
              </TItem>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default HandleMessageForm;
