import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DataImport, TButton } from '@/components/tis_ui';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments, pageStatus } from '@/utils/constantEnum';
import { WORDS } from '@/services/api';

import FunctionWordQueryBar from './FunctionWordQueryBar';
import FunctionWordList from './FunctionWordList';
import styles from './functionWord.less';
import FunctionWordForm from './functionWordForm';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ functionWord }) => functionWord)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    data: null,
    modalType: null,
  };

  componentDidMount() {
    this.fetchFunctionWord({});
  }

  fetchFunctionWordWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'functionWord/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchFunctionWord = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'functionWord/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  // 下载功能词
  download = async () => {
    const { query } = this.state;
    const onClose = message.loading('下载中');
    await commonDownload({
      url: '/words/export',
      name: '功能词.xlsx',
      condition: query,
    });
    onClose();
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/words/template', name: '模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      WORDS.asyncExportTagStoreUsingPOST({
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
    const { data, modalType } = this.state;
    return (
      <div>
        <FunctionWordQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.functionWords_edit_alias}>
                <TButton.Create onClick={() => this.setState({ data: {} })}>
                  新增功能词
                </TButton.Create>
              </Auth>
              <AsyncExportFile
                applyDerive={this.exportListWithQuery}
                type={asyncExportArguments.functionWord}
                btnText="功能词导出"
                placement="bottom"
              />
              <Auth auth={authEnum.functionWords_edit_alias}>
                <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>
              </Auth>
              <Auth auth={authEnum.functionWords_edit_alias}>
                <DataImport action="/words/import" refresh={this.fetchFunctionWord} />
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchFunctionWordWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchFunctionWordWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <FunctionWordList
          className={styles.functionWordList}
          onPageSizeChange={this.fetchFunctionWord}
          changeData={(value, type) => this.setState({ data: value, modalType: type })}
        />
        {data && (
          <FunctionWordForm
            onCancel={() => this.setState({ data: null, modalType: null })}
            data={data}
            isCheck={modalType === pageStatus.view}
          />
        )}
      </div>
    );
  }
}

export default Index;
