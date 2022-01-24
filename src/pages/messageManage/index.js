import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import MessageManageQueryBar from './MessageManageQueryBar';
import MessageManageList from './MessageManageList';
import styles from './messageManage.less';
import router from '@/utils/tRouter';
import TrackTool from '@/utils/TrackTool';

@connect(({ messageManage }) => messageManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchMessageManage({});
  }

  fetchMessageManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchMessageManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'messageManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    return (
      <div>
        <MessageManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <TButton.Create
                onClick={() =>
                  router.push({
                    name: `messageManage_create`,
                  })
                }
              >
                新增消息
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchMessageManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchMessageManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <MessageManageList
          className={styles.messageManageList}
          onPageSizeChange={this.fetchMessageManage}
        />
      </div>
    );
  }
}

export default Index;
