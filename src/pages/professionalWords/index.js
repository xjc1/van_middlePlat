import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, DataImport } from '@/components/tis_ui';
import { message } from 'antd';
import {
  professionalWordsExportUrl,
  professionalWordsImport,
  professionalWordsTemplateUrl,
} from '@/constants';
import commonDownload from '@/services/commonDownload';
import router from '@/utils/tRouter';
import ProfessionalWordsQueryBar from './ProfessionalWordsQueryBar';
import ProfessionalWordsList from './ProfessionalWordsList';
import styles from './professionalWords.less';

@connect(({ professionalWords }) => professionalWords)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
  };

  componentDidMount() {
    this.fetchProfessionalWords({});
  }

  fetchProfessionalWordsWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'professionalWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchProfessionalWords = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'professionalWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  // 下载模板
  downloadTemplate = async () => {
    const close = message.loading('下载中', 0);
    await commonDownload({ url: professionalWordsTemplateUrl, name: '专业词导入模板.xlsx' });
    close();
  };

  // 导出
  export = async () => {
    const close = message.loading('下载中', 0);
    await commonDownload({
      url: professionalWordsExportUrl,
      name: '专业词.xlsx',
      condition: this.state.query,
    });
    close();
  };

  render() {
    return (
      <div>
        <ProfessionalWordsQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  router.push('professionalWords_create');
                }}
              >
                新增专业词
              </TButton.Create>
              <TButton.Output onClick={this.export}>专业词导出</TButton.Output>
              <TButton.Download onClick={this.downloadTemplate}>模板下载</TButton.Download>
              <DataImport
                btnText="导入专业词"
                action={professionalWordsImport}
                refresh={this.fetchProfessionalWords}
                data={{ type: 0 }}
              />
              <TButton.Edit
                onClick={() => {
                  router.push('professionalWords_bulk');
                }}
              >
                批量操作
              </TButton.Edit>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchProfessionalWordsWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchProfessionalWordsWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ProfessionalWordsList
          className={styles.professionalWordsList}
          onPageSizeChange={this.fetchProfessionalWords}
        />
      </div>
    );
  }
}

export default Index;
