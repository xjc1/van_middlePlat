import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, confirmAble } from '@/components/tis_ui';
import ProjectViewSyncQueryBar from './ProjectViewSyncQueryBar';
import ProjectViewSyncList from './ProjectViewSyncList';
import styles from './projectViewSync.less';
import { CORE, PROJECTOVERVIEWS } from '@/services/api';
import { Modal, notification, Tooltip } from 'antd';
import { FundFilled } from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ projectViewSync }) => projectViewSync)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    syncData: null,
    viewSyncDataStatus: false,
    syncStatus: false,
  };

  componentDidMount() {
    this.isUnmount = false;
    this.fetchProjectViewSync({});
  }

  fetchProjectViewSync = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'projectViewSync/fetchList',
      params: {
        page,
        size,
        ...query,
        syncType: 4,
      },
    });
  };

  componentWillUnmount() {
    this.isUnmount = true;
  }

  queryViewSyncData = query => {
    this.setState({ viewSyncDataStatus: true }, async () => {
      const { regions = {} } = query;
      const res = await CORE.listViewSyncUsingGET({
        params: { regions: regions.value, syncType: 4 },
      });
      if (!this.isUnmount) {
        this.setState({ query, syncData: res, viewSyncDataStatus: false });
      }
    });
  };

  onPolicyViewSync = () => {
    this.queryForm.validateFields().then(query => {
      const { regions = {} } = query;
      this.setState({ policyProjectSyncStatus: true }, async () => {
        await PROJECTOVERVIEWS.syncProjectUsingGET({ params: { regions: regions.value } });
        notification.success({
          message: '开始同步',
        });
        this.fetchProjectViewSync({});
        if (!this.isUnmount) {
          this.setState({ syncStatus: false });
        }
      });
    });
  };

  isConfirmSync = confirmAble({
    confirmText: '提示',
    confirmContent: '是否确认同步',
    onClick: this.onPolicyViewSync,
  });

  render() {
    const {
      viewSyncDataStatus,
      syncData,
      query: { regions = {} },
      syncStatus,
    } = this.state;
    return (
      <div>
        <ProjectViewSyncQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Search
                type="primary"
                loading={viewSyncDataStatus}
                onClick={() =>
                  this.queryForm.validateFields().then(query => {
                    this.queryViewSyncData(query);
                  })
                }
              >
                查看同步
              </TButton.Search>
              <TButton.Button type="primary" loading={syncStatus} onClick={this.isConfirmSync}>
                一键同步
              </TButton.Button>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.setState(
                      { query: { regions: query.regions && query.regions.value } },
                      () => this.fetchProjectViewSync({}),
                    );
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchProjectViewSync({}));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ProjectViewSyncList
          className={styles.projectViewSyncList}
          onPageSizeChange={this.fetchProjectViewSync}
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
            <span style={{ fontSize: '20px' }}>{syncData || 0} 条数据</span>
          </Modal>
        )}
      </div>
    );
  }
}

export default Index;
