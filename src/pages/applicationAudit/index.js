import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ApplicationAuditQueryBar from '@/pages/applicationAudit/ApplicationAuditQueryBar';
import { TButton } from '@/components/tis_ui';
import ApplicationAuditList from '@/pages/applicationAudit/ApplicationAuditList';
import styles from './applicationAudit.less';

@connect(({ applicationAudit }) => applicationAudit)
class Index extends PureComponent {
  state = {
    query: {},
  }

  queryForm = null;

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query } = this.state;

    dispatch({
      type: 'applicationAudit/fetchList',
      payload: { page, size, ...query },
    });
  }

  query = () => {
    const params = this.queryForm.getFieldsValue();
    this.setState({ query: params }, () => this.fetchList({}));
  };

  reset = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  render() {
    return (
      <div>
        <ApplicationAuditQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search onClick={this.query}>
                查询
              </TButton.Search>
              <TButton.Reset onClick={this.reset}>
                重置
              </TButton.Reset>
            </>
          }
        />

        <ApplicationAuditList className={styles.applicationAuditList} fetchList={this.fetchList} />
      </div>
    );
  }
}

export default Index;
