import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import EmoticonManageQueryBar from './EmoticonManageQueryBar';
import EmoticonManageList from './EmoticonManageList';
import EditEmoticon from './editEmoticon';
import styles from './emoticonManage.less';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ emoticonManage }) => emoticonManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    isShowCreateForm: false,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;
    dispatch({
      type: 'emoticonManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    const { isShowCreateForm, query } = this.state;

    return (
      <div>
        <EmoticonManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.emoticon_edit_alias}>
                <TButton.Create onClick={() => this.setState({ isShowCreateForm: true })}>
                  新增表情
                </TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(nextQuery => {
                    this.setState({ query: { ...query, ...nextQuery } }, () => this.fetchList({}));
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchList({ page: 0, size: 10 }));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <EmoticonManageList
          className={styles.emoticonManageList}
          fetchList={this.fetchList}
          sort={query.sort}
          changeSort={sort => {
            this.setState({ query: { ...query, sort } }, () => this.fetchList({}));
          }}
        />

        {isShowCreateForm && (
          <EditEmoticon
            title="新增表情"
            handleClose={() => {
              this.setState({ isShowCreateForm: false }, () => {
                this.fetchList({});
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
