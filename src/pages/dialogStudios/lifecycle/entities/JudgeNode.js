/* eslint-disable class-methods-use-this */
import _ from "lodash";
import BaseNode from "../BaseNode";
import { utils } from "@/components/tis_ui";

const { IDGenerator } = utils;

function getConditions(and, or) {
  if (!_.isEmpty(and)) {
    return {
      operator: 'and',
      children: _.map(and, ({ id, ...otherConfig }) => otherConfig),
    };
  }
  if (!_.isEmpty(or)) {
    return {
      operator: 'or',
      children: _.map(or, ({ id, ...otherConfig }) => otherConfig),
    };
  }
  return {};
}

export default class JudgeNode extends BaseNode {

  formData({ setting, ...others }) {
    const { otherCondition, otherConditionEdgeId, conditions = [] } = setting;
    return {
      ...this.commonOper(others),
      conf: {
        conditions: [
          ..._.map(conditions, ({ label, edgeId, and, or }) => {
            return {
              label,
              edgeId,
              condition: getConditions(and, or),
            };
          }),
          {
            label: otherCondition,
            edgeId: otherConditionEdgeId,
            condition: {
              operator: "true",
              type: "Expression"
            }
          },
        ],
      },
    };
  }

  initSetting(conf) {
    const { conditions = [], name } = conf;
    const inputConditions = _.filter(conditions, ({ condition }) => condition.children);
    const otherCondition = _.find(conditions, ({ condition }) => !condition.children);
    return {
      name,
      conditions: _.map(inputConditions, ({ condition, ...others }) => {
        const { operator = 'and', children = [] } = condition;
        return {
          ...others,
          [operator]: children,
        };
      }),
      otherCondition: otherCondition?.label,
      otherConditionEdgeId: otherCondition?.edgeId,
    };
  }

  create(nextNode, label) {
    return {
      ...nextNode,
      setting: {
        name: label,
        otherCondition: '其他',
      },
    };
  }

  onEdgeRemove(node, id) {
    const { setting = {} } = node;
    const { conditions = [] } = setting;
    return {
      ...node,
      setting: {
        ...setting,
        conditions: _.map(conditions, condition => {
          const { edgeId, ...others } = condition;
          if (edgeId === id) {
            return others;
          }
          return condition;
        }),
      },
    };
  }

  onEdgeAdd({ sourceNode, nextEdge, nodes, edges }) {
    const { source, id: nextEdgeId } = nextEdge;
    const {
      setting: { conditions = [], otherCondition, otherConditionEdgeId },
      id,
    } = sourceNode;
    /* 先取得所有的链接线ID */
    const allReadyConnects = _.filter(edges, { source: id }).map(
      ({ id: allreadyEdgeId }) => allreadyEdgeId,
    );
    /* 先从 and or 条件去找是否含有未配置的条件 */
    const nextCondition = _.find(conditions, ({ edgeId }) => {
      return !allReadyConnects.includes(edgeId);
    });
    if (nextCondition) {
      /* 已经分配的条件, 要把edge关联上condition */
      return {
        edges: [...edges, { ...nextEdge, label: nextCondition.label }],
        nodes: _.map(nodes, node => {
          if (node.id === source) {
            const { setting } = node;
            const { conditions: lastConditions = [] } = setting;
            return {
              ...node,
              setting: {
                ...setting,
                conditions: _.map(lastConditions, condition => {
                  if (condition.id === nextCondition.id) {
                    return {
                      ...condition,
                      edgeId: nextEdgeId,
                    };
                  }
                  return condition;
                }),
              },
            };
          }
          return node;
        }),
      };
    }
    if (!allReadyConnects.includes(otherConditionEdgeId)) {
      /* 如果没找到, 再看 "其他" 条件是否被占用 */
      return {
        edges: [...edges, { ...nextEdge, label: otherCondition }],
        nodes: _.map(nodes, node => {
          if (node.id === source) {
            const { setting } = node;
            return {
              ...node,
              setting: {
                ...setting,
                otherConditionEdgeId: nextEdgeId,
              },
            };
          }
          return node;
        }),
      };
    }

    /* 如果都没找到, 新建一个 condition */
    const nextID = IDGenerator.next();
    const nextLabel = `条件${nextID}`;
    const newCondition = {
      id: nextID,
      label: nextLabel,
      edgeId: nextEdgeId,
    };
    return {
      edges: [...edges, { ...nextEdge, label: nextLabel }],
      nodes: _.map(nodes, node => {
        if (node.id === source) {
          const { setting } = node;
          const { conditions: lastConditions = [] } = setting;
          return {
            ...node,
            setting: {
              ...setting,
              conditions: [...lastConditions, newCondition],
            },
          };
        }
        return node;
      }),
    };
  }

}
