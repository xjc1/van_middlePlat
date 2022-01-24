/* eslint-disable class-methods-use-this */
import BaseNode from "@/pages/dialogStudios/lifecycle/BaseNode";
import { ITEM_ELEMENTS, ITEM_TYPES } from "@/pages/dialogStudios/itemConst";
import _ from 'lodash';
import { utils } from '@/components/tis_ui';
import Lifecycle from "@/pages/dialogStudios/lifecycle";

const { IDGenerator } = utils;

export default class Group extends BaseNode {

  create(nextNode) {
    return {
      ...nextNode,
      ...ITEM_ELEMENTS[ITEM_TYPES.GROUP],
    };
  }

  onUpdate(state, group) {
    const { groups } = state;
    return {
      ...state,
      groups: _.map(groups, (g) => {
        if (g.id === group.id) {
          return group;
        }
        return g;
      }),
    };
  }

  copy(state, node, { offsetX = 100, offsetY = 100 }) {
    const { nodes, edges } = state;
    const nextId = IDGenerator.next();
    const { id, x, y, ...others } = _.cloneDeep(node);
    const oldNewMap = {};
    /* 算出组内节点 */
    const groupNodes = _.chain(nodes)
      .filter((n) => id === n.parent)
      .map((n) => {
        const cpNode = Lifecycle[n.nodeType].copy(state, n, { offsetX, offsetY });
        oldNewMap[n.id] = cpNode;
        return cpNode;
      })
      .map(n => ({ ...n, parent: nextId }))
      .value();
    /* 复制相关联的线 */
    const relativeEdges = _.chain(edges)
      .reduce((result, edge) => {
        const { source, target } = edge;
        const obj = {};
        if (oldNewMap[source]) {
          obj.source = oldNewMap[source].id;
          obj.edge = edge;
        }
        if (oldNewMap[target]) {
          obj.target = oldNewMap[target].id;
          obj.edge = edge;
        }
        result.push(obj);
        return result;
      }, [])
      .filter((obj) => !_.isEmpty(obj))
      .map((edgeObjs) => {
        const { edge, source, target } = edgeObjs;
        return Lifecycle[ITEM_TYPES.EDGE].copy(state, edge, {
          source,
          target,
        });
      })
      .value();

    return {
      nextGroup: {
        ...others,
        id: nextId,
        x: x + offsetX,
        y: y + offsetY,
      },
      relativeNodes: groupNodes,
      relativeEdges,
    };
  }

  remove(state, id) {
    const { groups, nodes, edges } = state;
    const group = _.find(groups, { id });
    const needDeleteNodeIds = _.chain(nodes).filter({ parent: id }).map(({ id: nid }) => nid).value();
    return {
      ...state,
      groups: _.filter(groups, ({ id: gId }) => gId !== group.id),
      nodes: _.filter(nodes, ({ parent }) => parent !== group.id),
      edges: _.filter(edges, ({ source, target }) => {
        return !(_.includes(needDeleteNodeIds, source) || _.includes(needDeleteNodeIds, target));
      }),
      selectedNode: null,
    };
  }

}
