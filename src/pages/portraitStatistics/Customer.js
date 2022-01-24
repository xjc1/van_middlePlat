import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Descriptions, Radio, Spin, Row } from 'antd';
import { PageTab } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';
import InfoItem from './components/InfoItem';
import styles from './index.less';

const { tagSummaryRoutes } = require('../../../config/summaryInfoRoutes');

const typeData = {
  1: '每个画像标签覆盖用户数',
  2: '每个画像分类覆盖用户数',
  3: '每个用户画像标签数分布',
  4: '每个用户画像分类数分布',
};

@connect(({ portraitStatistics, loading }) => ({
  ...portraitStatistics,
  loading: loading.effects['portraitStatistics/coverage'],
}))
class Customer extends PureComponent {
  state = {
    objectType: appUserType.self,
  };

  componentDidMount() {
    this.fetchPortraitStatisticsSummary();
  }

  fetchPortraitStatisticsSummary = () => {
    const { objectType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitStatistics/coverage',
      payload: { objectType },
    });
  };

  render() {
    const { objectType } = this.state;
    const { userCoverData = {}, loading, customStatic = {} } = this.props;
    const {
      userTagCategory = {},
      userTag = {},
      userCategoryCover = {},
      userTagCover = {},
    } = userCoverData;
    const { percentile: userTagCategoryPer = {} } = userTagCategory;
    const { percentile: userTagPer = {} } = userTag;
    const { percentile: userCategoryCoverPer = {} } = userCategoryCover;
    const { percentile: userTagCoverPer = {} } = userTagCover;
    return (
      <div>
        <PageTab tabList={Object.values(tagSummaryRoutes)} value={tagSummaryRoutes.customer.rName} />
        <Spin spinning={loading}>
          <div className={styles.infoTopCard}>
            对象类型：
            <Radio.Group
              buttonStyle="solid"
              onChange={e => {
                this.setState({ objectType: e.target.value }, () =>
                  this.fetchPortraitStatisticsSummary(),
                );
              }}
              defaultValue={objectType}
            >
              <Radio.Button value={appUserType.self}>个人</Radio.Button>
              <Radio.Button value={appUserType.legalPerson}>法人</Radio.Button>
            </Radio.Group>
            <span className={styles.totalInfo}>画像标签总数: {customStatic.tagCount}</span>
            <span className={styles.totalInfo}>
              已匹配用户画像标签数: {customStatic.usedTagCount}
            </span>
            <span className={styles.totalInfo}>用户数: {customStatic.userCount}</span>
            <span className={styles.totalInfo}>
              已匹配画像用户数: {customStatic.taggedUserCount}
            </span>
          </div>

          <div className={styles.infoCard}>
            <InfoItem title="用户">
              <Row gutter={16}>
                <Col span={12}>
                  <Descriptions bordered size="small" title={typeData[userTagCategory.type]}>
                    <Descriptions.Item label="最小值" span={3}>
                      {userTagCategoryPer.min}
                    </Descriptions.Item>
                    <Descriptions.Item label="最大值" span={3}>
                      {userTagCategoryPer.max}
                    </Descriptions.Item>
                    <Descriptions.Item label="平均数" span={3}>
                      {userTagCategoryPer.average}
                    </Descriptions.Item>
                    <Descriptions.Item label="25%" span={3}>
                      {userTagCategoryPer.firstQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="50%" span={3}>
                      {userTagCategoryPer.secondQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="75%" span={3}>
                      {userTagCategoryPer.thirdQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="95%" span={3}>
                      {userTagCategoryPer.fourthQuartile}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions bordered size="small" title={typeData[userTag.type]}>
                    <Descriptions.Item label="最小值" span={3}>
                      {userTagPer.min}
                    </Descriptions.Item>
                    <Descriptions.Item label="最大值" span={3}>
                      {userTagPer.max}
                    </Descriptions.Item>
                    <Descriptions.Item label="平均数" span={3}>
                      {userTagPer.average}
                    </Descriptions.Item>
                    <Descriptions.Item label="25%" span={3}>
                      {userTagPer.firstQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="50%" span={3}>
                      {userTagPer.secondQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="75%" span={3}>
                      {userTagPer.thirdQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="95%" span={3}>
                      {userTagPer.fourthQuartile}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </InfoItem>
          </div>
          <div className={styles.infoCard}>
            <InfoItem title="覆盖率">
              <Row gutter={16}>
                <Col span={12}>
                  <Descriptions bordered size="small" title={typeData[userCategoryCover.type]}>
                    <Descriptions.Item label="最小值" span={3}>
                      {userCategoryCoverPer.min}
                    </Descriptions.Item>
                    <Descriptions.Item label="最大值" span={3}>
                      {userCategoryCoverPer.max}
                    </Descriptions.Item>
                    <Descriptions.Item label="平均数" span={3}>
                      {userCategoryCoverPer.average}
                    </Descriptions.Item>
                    <Descriptions.Item label="25%" span={3}>
                      {userCategoryCoverPer.firstQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="50%" span={3}>
                      {userCategoryCoverPer.secondQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="75%" span={3}>
                      {userCategoryCoverPer.thirdQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="95%" span={3}>
                      {userCategoryCoverPer.fourthQuartile}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions bordered size="small" title={typeData[userTagCover.type]}>
                    <Descriptions.Item label="最小值" span={3}>
                      {userTagCoverPer.min}
                    </Descriptions.Item>
                    <Descriptions.Item label="最大值" span={3}>
                      {userTagCoverPer.max}
                    </Descriptions.Item>
                    <Descriptions.Item label="平均数" span={3}>
                      {userTagCoverPer.average}
                    </Descriptions.Item>
                    <Descriptions.Item label="25%" span={3}>
                      {userTagCoverPer.firstQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="50%" span={3}>
                      {userTagCoverPer.secondQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="75%" span={3}>
                      {userTagCoverPer.thirdQuartile}
                    </Descriptions.Item>
                    <Descriptions.Item label="95%" span={3}>
                      {userTagCoverPer.fourthQuartile}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </InfoItem>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Customer;
