import { SCENE } from '@/services/api';
import _ from 'lodash';
import { notification } from 'antd';

function forEachTreeData(originTree, touch) {
  _.forEach(originTree, node => {
    touch(node);
    const { children } = node;
    forEachTreeData(children, touch);
  });
}

const Model = {
  namespace: 'handlingConditions',

  state: {
    treeData: [],
    selectedNode: null,
    curSceneObjectType: '',
  },

  effects: {
    *fetchSceneDetail({ sceneId }, { put }) {
      const { object = '' } = yield SCENE.getSceneDetailUsingGET(sceneId);
      yield put({ type: 'saveSceneObjectType', objectType: object });
    },

    *fetchTreeData({ payload: { sceneId, nodeId } }, { put }) {
      const res = yield SCENE.getSceneHandleConditionUsingGET(sceneId);
      const { children = [] } = res;
      yield put({
        type: 'saveTreeData',
        treeData: children,
      });
      const selectedNode = yield Promise.resolve().then(() => {
        let nextNode = null;
        forEachTreeData(children, node => {
          if (nodeId && `${nodeId}` === `${node.cid}`) {
            nextNode = node;
          }
        });
        return nextNode;
      });
      yield put({
        type: 'saveSelectedNode',
        selectedNode,
      });
    },

    *updateTreeData({ payload: { id, children } }, { put, select }) {
      const selectedNode = select(({ handlingConditions }) => handlingConditions.focusNode);
      const { cid: nodeId } = selectedNode;
      yield SCENE.updateSceneHandleConditionUsingPOST(id, {
        body: { id, children },
      });
      yield put({
        type: 'fetchTreeData',
        payload: {
          sceneId: id,
          nodeId,
        },
      });
      notification.success({
        message: '更新成功',
      });
    },
  },

  reducers: {
    saveSceneObjectType(state, { objectType }) {
      return { ...state, curSceneObjectType: objectType };
    },

    saveTreeData(state, { treeData }) {
      return { ...state, treeData };
    },

    saveSelectedNode(state, { selectedNode }) {
      return { ...state, selectedNode };
    },

    refreshTree(state) {
      const { treeData = [] } = state;
      return { ...state, treeData: [...treeData] };
    },

    clean() {
      return {
        treeData: [],
        selectedNode: null,
      };
    },
  },
};

export default Model;
