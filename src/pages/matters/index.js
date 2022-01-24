import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message, Dropdown, Menu } from 'antd';
import commonDownload from '@/services/commonDownload';
import {
  matterTagExcelUrl,
  matterTagImportlUrl,
  preMatterTemplateUrl,
  preMatterUrl,
} from '@/constants';
import TrackTool from '@/utils/TrackTool';
import { TButton, DataImport } from '@/components/tis_ui';
import authEnum, { Auth } from '@/utils/auth';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { Link } from 'umi';
import router from '@/utils/tRouter';
import { MATTER } from '@/services/api';
import MattersList from './MattersList';
import MattersQueryBar from './MattersQueryBar';
import styles from './matters.less';

@connect(({ matters, loading }) => ({
  ...matters,
  loading: loading.effects['matters/fetchList'],
}))
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
    const { query } = this.state;
    dispatch({
      type: 'matters/fetchList',
      params: { page, size },
      body: query,
    });
  };

  markExport = async () => {
    const onClose = message.loading('导出中', 0);
    await commonDownload({
      url: '/matter/markExport',
      name: '事项标注.xlsx',
    });
    onClose();
  };

  matterExport = async () => {
    const onClose = message.loading('导出中', 0);
    await commonDownload({
      url: '/matter/export',
      name: '事项.xlsx',
      condition: this.state.query,
      method: 'POST',
    });
    onClose();
  };

  preMatterExport = async () => {
    const onClose = message.loading('导出中...');
    await commonDownload({
      url: preMatterTemplateUrl,
      name: '前置事项导入模板.xlsx',
    });
    onClose();
  };

  // 下载模板
  downloadTemplate = async () => {
    message.loading('下载中');
    await commonDownload({ url: matterTagExcelUrl, name: '事项标签导入模板.xlsx' });
  };

  // 异步提交导出请求
  exportMatterWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      MATTER.asyncExportMatterUsingPOST({
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
    const { loading } = this.props;
    const { query: queryCondition } = this.state;
    return (
      <div>
        <MattersQueryBar
          initialValues={queryCondition}
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.matters_edit_alias}>
                <Link to={router.path('matters_new')}>
                  <TButton.Create>新增事项</TButton.Create>
                </Link>
              </Auth>
              <Auth auth={authEnum.matters_bluk}>
                <TButton.Edit
                  onClick={() => {
                    router.push({ name: 'matters_bulk', query: queryCondition });
                  }}
                >
                  批量操作
                </TButton.Edit>
              </Auth>
              <TButton.Output onClick={this.markExport}>标注导出</TButton.Output>
              <AsyncExportFile
                applyDerive={this.exportMatterWithQuery}
                type={asyncExportArguments.matter}
                btnText="事项导出"
              />
              <TButton.Download onClick={this.downloadTemplate}>模板下载</TButton.Download>
              <Auth auth={authEnum.matters_edit_alias}>
                <DataImport
                  btnText="Excel标签导入"
                  action={matterTagImportlUrl}
                  refresh={this.fetchPortraitLegal}
                />
              </Auth>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <TButton.Output onClick={this.preMatterExport}>
                        前置事项导入模板
                      </TButton.Output>
                    </Menu.Item>
                    <Menu.Item>
                      <DataImport
                        btnText="前置事项导入(覆盖)"
                        action={preMatterUrl}
                        refresh={this.fetchList}
                        data={{ type: 1 }}
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <DataImport
                        btnText="前置事项导入(追加)"
                        action={preMatterUrl}
                        refresh={this.fetchList}
                        data={{ type: 0 }}
                      />
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <TButton.Edit>批量处理前置事项</TButton.Edit>
              </Dropdown>
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
        <MattersList className={styles.mattersList} fetchList={this.fetchList} loading={loading} />
      </div>
    );
  }
}

export default Index;
