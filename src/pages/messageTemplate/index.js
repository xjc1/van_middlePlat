import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import MessageTemplateQueryBar from './MessageTemplateQueryBar';
import MessageTemplateList from './MessageTemplateList';
import styles from './messageTemplate.less';
import TrackTool from '@/utils/TrackTool';
import { MESSAGEMODULES } from '@/services/api';
import { notification } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';

@connect(({ messageTemplate }) => messageTemplate)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  constructor() {
    super();
    this.fetchMessageTemplate = this.fetchMessageTemplate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount() {
    this.fetchMessageTemplate({});
  }

  fetchMessageTemplateWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageTemplate/fetchList',
      payload: {
        page,
        size,
        query: { ...query },
      },
    });
    this.setState({ query });
  };

  fetchMessageTemplate({ page = 0, size = 10 }) {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'messageTemplate/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  }

  async handleDelete(id) {
    await MESSAGEMODULES.deleteMessageModuleUsingPOST(id);
    notification.success({
      message: '删除成功',
    });
    const { pageSize, pageNum } = this.props;
    this.fetchMessageTemplate({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  }

  async changeStatus({ id, status = policyUpDownStatus.down }) {
    // eslint-disable-next-line default-case
    switch (status) {
      case policyUpDownStatus.down:
        await MESSAGEMODULES.publishMessageModuleUsingPOST(id);
        break;
      case policyUpDownStatus.up:
        await MESSAGEMODULES.withdrawMessageModuleUsingPOST(id);
        break;
    }
    notification.success({
      message: '操作成功',
    });
    const { pageSize, pageNum } = this.props;
    this.fetchMessageTemplate({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  }

  render() {
    return (
      <div>
        <MessageTemplateQueryBar
          initialValues={TrackTool.getQueryParamsCache()}
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  router.push({
                    name: 'messageTemplate_create',
                  });
                }}
              >
                新增模版
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchMessageTemplateWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchMessageTemplateWithQuery({ page: 0, size: 10, query: {} });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <MessageTemplateList
          className={styles.messageTemplateList}
          onPageSizeChange={this.fetchMessageTemplate}
          handleDelete={this.handleDelete}
          changeStatus={this.changeStatus}
        />
      </div>
    );
  }
}

export default Index;
