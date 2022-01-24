import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import authEnum, { Auth } from '@/utils/auth';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { asyncExportArguments } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import { TButton, DataImport } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import { synonymsImportUrl, synonymsTemplateUrl } from '@/constants';
import SynonymsQuerybar from './SynonymsQueryBar';
import SynonymsList from './SynonymsList';
import CreateQuestionForm from './createOrEditQuestionForm';
import styles from './synonyms.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ synonyms, createQuestionForm }) => ({
  ...synonyms,
  editVisible: createQuestionForm.editVisible,
}))
class Index extends PureComponent {
  queryForm = null;

  componentDidMount = () => {
    this.getSynonym();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'createQuestionForm/resetVisible', payload: false });
  };

  // 获取问答列表
  getSynonym = () => {
    const { dispatch, params, page, size } = this.props;
    dispatch({
      type: 'synonyms/fetch',
      payload: { page, size },
      data: params,
    });
  };

  querySynonym = () => {
    const { dispatch } = this.props;
    const params = this.queryForm.getFieldsValue();
    dispatch({
      type: 'synonyms/saveParams',
      payload: params,
    });
    dispatch({
      type: 'synonyms/fetch',
      payload: { page: 0, size: 10 },
      data: params,
    });
  };

  resetForm = () => {
    this.queryForm.setFieldsValue({
      clientType: undefined,
      question: undefined,
      matterName: undefined,
      status: undefined,
      regions: undefined,
      department: undefined,
      sourceType: undefined,
      source: undefined,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'synonyms/fetch',
      payload: { page: 0, size: 10 },
      data: {},
    });
  };

  markExport = async () => {
    const onClose = message.loading('导出中', 0);
    await commonDownload({
      url: '/kernel/markExport',
      name: '问答标注.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    return new Promise((resolve, reject) => {
      KERNEL.asyncExportSynonymUsingPOST({
        body: this.queryForm.getFieldsValue(),
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // 下载模板
  downloadTemplate = async () => {
    const onClose = message.loading('下载中', 0);
    await commonDownload({ url: synonymsTemplateUrl, name: '问答导入模板.xlsx' });
    onClose();
  };

  render() {
    const { editVisible } = this.props;
    return (
      <div>
        {!editVisible ? (
          <Fragment>
            <SynonymsQuerybar
              onForm={form => {
                this.queryForm = form;
              }}
              initialValues={TrackTool.getQueryParamsCache()}
              actions={
                <>
                  <Auth auth={authEnum.synonyms_edit_alias}>
                    <TButton.Create
                      onClick={() => {
                        router.push({
                          name: 'synonyms_create',
                        });
                      }}
                    >
                      新增问答
                    </TButton.Create>
                  </Auth>
                  <TButton.Download onClick={this.downloadTemplate}>模板下载</TButton.Download>
                  <DataImport
                    btnText="导入问答"
                    action={synonymsImportUrl}
                    refresh={this.getSynonym}
                    type="link"
                    ghost={false}
                    icon={null}
                  />
                  <AsyncExportFile
                    applyDerive={this.exportListWithQuery}
                    type={asyncExportArguments.synonym}
                    btnText="问答导出"
                    placement="bottom"
                  />
                  <TButton.Output onClick={this.markExport}>问答标注导出</TButton.Output>
                </>
              }
              footer={
                <>
                  <TButton.Search onClick={this.querySynonym}>查询</TButton.Search>

                  <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
                </>
              }
            />
            <SynonymsList className={styles.synonymsList} />
          </Fragment>
        ) : (
          <CreateQuestionForm />
        )}
      </div>
    );
  }
}

export default Index;
