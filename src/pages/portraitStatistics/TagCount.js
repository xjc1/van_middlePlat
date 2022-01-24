import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Radio, Spin } from 'antd';
import { PageTab } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';
import InfoItem from './components/InfoItem';
import TagIncrement from './components/tagCount/TagIncrement';
import Proportion from './components/tagCount/Proportion';
import Detail from './components/tagCount/Detail';
import styles from './index.less';

const { tagSummaryRoutes } = require('../../../config/summaryInfoRoutes');

@connect(({ portraitStatistics, loading }) => ({
  ...portraitStatistics,
  loading:
    loading.effects['portraitStatistics/fetchTagProportionDetail'] ||
    loading.effects['portraitStatistics/fetchTagTotal'] ||
    loading.effects['portraitStatistics/fetchTagIncrementData'] ||
    loading.effects['portraitStatistics/fetchTagProportionData'],
}))
class TagCount extends PureComponent {
  state = {
    userType: appUserType.self,
  };

  componentDidMount() {
    this.fetchTotal();
  }

  fetchTotal() {
    const { dispatch } = this.props;
    const { userType } = this.state;
    dispatch({
      type: 'portraitStatistics/fetchTagTotal',
      payload: {
        object: userType,
      },
    });
  }

  render() {
    const { tagTotal, loading } = this.props;
    const { userType } = this.state;

    return (
      <div>
        <PageTab tabList={Object.values(tagSummaryRoutes)} value={tagSummaryRoutes.tagCount.rName} />
        <Spin spinning={loading}>
          <div className={styles.infoTopCard}>
            对象类型：
            <Radio.Group
              buttonStyle="solid"
              defaultValue={this.state.userType}
              onChange={e => {
                this.setState({ userType: e.target.value }, () => {
                  this.fetchTotal();
                });
              }}
            >
              <Radio.Button value={appUserType.self}>个人</Radio.Button>
              <Radio.Button value={appUserType.legalPerson}>法人</Radio.Button>
            </Radio.Group>
            <span className={styles.totalInfo}>画像总分类数: {tagTotal.categoryNum}</span>
            <span className={styles.totalInfo}>画像标签总数: {tagTotal.num}</span>
          </div>
          <div className={styles.infoCard}>
            <InfoItem title="增量">
              <TagIncrement userType={userType} />
            </InfoItem>
          </div>
          <div className={styles.infoCard}>
            <InfoItem title="占比">
              <Proportion userType={userType} />
            </InfoItem>
          </div>

          <div className={styles.infoCard}>
            <InfoItem title="详情">
              <Detail userType={userType} />
            </InfoItem>
          </div>
        </Spin>
      </div>
    );
  }
}

export default TagCount;
