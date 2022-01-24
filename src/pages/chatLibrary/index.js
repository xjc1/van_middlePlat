import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, DataImport } from '@/components/tis_ui';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { CHAT } from '@/services/api';

import layoutSytles from '@/layouts/PageLayout/layout.less';
import router from '@/utils/tRouter';
import commonDownload from '@/services/commonDownload';
import authEnum, { Auth } from '@/utils/auth';
import { message } from 'antd';
import ChatLibraryQueryBar from './ChatLibraryQueryBar';
import ChatLibraryList from './ChatLibraryList';
import styles from './chatLibrary.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ chatLibrary }) => ({ chatLibrary }))
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;

    dispatch({
      type: 'chatLibrary/fetchList',
      payload: { page, size, query },
    });
  };

  changePage = (page, size) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;
    dispatch({
      type: 'chatLibrary/fetchList',
      payload: { page, size, query },
    });
  };

  query = () => {
    const query = this.queryForm.getFieldsValue();
    this.setState({ query }, () => this.fetchList({}));
  };

  resetForm = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/chat/exportTemplate', name: '模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      CHAT.asyncExportChatLibraryUsingPOST({
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
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.rightGrid}>
          <ChatLibraryQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            initialValues={TrackTool.getQueryParamsCache()}
            actions={
              <>
                <Auth auth={authEnum.chatLibrary_edit_alias}>
                  <TButton.Create
                    onClick={() => {
                      router.push({
                        name: 'chatLibrary_add',
                      });
                    }}
                  >
                    新增聊天库
                  </TButton.Create>
                </Auth>
                <AsyncExportFile
                  applyDerive={this.exportListWithQuery}
                  type={asyncExportArguments.chatLibrary}
                  btnText="聊天库导出"
                  placement="bottom"
                />
                <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>
                <DataImport action="/chat/import" refresh={this.fetchList} />
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

          <ChatLibraryList
            className={styles.chatLibraryList}
            onPageSizeChange={({ page, size }) => this.changePage(page, size)}
          />
        </div>
      </div>
    );
  }
}

export default Index;
