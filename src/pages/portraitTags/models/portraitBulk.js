import { KERNEL } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import router from '@/utils/tRouter';
import { message } from 'antd';

const Model = {
  namespace: 'portraitTagBulk',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
  },
  effects: {
    *fetchList({ params, body }, { put, select }) {
      const { query } = yield select(_ => _.portraitTags);
      const {
        content: list,
        totalElements: total,
        size: pageSize,
        number: pageNum,
      } = yield KERNEL.getPortraitTagPageListUsingPOST(
        TrackTool.cacheAndGetQuery({
          params,
          body: { ...body, ...query },
        }),
      );
      yield put({
        type: 'saveList',
        list,
        total,
        pageSize,
        pageNum,
      });
    },

    *bulkAdd({ body }) {
      try {
        yield KERNEL.bulkAddPortraitTagsUsingPOST({ body });
        message.success('批量新增成功');
        router.push({ name: 'tags' });
      } catch (e) {
        message.error(`批量添加失败，失败原因: ${e.msg}`);
      }
    },
  },
  reducers: {
    saveList(state, { list, total, pageSize, pageNum }) {
      return { ...state, list, total, pageSize, pageNum };
    },
  },
};
export default Model;
