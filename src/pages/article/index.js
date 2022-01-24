import React, { PureComponent } from 'react';
import router from '@/utils/tRouter';
import { connect } from 'dva';
import { message } from 'antd';
import { TButton, DataImport } from '@/components/tis_ui';
import commonDownload from '@/services/commonDownload';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import authEnum, { Auth } from '@/utils/auth';
import moment from 'moment';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { ARTICLE } from '@/services/api';
import { asyncExportArguments } from '@/utils/constantEnum';
import ArticleQueryBar from './ArticleQueryBar';
import ArticleList from './ArticleList';
import styles from './article.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ article }) => article)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'article/reset' });
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;

    dispatch({
      type: 'article/fetchList',
      payload: { page, size, query },
    });
  };

  query = () => {
    const query = this.queryForm.getFieldsValue();
    const { timeRange = [], ...others } = query || {};
    const [releaseStartTime, releaseEndTime] = timeRange;
    this.setState(
      {
        query: {
          ...others,
          releaseStartTime:
            releaseStartTime && releaseStartTime.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          releaseEndTime:
            releaseEndTime &&
            moment(releaseEndTime)
              .endOf('day')
              .format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      () => this.fetchList({}),
    );
  };

  resetForm = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/article/outputExcelTemplate', name: '模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportArticleWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      ARTICLE.asyncExportArticleUsingPOST({
        body: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    return (
      <div className={layoutStyles.twoGridPage}>
        <div className={layoutStyles.rightGrid}>
          <ArticleQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            initialValues={TrackTool.getQueryParamsCache()}
            actions={
              <>
                <Auth auth={authEnum.article_edit_alias}>
                  <TButton.Create
                    onClick={() => router.push('article_create')}
                  >
                    新增文章
                  </TButton.Create>
                </Auth>
                <Auth auth={authEnum.article_edit_alias}>
                  <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>
                </Auth>
                <Auth auth={authEnum.article_edit_alias}>
                  <DataImport action="/article/import" refresh={this.fetchList} />
                </Auth>

                <AsyncExportFile
                  applyDerive={this.exportArticleWithQuery}
                  type={asyncExportArguments.article}
                  placement="bottom"
                />
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.query();
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
              </>
            }
          />
          <ArticleList className={styles.articleList} query={this.state.query} />
        </div>
      </div>
    );
  }
}

export default Index;
