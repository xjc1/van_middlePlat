import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, confirmAble } from '@/components/tis_ui';
import MatterSyncList from './MatterSyncList';
import styles from './matterSync.less';
import { MATTER } from '@/services/api';
import { notification } from 'antd';

@connect(({ matterSync }) => matterSync)
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
    this.fetchMatterSync({});
  }

  fetchMatterSync = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'matterSync/fetchList',
      params: {
        page,
        size,
        ...query,
        syncType: 5,
      },
    });
  };

  componentWillUnmount() {
    this.isUnmount = true;
  }

  onSync = () => {
    this.setState({ policyProjectSyncStatus: true }, async () => {
      await MATTER.matterSyncUsingPOST();
      notification.success({
        message: '开始同步',
      });
      this.fetchMatterSync({});
      if (!this.isUnmount) {
        this.setState({ syncStatus: false });
      }
    });
  };

  isConfirmSync = confirmAble({
    confirmText: '提示',
    confirmContent: '是否确认同步',
    onClick: this.onSync,
  });

  render() {
    const { syncStatus } = this.state;
    return (
      <div>
        <TButton.Button type="primary" loading={syncStatus} onClick={this.isConfirmSync}>
          一键同步
        </TButton.Button>
        <MatterSyncList className={styles.matterSyncList} onPageSizeChange={this.fetchMatterSync} />
      </div>
    );
  }
}

export default Index;
