import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import OutputModuleQueryBar from './OutputModuleQueryBar';
import OutputModuleList from './OutputModuleList';
import styles from './outputModule.less';
import OutputModuleForm from './outputModuleForm';
import router from '@/utils/tRouter';
import authEnum, { Auth } from '@/utils/auth';
import TrackTool from '@/utils/TrackTool';

@connect(({ outputModule }) => outputModule)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    formData: null,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query } = this.state;
    dispatch({
      type: 'outputModule/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    const { formData } = this.state;

    return (
      <div>
        <OutputModuleQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.outputModule_edit_alias}>
                <TButton.Create
                  onClick={() => router.replace('outputModule_add')}
                >
                  新增模块
                </TButton.Create>
              </Auth>
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
        <OutputModuleList className={styles.outputModuleList} fetchList={this.fetchList} />
        {formData && (
          <OutputModuleForm
            initialValues={formData}
            close={() => {
              this.setState({ formData: null });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
