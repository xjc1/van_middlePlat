import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Spin } from 'antd';
import _ from 'lodash';
import ConfigForm from './ConfigForm';
import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ systemParamsConfig, loading }) => ({
  ...systemParamsConfig,
  loadingConfigs: loading.effects['systemParamsConfig/fetchConfigList'],
}))
class Index extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    // 获取系统参数配置
    dispatch({
      type: 'systemParamsConfig/fetchConfigList',
    });
  }

  render() {
    const { configList, loadingConfigs } = this.props;

    return (
      <Spin wrapperClassName={styles.configWrapper} spinning={loadingConfigs}>
        <Tabs className={styles.mainContent} tabPosition="left" tabBarStyle={{ width: '15%' }}>
          {_.map(configList, config => (
            <TabPane tab={config.name} key={config.code}>
              <ConfigForm config={config} />
            </TabPane>
          ))}
        </Tabs>
      </Spin>
    );
  }
}

export default Index;
