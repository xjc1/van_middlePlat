/* eslint-disable */
import _ from 'lodash';
import { message } from 'antd';
import { SCENE } from '@/services/api';
import router from '@/utils/tRouter';

function forEachTreeData(originTree, touch) {
  _.forEach(originTree, node => {
    touch(node);
    const { children } = node;
    forEachTreeData(children, touch);
  });
}

function mapSeenesNodes({ children, newNode, question, modify, matter = [], ...others }) {
  return {
    matter,
    question,
    newNode,
    ...others,
    children: children ? _.map(children, mapSeenesNodes) : undefined,
  };
}

const Model = {
  namespace: 'scenesQA',
  state: {
    tree: [],
    scenesId: '',
    focusNode: null,
    preView: 'no',
    curSceneObjectType: '',
  },
  effects: {
    * fetchSceneDetail({ scenesId }, { put }) {
      const { object = '' } = yield SCENE.getSceneDetailUsingGET(scenesId);
      yield put({ type: 'saveSceneObjectType', objectType: object });
    },

    * fetchScenes({ payload: { nodeId, scenesId } }, { put }) {
      const { id, sid, children = [] } = yield SCENE.getSceneTreeUsingGET(scenesId);
      const focusNode = yield Promise.resolve().then(() => {
        let nextNode = null;
        forEachTreeData(children, node => {
          if (nodeId && `${nodeId}` === `${node.cid}`) {
            nextNode = node;
          }
        });
        return nextNode;
      });
      yield put({
        type: 'saveTree',
        payload: {
          tree: children,
          focusNode,
          sid,
          scenesId: id,
        },
      });
    },

    * saveScenes({ payload }, { put, select }) {
      const { id, tree, focusNode } = yield select(({ scenesQA }) => ({
        tree: scenesQA.tree,
        id: scenesQA.scenesId,
        focusNode: scenesQA.focusNode,
      }));
      try {
        const result = _.map(tree, mapSeenesNodes);
        if (focusNode && focusNode.newNode) {
          const nextId = yield SCENE.updateSceneQaUsingPOST(id, {
            body: { children: result },
            params: { node: focusNode.cid },
          });
          yield put({
            type: 'fetchScenes',
            payload: {
              nodeId: nextId,
              scenesId: id,
            },
          });
          router.push({ name: 'scenesQA_node', params: { scenesId: id, nodeId: nextId } });
          message.success('保存成功, 你可以继续编辑节点.');
        } else {
          yield SCENE.updateSceneQaUsingPOST(id, { body: { children: result } });
          yield put({
            type: 'fetchScenes',
            payload: {
              nodeId: focusNode && focusNode.cid,
              scenesId: id,
            },
          });
          message.success('保存成功, 你可以继续编辑主题树.');
        }
      } catch (err) {
        message.error('保存失败, 请检查');
      }
    },
  },

  reducers: {
    saveTree(state, { payload: { tree, focusNode, scenesId, sid } }) {
      return { ...state, tree, focusNode, scenesId, sid };
    },

    saveSceneObjectType(state, { objectType }) {
      return { ...state, curSceneObjectType: objectType };
    },

    focusNode(state, { payload }) {
      return { ...state, focusNode: payload };
    },

    clean(state) {
      return {
        tree: [],
        scenesId: '',
        focusNode: null,
      };
    },

    touch(state, { payload }) {
      const { tree } = state;
      return { ...state, tree: [...(payload || tree)] };
    },

    setPreview(state, { payload }) {
      return { ...state, preView: payload };
    },
  },
};
export default Model;
