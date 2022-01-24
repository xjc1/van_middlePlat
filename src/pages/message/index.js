import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import authEnum, { Auth } from '@/utils/auth';
import MessageQueryBar from './MessageQueryBar';
import { TButton } from '@/components/tis_ui';
import MessageList from './MessageList';
import CreateMessageForm from '@/pages/message/handleMessageForm';
import styles from './message.less';
import router from '@/utils/tRouter';

@connect(({ message, createMessageForm, loading }) => ({
  ...message,
  editVisible: createMessageForm.editVisible,
  loading: loading.effects['message/fetchList'],
}))
class Index extends PureComponent {
  queryForm = null;

  queryMessage = () => {
    const { dispatch } = this.props;
    const value = this.queryForm.getFieldsValue();
    this.fetchMessages({ page: 0, size: 10, data: value });
    dispatch({
      type: 'message/saveParams',
      payload: value,
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'createMessageForm/resetVisible', payload: false });
  };

  fetchMessages({ page = 0, size = 10, data = {} }) {
    const { dispatch } = this.props;
    dispatch({
      type: 'message/fetchList',
      payload: {
        page,
        size,
      },
      data,
    });
  }

  resetForm = () => {
    this.queryForm.setFieldsValue({
      clientType: undefined,
      status: undefined,
      title: undefined,
      contentType: undefined,
      publishStatus: undefined,
      messageType: undefined,
      userType: undefined,
      range: undefined,
    });
    this.fetchMessages({});
  };

  render() {
    const { editVisible } = this.props;
    return (
      <div>
        {!editVisible ? (
          <Fragment>
            <MessageQueryBar
              onForm={form => {
                this.queryForm = form;
              }}
              actions={
                <>
                  <Auth auth={authEnum.message_edit_alias}>
                    <TButton.Create
                      onClick={() =>
                        router.push({
                          name: 'message_create',
                        })
                      }
                    >
                      新增消息
                    </TButton.Create>
                  </Auth>
                </>
              }
              footer={
                <>
                  <TButton.Search onClick={this.queryMessage}>查询</TButton.Search>

                  <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
                </>
              }
            />
            <MessageList className={styles.messageList} />
          </Fragment>
        ) : (
          <CreateMessageForm />
        )}
      </div>
    );
  }
}

export default Index;
