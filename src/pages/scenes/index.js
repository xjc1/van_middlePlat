import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import ScenesQueryBar from './ScenesQueryBar';
import { TButton } from '@/components/tis_ui';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { SCENE } from '@/services/api';

import ScenesList from './ScenesList';
import styles from './scenes.less';
import authEnum, { Auth } from '@/utils/auth';
import TrackTool from '@/utils/TrackTool';
import { adaptText } from "@/utils/AdaptiveHelper";

@connect(({ scenes, loading }) => ({
  ...scenes,
  loading: loading.effects['scenes/fetchList'],
}))
class Index extends PureComponent {
  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  queryForm = null;

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query } = this.state;

    dispatch({
      type: 'scenes/fetchList',
      params: { page, size },
      body: query,
    });
  };

  createScene = () => {
    router.push('sceneinfo');
  };

  handleSearch = () => {
    this.queryForm.validateFields().then(vals => {
      this.setState({ query: vals }, () => this.fetchList({}));
    });
  };

  handleReset = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  markExport = async () => {
    const onClose = message.loading('导出中');
    await commonDownload({
      url: '/scene/markExport',
      name: '主题标注.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportSceneWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      SCENE.asyncExportMatterUsingPOST({
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
    const { query: seacrhCondition } = this.state;

    return (
      <>
        <ScenesQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.scenes_edit_alias}>
                <TButton.Create type="primary" ghost={false} onClick={this.createScene}>
                  {adaptText('主题创建')}
                </TButton.Create>
              </Auth>

              <Auth auth={authEnum.scenes_bluk}>
                <TButton.Edit
                  onClick={() =>
                    router.push({ name: 'scenes_bulk', query: seacrhCondition })
                  }
                >
                  批量操作
                </TButton.Edit>
              </Auth>
              <TButton.Output onClick={this.markExport}>主题标注导出</TButton.Output>
              <AsyncExportFile
                applyDerive={this.exportSceneWithQuery}
                type={asyncExportArguments.scene}
                btnText="主题导出"
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search ghost={false} onClick={this.handleSearch}>
                查询
              </TButton.Search>
              <TButton.Reset onClick={this.handleReset}>重置</TButton.Reset>
            </>
          }
        />
        <ScenesList className={styles.scenesList} loading={loading} fetchList={this.fetchList} />
      </>
    );
  }
}

export default Index;
