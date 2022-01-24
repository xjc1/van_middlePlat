import React, { Component } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { TurboTree } from '@/components/tis_ui';
import createNode, { generateId } from '@/components/tis_ui/TurboTree/createNode';
import newEntrie from '@/pages/scenesQA/undraw_new_entries_nh3h.png';

@connect(({ handlingConditions }) => handlingConditions)
class HcTree extends Component {
  handleSubmit = () => {
    const { sceneId, treeData, dispatch } = this.props;
    dispatch({
      type: 'handlingConditions/updateTreeData',
      payload: {
        id: sceneId,
        children: treeData,
      },
    });
  };

  render() {
    const { sceneId, nodeId, dispatch, treeData } = this.props;

    return (
      <TurboTree
        nodeId={nodeId}
        tree={treeData}
        draggable
        actions={{ ...TurboTree.ACTIONS }}
        newEntrieImg={newEntrie}
        onCreateTree={() => {
          createNode(val => {
            treeData.push({
              cid: generateId(),
              newNode: true,
              children: [],
              ...val,
            });
            dispatch({
              type: 'handlingConditions/saveTreeData',
              treeData: [...treeData],
            });
          });
        }}
        onSave={this.handleSubmit}
        onDoubleSelect={node => {
          const { cid } = node;
          router.replace({ name: 'conditions_node', params: { sceneId, nodeId: cid } });
          dispatch({
            type: 'handlingConditions/saveSelectedNode',
            selectedNode: node,
          });
        }}
        onUpdate={next => {
          dispatch({
            type: 'handlingConditions/saveTreeData',
            treeData: next,
          });
        }}
      />
    );
  }
}

export default HcTree;
