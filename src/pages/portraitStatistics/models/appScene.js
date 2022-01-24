import { PORTRAITTAGSTATISTICS, TAGSCENESTATISTICS } from '@/services/api';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import _ from 'lodash';

const TagMessageIDGenerator = new IDGenerator('TagMessage');
const ReuseRateIDGenerator = new IDGenerator('ReuseRate');

const getReuseRateData = (
  reuseRateColumnInfos = [{ name: '', dataKey: '', reuseKeyTransformArray: [] }],
  data,
) => {
  return _.reduce(
    reuseRateColumnInfos,
    (result = [], item) => {
      const columnData = data[item.dataKey];
      const reuseColumnData = { typeName: item.name, id: ReuseRateIDGenerator.next() };
      item.reuseKeyTransformArray.forEach(({ source, target }) => {
        reuseColumnData[target] = columnData[source];
      });
      result.push(reuseColumnData);
      return result;
    },
    [],
  );
};

const Model = {
  namespace: 'appScene',
  state: {
    totalNum: 0,
    applyNum: 0,
    messageInfo: {},
    reuseRateInfo: {},
    portraitArticleStatistics: {},
    portraitMatterStatistics: {},
    portraitPolicyStatistics: {},
    portraitProjectStatistics: {},
    portraitServiceStatistics: {},
    minConditionStatistics: {},
    sceneConditionStatistics: {},
    sceneGuideStatistics: {},
  },

  effects: {
    *fetchTotalInfo({ payload }, { put }) {
      const {
        num: totalNum, // 画像标签总数
        numApplied: applyNum, // 已应用画像标签数
        messageLinkedPortraitStatistics: {
          notOnMessageDetail = {},
          onMessageDetail = {},
          totalDetail = {},
          percentile: messagePercentile = {},
        }, // 消息
        portraitArticleStatistics, // 文章
        portraitMatterStatistics, // 事项
        portraitPolicyStatistics, // 政策
        portraitProjectStatistics, // 项目
        portraitReuseRateStatistics, // 覆盖率
        portraitServiceStatistics, // 服务
      } = yield PORTRAITTAGSTATISTICS.getPortraitTagApplicationUsingGET({ params: payload });
      const [
        minConditionStatistics, // 最小条件统计
        sceneConditionStatistics, // 办理条件统计
        sceneGuideStatistics, // 引导问卷统计
      ] = yield Promise.all([
        TAGSCENESTATISTICS.getMiniConditionStatisticsUsingGET({ params: payload }),
        TAGSCENESTATISTICS.getSceneConditionStatisticsUsingGET({ params: payload }),
        TAGSCENESTATISTICS.getSceneGuideStatisticsUsingGET({ params: payload }),
      ]);

      const messageColumns = [
        { title: '关联画像消息数/未关联画像消息数', dataIndex: 'typeName', width: 235 },
        { title: '未发布', dataIndex: 'unPublish' },
        { title: '发布中', dataIndex: 'publishing' },
        { title: '已过期', dataIndex: 'expire' },
        { title: '总数', dataIndex: 'total' },
      ];
      const messageDataSource = [
        {
          typeName: '上架',
          unPublish: `${onMessageDetail.notPublished.linked}/${onMessageDetail.notPublished.notLinked}`,
          publishing: `${onMessageDetail.publishing.linked}/${onMessageDetail.publishing.notLinked}`,
          expire: `${onMessageDetail.published.linked}/${onMessageDetail.published.notLinked}`,
          total: `${onMessageDetail.total.linked}/${onMessageDetail.total.notLinked}`,
          id: TagMessageIDGenerator.next(),
        },
        {
          typeName: '下架',
          unPublish: `${notOnMessageDetail.notPublished.linked}/${notOnMessageDetail.notPublished.notLinked}`,
          publishing: `${notOnMessageDetail.publishing.linked}/${notOnMessageDetail.publishing.notLinked}`,
          expire: `${notOnMessageDetail.published.linked}/${notOnMessageDetail.published.notLinked}`,
          total: `${notOnMessageDetail.total.linked}/${notOnMessageDetail.total.notLinked}`,
          id: TagMessageIDGenerator.next(),
        },
        {
          typeName: '总数',
          unPublish: `${totalDetail.notPublished.linked}/${totalDetail.notPublished.notLinked}`,
          publishing: `${totalDetail.publishing.linked}/${totalDetail.publishing.notLinked}`,
          expire: `${totalDetail.published.linked}/${totalDetail.published.notLinked}`,
          total: `${totalDetail.total.linked}/${totalDetail.total.notLinked}`,
          id: TagMessageIDGenerator.next(),
        },
      ];
      // 复用率
      const reuseRateColumns = [
        { title: '', dataIndex: 'typeName' },
        { title: '事项', dataIndex: 'matter' },
        { title: '政策', dataIndex: 'policy' },
        { title: '项目', dataIndex: 'project' },
        { title: '文章', dataIndex: 'article' },
        { title: '服务', dataIndex: 'service' },
        { title: '消息中心', dataIndex: 'message' },
        { title: '引导问卷', dataIndex: 'sceneGuide' },
        { title: '办理条件', dataIndex: 'sceneCondition' },
        { title: '最小条件', dataIndex: 'minimalCondition' },
      ];

      const reuseKeyTransformArray = [
        { target: 'matter', source: 'reuseOfMatter' },
        { target: 'policy', source: 'reuseOfPolicy' },
        { target: 'project', source: 'reuseOfProject' },
        { target: 'article', source: 'reuseOfArticle' },
        { target: 'service', source: 'reuseOfService' },
        { target: 'message', source: 'reuseOfMessage' },
        { target: 'sceneGuide', source: 'reuseOfSceneGuide' },
        { target: 'sceneCondition', source: 'reuseOfSceneCondition' },
        { target: 'minimalCondition', source: 'reuseOfMinimalCondition' },
      ];

      const reuseRateColumnInfos = [
        { name: '事项', dataKey: 'matter', reuseKeyTransformArray },
        { name: '政策', dataKey: 'policy', reuseKeyTransformArray },
        { name: '项目', dataKey: 'project', reuseKeyTransformArray },
        { name: '文章', dataKey: 'article', reuseKeyTransformArray },
        { name: '服务', dataKey: 'service', reuseKeyTransformArray },
        { name: '消息中心', dataKey: 'message', reuseKeyTransformArray },
        { name: '引导问卷', dataKey: 'sceneGuide', reuseKeyTransformArray },
        { name: '办理条件', dataKey: 'sceneCondition', reuseKeyTransformArray },
        { name: '最小条件', dataKey: 'minimalCondition', reuseKeyTransformArray },
      ];

      const reuseRateDataSource = getReuseRateData(
        reuseRateColumnInfos,
        portraitReuseRateStatistics,
      );
      yield put({
        type: 'saveTotalInfo',
        totalNum,
        applyNum,
        messageInfo: { messageColumns, messageDataSource, messagePercentile },
        reuseRateInfo: { reuseRateColumns, reuseRateDataSource },
        portraitArticleStatistics,
        portraitMatterStatistics,
        portraitPolicyStatistics,
        portraitProjectStatistics,
        portraitServiceStatistics,
        minConditionStatistics,
        sceneConditionStatistics,
        sceneGuideStatistics,
      });
    },
  },
  reducers: {
    saveTotalInfo(
      state,
      {
        totalNum,
        applyNum,
        messageInfo,
        portraitArticleStatistics,
        portraitMatterStatistics,
        portraitPolicyStatistics,
        portraitProjectStatistics,
        reuseRateInfo,
        portraitServiceStatistics,
        minConditionStatistics,
        sceneConditionStatistics,
        sceneGuideStatistics,
      },
    ) {
      return {
        ...state,
        totalNum,
        applyNum,
        messageInfo,
        portraitArticleStatistics,
        portraitMatterStatistics,
        portraitPolicyStatistics,
        portraitProjectStatistics,
        reuseRateInfo,
        portraitServiceStatistics,
        minConditionStatistics,
        sceneConditionStatistics,
        sceneGuideStatistics,
      };
    },
  },
};
export default Model;
