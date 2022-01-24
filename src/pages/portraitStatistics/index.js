import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Descriptions } from 'antd';
import { PageTab } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';

const { tagSummaryRoutes } = require('../../../config/summaryInfoRoutes');

@connect(({ portraitStatistics }) => portraitStatistics)
class Index extends PureComponent {
  componentDidMount() {
    this.fetchOverviewData();
  }

  fetchOverviewData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitStatistics/overviewData',
    });
  };

  render() {
    const { list, dictNames = {} } = this.props;
    return (
      <div>
        <PageTab tabList={Object.values(tagSummaryRoutes)} value={tagSummaryRoutes.tagTotal.rName} />
        <div style={{ background: '#fff', marginTop: 20 }}>
          {list.map((data = {}) => (
            <Descriptions
              key={data.id}
              title={appUserType.self === data.objectType ? '个人' : '法人'}
              layout="vertical"
              style={{ padding: '20px' }}
              bordered
            >
              <Descriptions.Item label="数量" span={0.5}>
                <p>标签总分类数：{data.categoryCount}</p>
                <p>标签总数：{data.totalCount}</p>
                <p>本月新增标签数：{data.newInThisMonth}</p>
                <p>上月新增标签数：{data.newInLastMonth}</p>
              </Descriptions.Item>
              <Descriptions.Item label="用户" span={0.5}>
                <p>用户总数：{data.userCount}</p>
                <p>规则标签关联用户数：{data.ruleUserCount}</p>
                <p>同步标签关联用户数：{data.syncUserCount}</p>
                <p>手动标签关联用户数：{data.manualUserCount}</p>
                <p>已关联至用户标签数：{data.userRelatedTagCount}</p>
                <p>标签覆盖用户百分比：{data.tagCoveragePercent}%</p>
                <p>平均每个用户关联的标签数：{data.userTagAverage}</p>
              </Descriptions.Item>
              <Descriptions.Item label="规则" span={0.5}>
                <p>规则总数：{data.ruleCount}</p>
                <p>已使用规则：{data.ruleUsedCount}</p>
                <p>本月新增规则数：{data.newRuleInThisMonth}</p>
                <p>上月新增规则数：{data.newRuleInLastMonth}</p>
                <p>已配置规则标签数：{data.ruledTagCount}</p>
                <p>离线标签：{data.offLineTagCount}</p>
                <p>实时标签：{data.realTimeTagCount}</p>
              </Descriptions.Item>
              <Descriptions.Item label="来源" span={0.5}>
                {(data.sourceCount || []).map(({ type = '', count = 0 }) => (
                  <p key={type}>
                    {type}：{count}
                  </p>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="区划" span={0.5}>
                {(data.regionCount || []).map(({ type = '', count = 0 }) => (
                  <p key={type}>
                    {dictNames.SH00XZQH[type]}：{count}
                  </p>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="应用" span={0.5}>
                {(data.conditionCount || []).map(({ type = '', count = 0 }) => (
                  <p key={type}>
                    {type}：{count}
                  </p>
                ))}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;
