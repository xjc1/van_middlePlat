import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { STANDARDMATERIALS } from '@/services/api';
import { asyncExportArguments } from '@/utils/constantEnum';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { message } from 'antd';
import { TButton, DataImport } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import StandardMaterialQueryBar from './StandardMaterialQueryBar';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import StandardMaterialList from './StandardMaterialList';
import commonDownload from '@/services/commonDownload';
import CategoryList from './categoryList';
import styles from './standardMaterial.less';
import TrackTool from '@/utils/TrackTool';
import authEnum, { Auth } from '@/utils/auth';

@connect(({ standardMaterial }) => standardMaterial)
class Index extends PureComponent {
  queryForm = null;

  state = {
    selectedID: null,
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchStandardCategories();
    this.fetchStandardMaterial({});
  }

  fetchStandardMaterialWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'standardMaterial/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchStandardCategories = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'standardMaterial/fetchDepartmentNum',
    });
  };

  fetchStandardMaterial = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'standardMaterial/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  // 下载模板
  downloadTemplate = async () => {
    const onClose = message.loading('下载中', 0);
    await commonDownload({
      url: '/standardMaterials/export',
      name: '材料导入模板.xlsx',
    });
    onClose();
  };

  // 异步提交导出请求
  exportListWithQuery = () => {
    const { query } = this.state;
    return STANDARDMATERIALS.asyncExportStandardMaterialUsingPOST({
      body: query,
    });
  };

  render() {
    const { categories = [] } = this.props;
    const { selectedID } = this.state;
    return (
      <div className={layoutStyles.twoGridPage}>
        <div className={layoutStyles.leftGrid} style={{ width: 250 }}>
          <CategoryList
            items={categories}
            selectedID={selectedID}
            onSelected={({ id }) =>
              this.setState(
                {
                  selectedID: id,
                  query: {
                    issuingDepartment: id,
                  },
                },
                () => {
                  this.queryForm.setFieldsValue({ ...this.state.query });
                  this.fetchStandardMaterial({});
                },
              )
            }
          />
        </div>
        <div className={layoutStyles.rightGrid}>
          <StandardMaterialQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            initialValues={TrackTool.getQueryParamsCache()}
            actions={
              <>
                <Auth auth={authEnum.standardMaterial_edit_alias}>
                  <TButton.Create
                    onClick={() => {
                      router.push({ name: 'standardMaterial_new' });
                    }}
                  >
                    新增材料
                  </TButton.Create>
                </Auth>
                <Auth auth={authEnum.standardMaterial_edit_alias}>
                  <DataImport
                    btnText="导入材料"
                    action="/standardMaterials/import"
                    refresh={this.fetchStandardMaterial}
                    type="link"
                    ghost={false}
                    icon={null}
                  />
                </Auth>
                <Auth auth={authEnum.standardMaterial_edit_alias}>
                  <TButton.Download onClick={this.downloadTemplate}>模板下载</TButton.Download>
                </Auth>

                <AsyncExportFile
                  applyDerive={this.exportListWithQuery}
                  type={asyncExportArguments.standardMaterial}
                  btnText="材料导出"
                  placement="bottom"
                />
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(query => {
                      this.fetchStandardMaterialWithQuery({ query });
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={() => {
                    // 重置数据
                    this.queryForm.resetFields();
                    this.setState({ selectedID: null });
                    this.fetchStandardMaterialWithQuery({});
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />

          <StandardMaterialList
            className={styles.standardMaterialList}
            fetchList={this.fetchStandardMaterial}
          />
        </div>
      </div>
    );
  }
}

export default Index;
