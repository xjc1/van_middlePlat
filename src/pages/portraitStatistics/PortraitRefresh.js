import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Spin, Tag, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { confirmAble, PageTab } from '@/components/tis_ui';
import { portraitRefreshStatus } from '@/utils/constantEnum';

import style from './fresh.less';

const { tagSummaryRoutes } = require('../../../config/summaryInfoRoutes');

const statusColor = {
  [portraitRefreshStatus.RUNNING]: 'orange',
  [portraitRefreshStatus.SUCCESS]: 'green',
  [portraitRefreshStatus.FAIL]: 'red',
};

@connect(({ portraitStatistics, loading }) => ({
  ...portraitStatistics,
  loading: loading.effects['portraitStatistics/refresh'],
}))
class PortraitRefresh extends PureComponent {
  timer = null;

  componentDidMount() {
    this.fetchStatus();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchStatus = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitStatistics/lastTime',
      onGetStatus: status => {
        if (this.timer && status !== portraitRefreshStatus.RUNNING) {
          clearInterval(this.timer);
        }
        if (!this.timer && status === portraitRefreshStatus.RUNNING) {
          this.timer = setInterval(() => this.fetchStatus(), 2000);
        }
      },
    });
  };

  onRefresh = () => {
    const { dispatch } = this.props;
    const refresh = confirmAble({
      confirmText: '警告',
      confirmContent: '确定要刷新吗？',
      onClick: () => {
        dispatch({
          type: 'portraitStatistics/refresh',
        });
      },
    });
    refresh();
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => this.fetchStatus(), 2000);
  };

  render() {
    const { loading, lastTime, refreshStatus } = this.props;
    return (
      <div>
        {loading ? (
          <Spin tip="数据加载中...." style={{ marginLeft: 30 }} />
        ) : (
          <>
            <PageTab
              tabList={Object.values(tagSummaryRoutes)}
              value={tagSummaryRoutes.refresh.rName}
            />
            <div className={style.refreshCard}>
              <p className={style.refreshTime}>
                <Space>
                  <span>画像数据最后统计时间为:</span>
                  <span>{lastTime || '无'}</span>
                </Space>
              </p>
              <p className={style.refreshTime}>
                <Space>
                  <span>最后统计状态为:</span>
                  <Tag color={statusColor[refreshStatus] || 'blue'}>
                    {portraitRefreshStatus.$v_names[refreshStatus] || '无'}
                  </Tag>
                </Space>
              </p>
              <Card className={style.refreshContent}>
                <p className={style.refreshTitle}>刷新统计数据</p>
                <span className={style.refreshDescription}>重新统计所有画像数据</span>
                <Button
                  className={style.refreshBtn}
                  icon={<ReloadOutlined />}
                  onClick={this.onRefresh}
                >
                  刷新
                </Button>
              </Card>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default PortraitRefresh;
