import { BranchesOutlined, SlidersOutlined, BulbOutlined, EditOutlined, ApartmentOutlined } from '@ant-design/icons';
import Styles from './EditorItemPanel/index.less';

const ITEM_GROUP_TYPES = {
  USER: 'user',
  ROBOT_THINK: 'robot_think',
  ROBOT_ANSWER: 'robot_answer',
  SYSTEM_POWER: 'system_power',
};

const ITEM_TYPES = {
  USER_INPUT_NODE: 'Entry',
  JUDGE_NODE: 'Switch',
  OPTION_NODE: 'Option',
  ANSWER_NODE: 'Response',
  SLOT_NODE: 'Slot',
  SLOT: 'slot',
  INTENT: 'intent',
  RULE: 'rule',
  EDGE: 'edge',
  GROUP: 'group',
};

const PANEL_TYPES = [
  ITEM_TYPES.USER_INPUT_NODE,
  ITEM_TYPES.JUDGE_NODE,
  ITEM_TYPES.OPTION_NODE,
  ITEM_TYPES.ANSWER_NODE,
  ITEM_TYPES.SLOT_NODE,
];

const ITEM_ELEMENTS = {
  [ITEM_TYPES.USER_INPUT_NODE]: {
    type: 'node',
    size: '80*48',
    shape: 'flow-rect',
    color: '#73d13d',
    nodeType: ITEM_TYPES.USER_INPUT_NODE,
  },
  [ITEM_TYPES.JUDGE_NODE]: {
    type: 'node',
    size: '80*48',
    shape: 'flow-rect',
    color: '#40a9ff',
    nodeType: ITEM_TYPES.JUDGE_NODE,
  },
  [ITEM_TYPES.OPTION_NODE]: {
    type: 'node',
    size: '80*48',
    shape: 'flow-rect',
    color: '#ff7a45',
    nodeType: ITEM_TYPES.OPTION_NODE,
  },
  [ITEM_TYPES.ANSWER_NODE]: {
    type: 'node',
    size: '80*48',
    shape: 'flow-rect',
    color: '#08979c',
    nodeType: ITEM_TYPES.ANSWER_NODE,
  },
  [ITEM_TYPES.SLOT_NODE]: {
    type: 'node',
    size: '80*48',
    shape: 'flow-rect',
    color: '#eb2f96',
    nodeType: ITEM_TYPES.SLOT_NODE,
  },
  [ITEM_TYPES.GROUP]: {
    label: '',
    style: {
      opacity: 0.3,
    },
    config: {
      isAnchorShow: false,
    }
  }
};

const ITEM_OPTIONS = {
  [ITEM_TYPES.USER_INPUT_NODE]: {
    className: Styles.userInputNode,
    Icon: EditOutlined,
    ...ITEM_ELEMENTS[ITEM_TYPES.USER_INPUT_NODE],
  },
  [ITEM_TYPES.JUDGE_NODE]: {
    className: Styles.judgeNode,
    Icon: BranchesOutlined,
    ...ITEM_ELEMENTS[ITEM_TYPES.JUDGE_NODE],
  },
  [ITEM_TYPES.OPTION_NODE]: {
    className: Styles.optionNode,
    Icon: SlidersOutlined,
    ...ITEM_ELEMENTS[ITEM_TYPES.OPTION_NODE],
  },
  [ITEM_TYPES.ANSWER_NODE]: {
    className: Styles.answerNode,
    Icon: BulbOutlined,
    ...ITEM_ELEMENTS[ITEM_TYPES.ANSWER_NODE],
  },
  [ITEM_TYPES.SLOT_NODE]: {
    className: Styles.slot,
    Icon: ApartmentOutlined,
    ...ITEM_ELEMENTS[ITEM_TYPES.SLOT_NODE],
  }
};

/*
const OPTION_NAME = {
  [ITEM_TYPES.USER_INPUT_NODE]: 'setting',
  [ITEM_TYPES.JUDGE_NODE]: 'setting',
  [ITEM_TYPES.OPTION_NODE]: 'setting',
  [ITEM_TYPES.ANSWER_NODE]: 'setting',
};
*/

const VALID_ITEM_RELATION = {
  [ITEM_TYPES.USER_INPUT_NODE]: [
    ITEM_TYPES.JUDGE_NODE,
    ITEM_TYPES.OPTION_NODE,
    ITEM_TYPES.SLOT_NODE,
    ITEM_TYPES.ANSWER_NODE,
  ],
  [ITEM_TYPES.JUDGE_NODE]: [
    ITEM_TYPES.JUDGE_NODE,
    ITEM_TYPES.OPTION_NODE,
    ITEM_TYPES.SLOT_NODE,
    ITEM_TYPES.ANSWER_NODE,
  ],
  [ITEM_TYPES.OPTION_NODE]: [
    ITEM_TYPES.USER_INPUT_NODE,
  ],
  [ITEM_TYPES.SLOT_NODE]: [
    ITEM_TYPES.JUDGE_NODE,
    ITEM_TYPES.OPTION_NODE,
  ],
  [ITEM_TYPES.ANSWER_NODE]: [],
};

const VALID_ITEM_RELATION_WARRING = {
  [ITEM_TYPES.USER_INPUT_NODE]: '用户输入节点只能连接 [ 判断节点, 选项节点, 填槽节点, 答案节点]',
  [ITEM_TYPES.JUDGE_NODE]: '判断节点只能连接 [ 判断节点, 选项节点, 填槽节点, 答案节点], 且不可连接自己',
  [ITEM_TYPES.OPTION_NODE]: '选项节只能连接 [ 用户输入节点]',
  [ITEM_TYPES.ANSWER_NODE]: '答案节点不可连接任何节点]',
  [ITEM_TYPES.SLOT_NODE]: '填槽节点只能连[ 判断节点, 选项节点 ]]',
};

export {
  ITEM_GROUP_TYPES,
  PANEL_TYPES,
  ITEM_TYPES,
  ITEM_OPTIONS,
  ITEM_ELEMENTS,
  VALID_ITEM_RELATION,
  VALID_ITEM_RELATION_WARRING,
};
