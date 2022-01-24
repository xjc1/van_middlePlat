import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import ScenesAuditQueryBar from './ScenesAuditQueryBar';
import ScenesAuditList from './ScenesAuditList';
import styles from './scenesAudit.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ scenesAudit }) => scenesAudit)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'scenesAudit/fetchList',
      params: {
        page,
        size,
      },
      body: query,
    });
  };

  render() {
    return (
      <div>
        <ScenesAuditQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
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

        <ScenesAuditList className={styles.scenesAuditList} fetchList={this.fetchList} />
      </div>
    );
  }
}

export default Index;
