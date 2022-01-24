/* eslint-disable class-methods-use-this */
import BaseEntity from "@/pages/dialogStudios/lifecycle/BaseEntity";
import _ from "lodash";
import { ITEM_TYPES } from "@/pages/dialogStudios/itemConst";
import Lifecycle from "@/pages/dialogStudios/lifecycle";
import { IDGenerator } from "@tong/assistant/dist/index.es";

export default class Edge extends BaseEntity {

  getUseCondition(nodes) {
    return _.reduce(
      nodes,
      (result, { type, conf }) => {
        if (type === ITEM_TYPES.JUDGE_NODE) {
          const { conditions = [] } = conf;
          _.forEach(conditions, ({ edgeId, label }) => {
            // eslint-disable-next-line no-param-reassign
            result[edgeId] = label;
          });
        }
        return result;
      },
      {},
    );
  }

  getUseSlots(nodes, slots) {
    return _.reduce(nodes, (result, { type, conf }) => {
      if (type === ITEM_TYPES.SLOT_NODE) {
        const configSlots = conf?.slots;
        _.forEach(configSlots, ({ edgeId, slotId }) => {
          // eslint-disable-next-line no-param-reassign
          result[edgeId] = {
            slotId,
            slotName: _.find(slots, { slotId })?.name,
          };
        });
      }
      return result;
    }, {});
  }

  initData(nodes, edges) {
    const useConditions = Lifecycle[ITEM_TYPES.EDGE].getUseCondition(nodes);
    const useSlots = Lifecycle[ITEM_TYPES.EDGE].getUseSlots(nodes, edges);
    return function ({ edgeId, startNodeId, sourceAnchor, targetAnchor, endNodeId }) {
      return {
        source: startNodeId,
        sourceAnchor,
        label: useConditions[edgeId] || useSlots[edgeId]?.slotName,
        target: endNodeId,
        targetAnchor,
        id: edgeId,
        slotEdgeId: useSlots[edgeId] && [useSlots[edgeId].slotId, edgeId].join('_'),
      };
    };
  }

  formData({ source, sourceAnchor, target, targetAnchor, id }) {
    return {
      startNodeId: source,
      sourceAnchor,
      endNodeId: target,
      targetAnchor,
      edgeId: id,
    };
  }

  copy(state, edge, { source, target }) {
    const nextEdge = _.cloneDeep(edge);
    const id = IDGenerator.next();
    return {
      ...nextEdge,
      id,
      source: source || nextEdge.source,
      target: target || nextEdge.target,
    };
  }

  create(nextNode) {
    return nextNode
  }

}
