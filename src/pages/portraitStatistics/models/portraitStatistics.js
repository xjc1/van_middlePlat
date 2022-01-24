import { PORTRAITTAGSTATISTICS, PORTRAITTAGNUMSTATISTICS, CORE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import { message } from 'antd';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { portraitRowType } from '@/utils/constantEnum';
import { EmptyFn } from '@/components/tis_ui';

const IncrementIDGenerator = new IDGenerator('TagIncrement');
const TagPercentageIDGenerator = new IDGenerator('TagPercentage');
const TagDetailIDGenerator = new IDGenerator('TagDetail');

function removeEmptyChildren(treeArray) {
  return _.map(treeArray, treeItem => {
    const { children = [], ...others } = treeItem;
    const newTreeItem = { ...others };
    if (children.length) {
      newTreeItem.children = removeEmptyChildren(children);
    }
    return newTreeItem;
  });
}

const Model = {
  namespace: 'portraitStatistics',
  state: {
    list: [],
    dictNames: {},
    userCoverData: {},
    customStatic: {},
    increments: [],
    portraitNum: 0,
    percentages: [],
    portraitTagSum: 0,
    menuTreeData: [],
    tagTotal: { categoryNum: 0, num: 0 },
    tagDetail: { columns: [], dataSource: [] },
    refreshStatus: 0,
    lastTime: '',
  },

  effects: {
    *overviewData(payload, { put }) {
      const list = yield PORTRAITTAGSTATISTICS.getPortraitTagOverviewUsingGET();
      const { dictNames } = yield Code2Name(Promise.resolve({ content: list }), [
        'SH00XZQH',
        'regionCount.type',
      ]);
      yield put({
        type: 'saveData',
        list,
        dictNames,
      });
    },

    *coverage({ payload }, { put }) {
      const {
        coverageData: customData,
        tagCount,
        taggedUserCount,
        usedTagCount,
        userCount,
      } = yield PORTRAITTAGSTATISTICS.getPortraitTagCoverageUsingGET({ params: payload });
      yield put({
        type: 'saveCustomer',
        userCoverData: {
          userTagCategory: _.find(customData, { type: 4 }) || {},
          userTag: _.find(customData, { type: 3 }) || {},
          userCategoryCover: _.find(customData, { type: 2 }) || {},
          userTagCover: _.find(customData, { type: 1 }) || {},
        },
        customStatic: { tagCount, taggedUserCount, usedTagCount, userCount },
      });
    },

    *lastTime({ onGetStatus = EmptyFn }, { put }) {
      const { statTime, state } = yield PORTRAITTAGSTATISTICS.getLastRefreshTimeUsingGET();
      onGetStatus(state);
      yield put({
        type: 'setTime',
        time: statTime,
        status: state,
      });
    },

    *refresh() {
      try {
        yield PORTRAITTAGSTATISTICS.refreshPortraitTagStatisticsUsingGET();
      } catch (e) {
        message.error('刷新失败');
      }
    },
    *fetchTagIncrementData({ payload = {} }, { put }) {
      const {
        increments = [],
        portraitNum,
      } = yield PORTRAITTAGNUMSTATISTICS.getPortraitTagIncrementsStatisticsUsingGET({
        params: { ...payload },
      });
      yield put({
        type: 'saveTagIncrementData',
        increments: increments.map(it => ({ id: IncrementIDGenerator.next(), ...it })),
        portraitNum,
      });
    },

    *fetchTagProportionData({ payload = {} }, { put }) {
      const {
        percentages = [],
        portraitTagSum,
      } = yield PORTRAITTAGNUMSTATISTICS.getPortraitTagPercentagesStatisticsUsingGET({
        params: { ...payload },
      });
      yield put({
        type: 'saveTagProportionData',
        percentages: percentages.map(it => ({ id: TagPercentageIDGenerator.next(), ...it })),
        portraitTagSum,
      });
    },
    *fetchTagMenuTreeData({ payload = {} }, { put }) {
      const {
        children: menuTreeData = [],
      } = yield PORTRAITTAGSTATISTICS.getPortraitTagApplicationMenuUsingGET({
        params: { ...payload },
      });
      const formatTreeData = removeEmptyChildren(menuTreeData);
      yield put({
        type: 'saveTagMenuTreeDat',
        menuTreeData: formatTreeData,
      });
    },
    *fetchTagTotal({ payload = {} }, { put }) {
      const { categoryNum = 0, num = 0 } = yield CORE.getPortraitTagNumStatisticsUsingGET({
        params: { ...payload },
      });
      yield put({
        type: 'saveTagTotal',
        tagTotal: { categoryNum, num },
      });
    },
    // 获取详情

    *fetchTagProportionDetail({ payload = {} }, { put }) {
      const {
        distributeDetails = [],
        topData = [],
        rowType,
      } = yield PORTRAITTAGNUMSTATISTICS.getPortraitTagNumDetailStatisticsUsingGET({
        params: { ...payload },
      });
      const columns = _.map(topData, (title, index) => ({ title, dataIndex: `column_${index}` }));
      // 组织数据
      const dataSource = _.map(distributeDetails, ({ name, category, data: colData }) => {
        const colFormatValue = {};
        _.forEach(colData, (colVal, index) => {
          colFormatValue[`column_${index}`] = colVal;
        });
        return {
          id: TagDetailIDGenerator.next(),
          name: rowType === portraitRowType.TAG ? name : category,
          ...colFormatValue,
        };
      });
      yield put({
        type: 'saveTagProportionDetail',
        tagDetail: {
          columns: [
            { title: rowType === portraitRowType.TAG ? '标签名称' : '标签分类', dataIndex: 'name' },
            ...columns,
          ],
          dataSource,
        },
      });
    },
  },
  reducers: {
    saveData(state, { list, dictNames }) {
      return { ...state, list, dictNames };
    },

    saveCustomer(state, { userCoverData, customStatic }) {
      return { ...state, userCoverData, customStatic };
    },

    setTime(state, { time, status }) {
      return { ...state, lastTime: time, refreshStatus: status };
    },
    saveTagIncrementData(state, { increments, portraitNum }) {
      return { ...state, increments, portraitNum };
    },
    saveTagProportionData(state, { percentages, portraitTagSum }) {
      return { ...state, percentages, portraitTagSum };
    },
    saveTagMenuTreeDat(state, { menuTreeData }) {
      return { ...state, menuTreeData };
    },
    saveTagTotal(state, { tagTotal }) {
      return { ...state, tagTotal };
    },
    saveTagProportionDetail(state, { tagDetail }) {
      return { ...state, tagDetail };
    },
  },
};
export default Model;
