import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import TrackTool from '@/utils/TrackTool';
import router from '@/utils/tRouter';
import WarningManageQueryBar from './WarningManageQueryBar';
import WarningManageList from './WarningManageList';
import styles from './warningManage.less';

@connect(({ warningManage }) => warningManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchWarningManage({});
  }

  fetchWarningManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'warningManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchWarningManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'warningManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    return (
      <div>
        <WarningManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <TButton.Create
                onClick={() =>
                  router.push({
                    name: 'warningManage_create',
                  })
                }
              >
                新增提醒
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.info(query);
                    this.fetchWarningManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchWarningManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <WarningManageList
          className={styles.warningManageList}
          onPageSizeChange={this.fetchWarningManage}
        />
      </div>
    );
  }
}

export default Index;
