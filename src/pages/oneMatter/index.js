import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { Link } from 'umi';
import OneMatterQueryBar from './OneMatterQueryBar';
import OneMatterList from './OneMatterList';
import styles from './oneMatter.less';
import EditOneMatter from './editOneMatter';
import authEnum, { Auth } from '@/utils/auth';
import TrackTool from '@/utils/TrackTool';
import router from "@/utils/tRouter";

@connect(({ oneMatter, loading }) => ({
  ...oneMatter,
  loading: loading.effects['oneMatter/fetchList'],
}))
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    edit: false,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'oneMatter/fetchList',
      params: { page, size },
      body: query,
    });
  };

  render() {
    const { loading } = this.props;
    const { edit } = this.state;

    return (
      <div>
        <OneMatterQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.oneMatter_edit_alias}>
                <Link to={router.path('oneMatter_create')}>
                  <TButton.Create onClick={() => this.setState({ edit: true })}>
                    新增联办事项
                  </TButton.Create>
                </Link>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.setState({ query }, () => this.fetchList({}));
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchList({}));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        <OneMatterList
          className={styles.oneMatterList}
          fetchList={this.fetchList}
          loading={loading}
        />

        {edit && (
          <EditOneMatter
            fetchList={this.fetchList}
            complete={() => {
              this.setState({ edit: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
