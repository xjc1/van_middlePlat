import _ from 'lodash';
import { message } from 'antd';
import {
  ITEM_TYPES,
  VALID_ITEM_RELATION,
  VALID_ITEM_RELATION_WARRING,
  ITEM_ELEMENTS,
} from '@/pages/dialogStudios/itemConst';
import { MULTIROUNDSESSIONS } from '@/services/api';
import { utils } from '@/components/tis_ui';
import Lifecycle from '../lifecycle';

const { IDGenerator } = utils;

function updateItem(items, nextItem) {
  return _.map(items, item => {
    if (item.id === nextItem.id) {
      return nextItem;
    }
    return item;
  });
}

function removeItem(items, id) {
  return _.filter(items, item => {
    return item.id !== id;
  });
}

function updateCommonNodeDetail(state, formData) {
  const { selectedNode, nodes = [] } = state;
  const { label } = selectedNode;
  const { name } = formData;
  const nextNode = {
    ...selectedNode,
    label: name || label,
    setting: formData,
  };
  return {
    ...state,
    selectedNode: nextNode,
    nodes: updateItem(nodes, nextNode),
  };
}

function generatFormData(state) {
  const { session, nodes = [], slots = [], edges = [], intents = [], rules = [] } = state;
  return {
    ...session,
    slots: _.map(slots, Lifecycle[ITEM_TYPES.SLOT].formData),
    nodes: _.map(nodes, node => Lifecycle[node.nodeType].formData(node)),
    edges: _.map(edges, Lifecycle[ITEM_TYPES.EDGE].formData),
    intents: _.map(intents, Lifecycle[ITEM_TYPES.INTENT].formData),
    rules: _.map(rules, Lifecycle[ITEM_TYPES.RULE].formData),
  };
}

const Model = {
  namespace: 'dialogStudios',
  state: {
    session: null,
    nodes: [],
    edges: [],
    intents: [],
    groups: [],
    selectedNode: null,
  },
  effects: {
    * fetchDialog({ id }, { put }) {
      const session = yield MULTIROUNDSESSIONS.findSessionFlowByIdUsingGET(id);
      yield put({ type: 'initDialog', session });
    },
    /* 添加连接线 */
    * addEdge({ nextEdge }, { put, select }) {
      const { nodes = [], edges = [], slots = [] } = yield select(({ dialogStudios }) => dialogStudios);
      const { source, target, } = nextEdge;
      const sourceNode = _.find(nodes, { id: source });
      const targeteNode = _.find(nodes, { id: target });
      if (sourceNode && targeteNode) {
        const { nodeType: sourceNodeType } = sourceNode;
        const { nodeType: targeteNodeType } = targeteNode;
        if (VALID_ITEM_RELATION[sourceNodeType].includes(targeteNodeType) && source !== target) {
          const { nodes: nextNodes, edges: nextEdges } = Lifecycle[sourceNodeType].onEdgeAdd({
            sourceNode,
            nextEdge,
            nodes,
            edges,
            slots,
          });
          yield put({
            type: 'resetEdges',
            edges: nextEdges,
            nodes: nextNodes,
          });
          return;
        }
        message.warning(VALID_ITEM_RELATION_WARRING[sourceNodeType]);
      }
      yield put({
        type: 'resetEdges',
        edges: [...edges],
        nodes: [...nodes],
      });
    },
    * check(params, { select }) {
      const state = yield select(({ dialogStudios }) => dialogStudios);
      const formData = generatFormData(state);
      console.log("-> formData", formData);
      yield MULTIROUNDSESSIONS.validateSessionFlowUsingPOST({ body: formData });
      message.success('校验成功,数据合法,可以保存.');
    },

    * saveDialog(params, { select }) {
      const state = yield select(({ dialogStudios }) => dialogStudios);
      const formData = generatFormData(state);
      yield MULTIROUNDSESSIONS.createSessionFlowUsingPOST({ body: formData });
      message.success('保存成功, 你可以继续编辑.');
    },
  },
  reducers: {
    reset() {
      return {
        session: null,
        nodes: [],
        edges: [],
        intents: [],
        slots: [],
        rules: [],
        groups: [],
        selectedNode: null,
        currentDragType: null,
      };
    },
    initDialog(state, { session = {} }) {
      const { nodes = [], edges = [], slots = [], intents = [], rules = [], ...others } = session;
      const edgeInitData = Lifecycle[ITEM_TYPES.EDGE].initData(nodes, edges);
      return {
        ...state,
        slots: _.map(slots, Lifecycle[ITEM_TYPES.SLOT].initData),
        intents: _.map(intents, Lifecycle[ITEM_TYPES.INTENT].initData),
        rules: _.map(rules, Lifecycle[ITEM_TYPES.RULE].initData),
        nodes: _.map(nodes, node => Lifecycle[node.type].initData(node)),
        edges: _.map(edges, edgeInitData),
        session: others,
      };
    },

    generateUserInputNode(state, { id }) {
      const { nodes = [], edges = [] } = state;
      const { nodeType, setting: { options = [] }, x: nx, y: ny } = _.find(nodes, { id });
      if (nodeType === ITEM_TYPES.OPTION_NODE) {
        const relativeEdges = _.filter(edges, { source: id });
        const relativeNodes = _.map(relativeEdges, ({ target }) => {
          return _.find(nodes, { id: target });
        });
        const maxNode = _.maxBy(relativeNodes, ({ x }) => x);
        const repeatNum = options.length - relativeNodes.length;
        const maxX = maxNode?.x || nx - 200;
        const maxY = maxNode?.y || ny + 100;
        const appendNodes = _.map(new Array(repeatNum), (num, index) => {
          return Lifecycle[ITEM_TYPES.USER_INPUT_NODE].create({
            type: "node",
            label: "输入节点",
            x: maxX + (index + 1) * 100,
            y: maxY,
            id: IDGenerator.next(),
            ...ITEM_ELEMENTS[ITEM_TYPES.USER_INPUT_NODE],
          }, '输入节点');
        });
        const appendEdges = _.map(appendNodes, ({ id: aId }) => {
          return Lifecycle[ITEM_TYPES.EDGE].create({
            source: id,
            sourceAnchor: relativeEdges[0]?.sourceAnchor || 2,
            target: aId,
            targetAnchor: 0,
            id: IDGenerator.next(),
          });
        });
        return {
          ...state,
          nodes: [
            ...nodes,
            ...appendNodes,
          ],
          edges: [
            ...edges,
            ...appendEdges,
          ]
        };
      }
      return state;
    },

    addGroup(state, { newGroup }) {
      const { groups = [] } = state;
      return {
        ...state,
        groups: [
          ...groups,
          Lifecycle[ITEM_TYPES.GROUP].create(newGroup),
        ]
      };
    },

    unlockGroup(state, { groupId }) {
      const { groups } = state;
      return {
        ...state,
        groups: _.filter(groups, ({ id }) => {
          return id !== groupId;
        }),
      };
    },

    updateGroup(state, { group }) {
      return Lifecycle[ITEM_TYPES.GROUP].onUpdate(state, group);
    },

    removeGroup(state) {
      const { selectedNode } = state;
      if (selectedNode) {
        return Lifecycle[ITEM_TYPES.GROUP].remove(state, selectedNode.id);
      }
      return state;
    },

    copyNode(state) {
      const { nodes = [], edges = [], groups = [], selectedNode } = state;
      const { type, id } = selectedNode;
      switch (type) {
        case 'group': {
          const group = _.find(groups, { id });
          const { relativeNodes, nextGroup, relativeEdges } = Lifecycle[ITEM_TYPES.GROUP].copy(state, group, {});
          return {
            ...state,
            groups: [
              ...groups,
              nextGroup,
            ],
            nodes: [
              ...nodes,
              ...relativeNodes,
            ],
            edges: [
              ...edges,
              ...relativeEdges,
            ],
          };
        }
        default: {
          const node = _.find(nodes, { id });
          const nextNode = Lifecycle[node.nodeType].copy(state, node, {});
          return {
            ...state,
            nodes: [
              ...nodes,
              nextNode,
            ]
          };
        }
      }
    },

    addIntent(state, { intent }) {
      const { intents = [] } = state;
      return {
        ...state,
        intents: [
          ...intents,
          {
            ...intent,
            id: IDGenerator.next('intent'),
          },
        ],
      };
    },
    updateIntent(state, { intent }) {
      const { intents = [] } = state;
      return {
        ...state,
        intents: _.map(intents, item => {
          if (item.id === intent.id) {
            return intent;
          }
          return item;
        }),
      };
    },
    removeIntent(state, { intent }) {
      const { intents = [] } = state;
      return {
        ...state,
        intents: _.filter(intents, item => {
          return item.id !== intent.id;
        }),
      };
    },
    addSlot(state, { slot }) {
      const { slots = [] } = state;
      const { isRequired = false } = slot;
      return {
        ...state,
        slots: [
          ...slots,
          {
            ...slot,
            isRequired,
            id: IDGenerator.next('slot'),
          },
        ],
      };
    },
    updateSlot(state, { slot }) {
      const { slots = [], edges = [] } = state;
      return {
        ...state,
        slots: _.map(slots, item => {
          if (item.id === slot.id) {
            return slot;
          }
          return item;
        }),
        edges: _.map(edges, (edge) => {
          if (edge.slotId && edge.slotId === slot.id) {
            return {
              ...edge,
              label: slot.name,
            };
          }
          return edge;
        }),
      };
    },
    removeSlot(state, { slot }) {
      const { slots = [] } = state;
      return {
        ...state,
        slots: _.filter(slots, item => {
          return item.id !== slot.id;
        }),
      };
    },
    addRule(state, { rule }) {
      const { rules = [] } = state;
      return {
        ...state,
        rules: [...rules, { ...rule, id: IDGenerator.next('rule') }],
      };
    },
    removeRule(state, { id: nextId }) {
      const { rules = [] } = state;
      return {
        ...state,
        rules: _.filter(rules, ({ id }) => {
          return id !== nextId;
        }),
      };
    },
    updateRule(state, { rule }) {
      const { rules = [] } = state;
      return {
        ...state,
        rules: _.map(rules, item => {
          if (item.id === rule.id) {
            return rule;
          }
          return item;
        }),
      };
    },

    updateNodeRule(state, { rules }) {
      const { selectedNode } = state;
      if (selectedNode) {
        return Lifecycle[selectedNode.nodeType].onUpdateRule(selectedNode, rules, state);
      }
      return { ...state };
    },

    updateNodeIntent(state, { intent }) {
      const { selectedNode } = state;
      if (selectedNode) {
        return Lifecycle[selectedNode.nodeType].onUpdateIntent(selectedNode, intent, state);
      }
      return { ...state };
    },

    updateNodeDetail(state, { formData = {} }) {
      return updateCommonNodeDetail(state, formData);
    },

    updateJugeNodeDetail(state, { formData }) {
      const nextState = updateCommonNodeDetail(state, formData);
      const { conditions = [], otherConditionEdgeId, otherCondition } = formData;
      const conditionEdges = _.reduce(
        conditions,
        (result, { edgeId, label }) => {
          // eslint-disable-next-line no-param-reassign
          result[edgeId] = label;
          return result;
        },
        {},
      );
      if (otherConditionEdgeId) {
        conditionEdges[otherConditionEdgeId] = otherCondition;
      }
      const { edges = [], ...others } = nextState;
      return {
        ...others,
        edges: _.map(edges, edge => {
          if (conditionEdges[edge.id]) {
            return {
              ...edge,
              label: conditionEdges[edge.id],
            };
          }
          return edge;
        }),
      };
    },

    clean(state) {
      return { ...state, selectedNode: null };
    },
    focusNode(state, { id, itemType }) {
      const { nodes = [], groups = [] } = state;
      switch (itemType) {
        case 'group':
          return { ...state, selectedNode: _.find(groups, { id }) };
        default:
          return { ...state, selectedNode: _.find(nodes, { id }) };
      }
    },
    addNode(state, { nextNode }) {
      const { nodes = [] } = state;
      const { label, nodeType } = nextNode;
      return {
        ...state,
        nodes: [...nodes, Lifecycle[nodeType].create(nextNode, label)],
      };
    },
    resetEdges(state, { edges, nodes }) {
      return {
        ...state,
        edges,
        nodes,
        selectedNode: null,
      };
    },
    updateNode(state, { nextNode }) {
      const { nodes = [] } = state;
      return {
        ...state,
        nodes: updateItem(nodes, nextNode),
      };
    },
    updateEdge(state, { nextEdge }) {
      const { edges = [] } = state;
      const { soruce, target, id:nId } = nextEdge;
      if (_.isString(soruce) && _.isString(target)) {
        return {
          ...state,
          edges: updateItem(edges, nextEdge),
        };
      }
      return {
        ...state,
        edges: _.filter(edges, ({ id }) => id !== nId)
      };
    },
    removeNode(state, { id }) {
      const { nodes = [], edges = [] } = state;
      const currentNode = _.find(nodes, { id });
      const waitDeletLines = _.filter(edges, { target: currentNode.id });
      const nextNodes = _.map(nodes, (node) => {
        const currentLine = _.find(waitDeletLines, { source: node.id });
        if (currentLine) {
          return Lifecycle[node.nodeType].onEdgeRemove(node, currentLine.id);
        }
        return node;
      });
      return {
        ...state,
        nodes: removeItem(nextNodes, id),
        edges: _.filter(edges, ({ source, target }) => {
          return source !== id && target !== id;
        }),
      };
    },

    removeEdge(state, { model: { id, source } }) {
      const { edges = [], nodes = [] } = state;
      return {
        ...state,
        edges: removeItem(edges, id),
        nodes: _.map(nodes, node => {
          if (node.id === source) {
            return Lifecycle[node.nodeType].onEdgeRemove(node, id);
          }
          return node;
        }),
      };
    },
  },
};
export default Model;
