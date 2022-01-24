import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import InfoLibraryQueryBar from './InfoLibraryQueryBar';
import InfoLibraryList from './InfoLibraryList';
import styles from './infoLibrary.less';

@connect(({ infoLibrary, loading }) => ({
  ...infoLibrary,
  loading: loading.effects['infoLibrary/fetchList'],
}))
class Index extends PureComponent {
  queryForm = null;

  state = {};

  componentDidMount() {
    this.fetchInfoLibrary({});
  }

  fetchInfoLibrary = ({ page = 0, pageSize = 10, condition }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infoLibrary/fetchList',
      payload: {
        page,
        size: pageSize,
      },
      condition,
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <InfoLibraryQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => router.push('infoLibrary_createInfo')}
              >
                新增
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchInfoLibrary({ page: 0, size: 10, condition: query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchInfoLibrary({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <InfoLibraryList
          loading={loading}
          className={styles.infoLibraryList}
          onPageSizeChange={this.fetchInfoLibrary}
        />
      </div>
    );
  }
}

export default Index;
