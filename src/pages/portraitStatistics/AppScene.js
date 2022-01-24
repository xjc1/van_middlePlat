import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Radio, Anchor, Spin } from 'antd';
import { appUserType } from '@/utils/constantEnum';
import { PageTab } from '@/components/tis_ui';
import InfoItem from './components/InfoItem';
import PortraitInfo from './components/appScene/PortraitInfo';
import MenuTree from './components/appScene/MenuTree';
import MessageCenter from './components/appScene/MessageCenter';
import ReuseRateInfo from './components/appScene/ReuseRateInfo';
import styles from './appScene.less';

const { tagSummaryRoutes } = require('../../../config/summaryInfoRoutes');

@connect(({ appScene, loading }) => ({
  ...appScene,
  loading: loading.effects['appScene/fetchTotalInfo'],
}))
class AppScene extends PureComponent {
  state = {
    userType: appUserType.self,
  };

  componentDidMount() {
    this.fetchAppSceneTotal();
  }

  fetchAppSceneTotal = () => {
    const { dispatch } = this.props;
    const { userType } = this.state;
    dispatch({
      type: 'appScene/fetchTotalInfo',
      payload: {
        object: userType,
      },
    });
  };

  render() {
    const { userType } = this.state;
    const {
      portraitArticleStatistics,
      portraitMatterStatistics,
      portraitPolicyStatistics,
      portraitProjectStatistics,
      minConditionStatistics,
      sceneConditionStatistics,
      sceneGuideStatistics,
      reuseRateInfo,
      messageInfo,
      portraitServiceStatistics,
      totalNum,
      applyNum,
      loading,
    } = this.props;
    return (
      <div>
        <PageTab tabList={Object.values(tagSummaryRoutes)} value={tagSummaryRoutes.appScene.rName} />
        <Spin spinning={loading}>
          <div style={{ padding: 20, background: '#FFFFFF', marginTop: 20 }}>
            对象类型：
            <Radio.Group
              buttonStyle="solid"
              defaultValue={userType}
              onChange={e => {
                this.setState({ userType: e.target.value }, () => {
                  this.fetchAppSceneTotal();
                });
              }}
            >
              <Radio.Button value={appUserType.self}>个人</Radio.Button>
              <Radio.Button value={appUserType.legalPerson}>法人</Radio.Button>
            </Radio.Group>
            <span className={styles.appSceneTotal}>画像标签总数: {totalNum}</span>
            <span className={styles.appSceneTotal}>已应用画像标签数: {applyNum}</span>
          </div>

          <div className={styles.appSceneContainer}>
            <div className={styles.appSceneContent}>
              <div id="matterInfo" className={styles.appSceneCard}>
                <InfoItem title="事项">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={portraitMatterStatistics}
                    typeName="事项"
                  />
                </InfoItem>
              </div>
              <div id="policyInfo" className={styles.appSceneCard}>
                <InfoItem title="政策">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={portraitPolicyStatistics}
                    typeName="政策"
                  />
                </InfoItem>
              </div>
              <div id="projectInfo" className={styles.appSceneCard}>
                <InfoItem title="项目">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={portraitProjectStatistics}
                    typeName="项目"
                  />
                </InfoItem>
              </div>
              <div id="articleInfo" className={styles.appSceneCard}>
                <InfoItem title="文章">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={portraitArticleStatistics}
                    typeName="文章"
                  />
                </InfoItem>
              </div>
              <div id="serviceInfo" className={styles.appSceneCard}>
                <InfoItem title="服务">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={portraitServiceStatistics}
                    typeName="服务"
                  />
                </InfoItem>
              </div>
              <div id="sceneGuide" className={styles.appSceneCard}>
                <InfoItem title="引导问卷">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={sceneGuideStatistics}
                    typeName="引导问卷"
                  />
                </InfoItem>
              </div>
              <div id="sceneCondition" className={styles.appSceneCard}>
                <InfoItem title="办理条件">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={sceneConditionStatistics}
                    typeName="办理条件"
                  />
                </InfoItem>
              </div>
              <div id="minCondition" className={styles.appSceneCard}>
                <InfoItem title="最小条件">
                  <PortraitInfo
                    tagTotal={totalNum}
                    info={minConditionStatistics}
                    typeName="最小条件"
                  />
                </InfoItem>
              </div>
              <div id="messageCenter" className={styles.appSceneCard}>
                <InfoItem title="消息中心">
                  <MessageCenter messageInfo={messageInfo} />
                </InfoItem>
              </div>
              <div id="menuTree" className={styles.appSceneCard}>
                <InfoItem title="菜单">
                  <MenuTree userType={userType} />
                </InfoItem>
              </div>
              <div id="reuseRateInfo" className={styles.appSceneCard}>
                <InfoItem title="复用率">
                  <ReuseRateInfo reuseRateInfo={reuseRateInfo} />
                </InfoItem>
              </div>
            </div>
            <div className={styles.appSceneAnchor}>
              <Anchor
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <Anchor.Link href="#matterInfo" title="事项" />
                <Anchor.Link href="#policyInfo" title="政策" />
                <Anchor.Link href="#projectInfo" title="项目" />
                <Anchor.Link href="#articleInfo" title="文章" />
                <Anchor.Link href="#serviceInfo" title="服务" />
                <Anchor.Link href="#messageCenter" title="消息中心" />
                <Anchor.Link href="#menuTree" title="菜单" />
                <Anchor.Link href="#reuseRateInfo" title="复用率" />
              </Anchor>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default AppScene;
