import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, notification, Tooltip } from 'antd';
import { FundFilled, ReloadOutlined } from '@ant-design/icons';
import { CORE, DECLAREPROJECT } from '@/services/api';
import { TButton } from '@/components/tis_ui';
import PolicyProjectSyncQueryBar from './PolicyProjectSyncQueryBar';
import PolicyProjectSyncList from './PolicyProjectSyncList';
import styles from './policyProjectSync.less';

@connect(({ policyProjectSync }) => policyProjectSync)
class Index extends PureComponent {
  queryForm = null;

  timer = null;

  state = {
    query: {},
    syncData: null,
    viewSyncDataStatus: false,
    policyProjectSyncStatus: false,
  };

  componentDidMount() {
    this.isUnmount = false;
    this.fetchList({});
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'policyProjectSync/fetchList',
      params: { page, size, syncType: 2 },
    });
  };

  handleViewSyncData = query => {
    this.setState({ viewSyncDataStatus: true }, async () => {
      const { regions = {} } = query;
      const res = await CORE.listViewSyncUsingGET({
        params: { regions: regions.value, syncType: 2 },
      });
      if (!this.isUnmount) {
        this.setState({ query, syncData: res, viewSyncDataStatus: false });
      }
    });
  };

  handlePolicyProjectSync = query => {
    this.setState({ policyProjectSyncStatus: true }, async () => {
      const { regions = {} } = query;
      await DECLAREPROJECT.syncProjectUsingGET({ params: { regions: regions.value } });
      notification.success({
        message: '开始同步',
      });
      this.fetchList({});
      if (!this.isUnmount) {
        this.setState({ policyProjectSyncStatus: false });
      }
    });
  };

  render() {
    const {
      query: { regions = {} },
      syncData,
      viewSyncDataStatus,
      policyProjectSyncStatus,
    } = this.state;

    return (
      <div>
        <PolicyProjectSyncQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Tooltip title="查看所选地区的同步数据">
                <TButton.Button
                  type="primary"
                  loading={viewSyncDataStatus}
                  onClick={() =>
                    this.queryForm.validateFields().then(query => {
                      this.handleViewSyncData(query);
                    })
                  }
                >
                  查看同步
                </TButton.Button>
              </Tooltip>
              <Tooltip title="同步所选地区">
                <TButton.Button
                  type="primary"
                  loading={policyProjectSyncStatus}
                  onClick={() =>
                    this.queryForm.validateFields().then(query => {
                      this.handlePolicyProjectSync(query);
                    })
                  }
                >
                  一键同步
                </TButton.Button>
              </Tooltip>
            </>
          }
          footer={
            <>
              <TButton.Button
                type="primary"
                ghost
                icon={<ReloadOutlined />}
                onClick={() => {
                  const { pageNum } = this.props;
                  this.fetchList({ page: pageNum });
                }}
              >
                刷新列表
              </TButton.Button>
            </>
          }
        />

        <PolicyProjectSyncList
          className={styles.policyProjectSyncList}
          fetchList={this.fetchList}
        />

        {syncData !== null && (
          <Modal
            visible
            title={`查看同步 -- ${regions.label || '全部地区'}`}
            onCancel={() => this.setState({ query: {}, syncData: null })}
            footer={null}
          >
            <FundFilled
              style={{
                color: '#1890ff',
                fontSize: '50px',
                marginRight: '20px',
                verticalAlign: 'bottom',
              }}
            />
            <span style={{ fontSize: '20px' }}>{syncData} 条数据</span>
          </Modal>
        )}
      </div>
    );
  }
}

export default Index;
