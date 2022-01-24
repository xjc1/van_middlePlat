import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PolicyWordsQueryBar from './PolicyWordsQueryBar';
import { TButton, DataImport } from '@/components/tis_ui';
import PolicyWordsList from './PolicyWordsList';
import styles from './policyWords.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { POLICYWORDS } from '@/services/api';
import AddOrEdit from './addOrEditForm/PolicyWordsForm';
import authEnum, { Auth } from '@/utils/auth';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';

@connect(({ policyWords }) => policyWords)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyWords/cancel',
      payload: false,
    });
  }

  query = () => {
    const value = this.queryForm.getFieldsValue();
    this.setState({ query: value });
    this.fetchList(value);
  };

  fetchList = query => {
    const { dispatch, page, size } = this.props;
    dispatch({
      type: 'policyWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  addPolicyWords = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyWords/addPolicyWords',
      payload: true,
    });
  };

  resetForm = () => {
    this.queryForm.setFieldsValue({
      name: undefined,
      source: undefined,
      clientType: undefined,
    });
  };

  // 下载百科词条库
  download = async () => {
    const { query } = this.state;
    const onClose = message.loading('下载中');
    await commonDownload({
      url: '/policyWords/excel',
      name: '百科词条.xlsx',
      method: 'GET',
      condition: query,
    });
    onClose();
  };

  // 下载百科词条模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: '/policyWords/excelTemplate', name: '百科词条模板.xlsx' });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      POLICYWORDS.asyncExportPolicyWordsUsingPOST({
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
    const { isOpenModal } = this.props;
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.rightGrid}>
          <PolicyWordsQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            actions={
              <>
                <Auth auth={authEnum.policyWord_edit_alias}>
                  <TButton.Create onClick={this.addPolicyWords}>新增百科词条</TButton.Create>
                </Auth>
                <AsyncExportFile
                  applyDerive={this.exportListWithQuery}
                  type={asyncExportArguments.policyWords}
                  btnText="百科词条导出"
                  placement="bottom"
                />
                <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>
                <DataImport action="/policyWords/excel" refresh={() => this.fetchList({})} />
              </>
            }
            footer={
              <>
                <TButton.Search onClick={this.query}>查询</TButton.Search>

                <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
              </>
            }
          />

          <PolicyWordsList className={styles.policyWordsList} />
          {isOpenModal && <AddOrEdit />}
        </div>
      </div>
    );
  }
}

export default Index;
