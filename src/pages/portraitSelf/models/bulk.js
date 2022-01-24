/* eslint-disable */
import { KERNEL } from '@/services/api';
import { message } from 'antd';

const Model = {
  namespace: 'selfBulk',
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    noPagination: false,
  },
  effects: {
    *bathAddTags({ body = {} }, { put }) {
      try {
        yield KERNEL.appendPersonalTagsUsingPOST({ body });
        message.success('批量添加个人标签成功');
      } catch (e) {
        message.error('批量添加个人标签失败，失败原因：' + e.msg);
      }
    },

    *bathDeleteTags({ body = {} }, { put }) {
      try {
        yield KERNEL.removePersonalTagsUsingPOST({ body });
        message.success('批量删除个人标签成功');
      } catch (e) {
        message.error('批量删除个人标签失败，失败原因：' + e.msg);
      }
    },

    *bathAddLegalTags({ body = {} }, { put }) {
      try {
        yield KERNEL.appendLegalTagsUsingPOST({ body });
        message.success('批量添加法人标签成功');
      } catch (e) {
        message.error('批量添加法人标签失败，失败原因：' + e.msg);
      }
    },

    *bathDeleteLegalTags({ body = {} }, { put }) {
      try {
        yield KERNEL.removeLegalTagsUsingPOST({ body });
        message.success('批量删除法人标签成功');
      } catch (e) {
        message.error('批量删除法人标签失败，失败原因：' + e.msg);
      }
    },
  },

  reducers: {
    saveList(state, { list, total, pageSize, pageNum, noPagination }) {
      const new_list = list.map(item => ({ ...item, id: item.uniqueCode }));
      return { ...state, list: new_list, total, pageSize, pageNum, focusItem: null, noPagination };
    },
  },
};
export default Model;
