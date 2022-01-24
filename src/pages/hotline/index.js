import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DataImport, TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import HotlineQueryBar from './HotlineQueryBar';
import HotlineList from './HotlineList';
import styles from './hotline.less';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import { HOTLINES } from '@/services/api';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ hotline }) => hotline)
class Index extends PureComponent {
  queryForm = null;

  componentDidMount() {
    this.fetchHotlineWithQuery({});
  }

  fetchHotlineWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    const { status } = query;

    dispatch({
      type: 'hotline/saveParams',
      payload: query,
    });
    dispatch({
      type: 'hotline/fetch',
      payload: { page, size, ...query, status: status === 'all' ? undefined : status },
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/hotlines/importTemplate', name: '热线电话导入模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportHotlineWithQuery = () => {
    const { params } = this.props;
    return new Promise((resolve, reject) => {
      HOTLINES.exportMatterHandleGuideAsyncUsingGET({
        params,
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
      <div>
        <HotlineQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.hotline_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('hotline_create');
                  }}
                >
                  新增热线电话
                </TButton.Create>
              </Auth>
              <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>

              <DataImport
                action="/hotlines/import"
                refresh={() => this.fetchHotlineWithQuery({ query: this.props.query })}
              />

              <AsyncExportFile
                applyDerive={this.exportHotlineWithQuery}
                type={asyncExportArguments.hotline}
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.log(query);
                    this.fetchHotlineWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchHotlineWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <HotlineList
          className={styles.policyExplainList}
          onPageSizeChange={this.fetchHotlineWithQuery}
        />
      </div>
    );
  }
}

export default Index;
