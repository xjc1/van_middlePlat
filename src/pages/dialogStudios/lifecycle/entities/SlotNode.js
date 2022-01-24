/* eslint-disable class-methods-use-this */
import _ from "lodash";
import BaseNode from "../BaseNode";
import { message } from "antd";

export default class SlotNode extends BaseNode {

  formData({ setting, ...others }) {
    const { options = [] } = setting;
    return {
      ...this.commonOper(others),
      conf: {
        slots: _.map(options, ({ edgeId, slotId }) => ({
          edgeId,
          slotId,
        }))
      },
    };
  }

  initSetting(conf) {
    const { name, slots = [] } = conf;
    return {
      name,
      options: slots,
    };
  }

  onEdgeRemove(node, id) {
    const { setting = {} } = node;
    const { options = [] } = setting;
    return {
      ...node,
      setting: {
        ...setting,
        options: _.map(options, (option) => {
          const { edgeId, ...others } = option;
          if (option.edgeId === id) {
            return others;
          }
          return option;
        })
      }
    };
  }

  onEdgeAdd({ sourceNode, nextEdge, nodes, edges, slots }) {
    const { id: nextEdgeId } = nextEdge;
    const { setting } = sourceNode;
    const { options = [] } = setting;
    const option = _.find(options, (optionConfig = {}) => {
      const { slotId, edgeId } = optionConfig;
      const currentSlot = _.find(slots, { id: slotId });
      // 寻找配置了 slot 但是没配置
      return currentSlot && currentSlot.isRequired && !edgeId;
    });
    if (!option) {
      const existEdges = _.filter(edges, { source: sourceNode.id });
      // 可以存在一条没有名字的线
      if (!_.find(existEdges, ({ label }) => !label)) {
        return {
          edges: [...edges, nextEdge],
          nodes: [...nodes],
        };
      }
      message.error('没找到可用的槽位配置,请先添加槽位配置,再进行连接.');
      return {
        edges: [...edges],
        nodes: [...nodes],
      };

    }
    const slot = _.find(slots, { id: option.slotId });
    return {
      edges: [...edges, {
        ...nextEdge,
        slotId: slot.id,
        label: slot.name,
        slotEdgeId: [slot.id, nextEdgeId].join('_')
      }],
      nodes: _.map(nodes, (node) => {
        if (node.id === sourceNode.id) {
          const { setting: nodeSetting } = node;
          const { options: lastOptions = [] } = nodeSetting;
          return {
            ...node,
            setting: {
              ...nodeSetting,
              options: _.map(lastOptions, (lastOption) => {
                if (lastOption && lastOption.slotId === option.slotId) {
                  return {
                    ...lastOption,
                    edgeId: nextEdge.id,
                  };
                }
                return lastOption;
              }),
            },
          };
        }
        return node;
      }),
    };

  }

}
