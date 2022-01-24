/* eslint-disable class-methods-use-this */
import _ from "lodash";
import BaseNode from "../BaseNode";

export default class UserInputNode extends BaseNode {

  onUpdateRule(selectedNode, rules, state) {
    const { nodes } = state;
    let nextSelectedNode = null;
    const nextNodes = _.map(nodes, node => {
      if (node.id === selectedNode.id) {
        const { setting } = selectedNode;
        const newNode = {
          ...selectedNode,
          setting: {
            ...setting,
            ruleIds: rules,
          },
        };
        nextSelectedNode = newNode;
        return newNode;
      }
      return node;
    });
    return {
      ...state,
      nodes: nextNodes,
      selectedNode: nextSelectedNode,
    };
  }

  onUpdateIntent(selectedNode, intent, state) {
    const { nodes = [] } = state;
    let nextSelectedNode = null;
    const nextNodes = _.map(nodes, node => {
      if (node.id === selectedNode.id) {
        const { setting } = selectedNode;
        const newNode = {
          ...selectedNode,
          setting: {
            ...setting,
            intentIds: intent,
          },
        };
        nextSelectedNode = newNode;
        return newNode;
      }
      return node;
    });
    return {
      ...state,
      nodes: nextNodes,
      selectedNode: nextSelectedNode,
    };
  }


}
