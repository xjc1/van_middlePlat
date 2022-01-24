import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DataImport, TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import { message } from 'antd';
import PolicyExplainQueryBar from './PolicyExplainQueryBar';
import PolicyExplainList from './PolicyExplainList';
import styles from './policyExplain.less';
import commonDownload from '@/services/commonDownload';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { POLICYINTERPRETATIONS } from '@/services/api';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ policyExplain }) => policyExplain)
class Index extends PureComponent {
  queryForm = null;

  componentDidMount() {
    this.fetchPolicyExplainWithQuery({});
  }

  fetchPolicyExplainWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    const { status } = query;

    dispatch({
      type: 'policyExplain/saveParams',
      payload: query,
    });
    dispatch({
      type: 'policyExplain/fetch',
      payload: { page, size, ...query, status: status === 'all' ? undefined : status },
    });
  };

  // 下载模板
  downloadEmpty = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({
      url: '/policyInterpretations/importTemplate',
      name: '政策解读导入模板.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportPolicyExplainWithQuery = () => {
    const { params } = this.props;
    return new Promise((resolve, reject) => {
      POLICYINTERPRETATIONS.exportMatterHandleGuideAsyncUsingGET({
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
        <PolicyExplainQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.policyExplain_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('policyExplain_create');
                  }}
                >
                  新增解读
                </TButton.Create>
              </Auth>

              <TButton.Download onClick={this.downloadEmpty}>模板下载</TButton.Download>

              <DataImport
                action="/policyInterpretations/import"
                refresh={() => this.fetchPolicyExplainWithQuery({ query: this.props.query })}
              />

              <AsyncExportFile
                applyDerive={this.exportPolicyExplainWithQuery}
                type={asyncExportArguments.policyExplain}
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchPolicyExplainWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchPolicyExplainWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <PolicyExplainList
          className={styles.policyExplainList}
          onPageSizeChange={this.fetchPolicyExplainWithQuery}
        />
      </div>
    );
  }
}

export default Index;
