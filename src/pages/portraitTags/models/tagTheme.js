import { TAGTHEME, CORE } from '@/services/api';
import { message } from 'antd';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import React from 'react';

const tagThemeIdGenerator = new IDGenerator('tagTheme');

const Model = {
  namespace: 'tagTheme',
  state: {
    treeData: [],
  },
  effects: {
    *fetchList(payload, { put }) {
      const data = yield TAGTHEME.getTagThemeTreeUsingGET();
      const list = _.map(data, item => {
        return {
          ...item,
          themeId: item.id,
          title: (
            <span>
              {item.name}
              <span style={{ color: 'rgba(0,0,0,.45)' }}>({item.total})</span>
            </span>
          ),
          children: _.map(item.categoryInfos || [], children => {
            return {
              ...children,
              themeId: item.id,
              title: (
                <span>
                  {children.categoryName}
                  <span style={{ color: 'rgba(0,0,0,.45)' }}>({children.count})</span>
                </span>
              ),
              key: tagThemeIdGenerator.next(),
            };
          }),
          key: tagThemeIdGenerator.next(),
        };
      });
      yield put({
        type: 'saveList',
        list,
      });
    },

    *addTagTheme({ payload }, { put }) {
      try {
        yield CORE.addNewTagThemeUsingPOST({ body: payload });
        message.success('新增主题标签成功');
        yield put({ type: 'fetchList' });
      } catch (e) {
        message.error(`新增主题标签失败，失败原因：${e.msg}`);
      }
    },

    *editTagTheme({ payload }, { put }) {
      try {
        yield TAGTHEME.updateTagThemeUsingPOST({ body: payload });
        message.success('编辑主题标签成功');
        yield put({ type: 'fetchList' });
      } catch (e) {
        message.error(`编辑主题标签失败，失败原因：${e.msg}`);
      }
    },

    *deleteThemeTag({ id }, { put }) {
      try {
        yield TAGTHEME.removeTagThemeUsingPOST(id);
        message.success('删除主题标签成功');
        yield put({ type: 'fetchList' });
      } catch (e) {
        message.error(`删除主题标签失败，失败原因：${e.msg}`);
      }
    },
  },
  reducers: {
    saveList(state, { list }) {
      return { ...state, treeData: list };
    },
  },
};
export default Model;
