import AnswerNode from './entities/AnswerNode';
import UserInputNode from './entities/UserInputNode';
import OptionNode from './entities/OptionNode';
import SlotNode from './entities/SlotNode';
import JudgeNode from './entities/JudgeNode';
import Slot from './entities/Slot';
import Intent from './entities/Intent';
import Rule from './entities/Rule';
import Edge from './entities/Edge';
import Group from './entities/Group';
import { ITEM_TYPES } from '@/pages/dialogStudios/itemConst';

export default {
  [ITEM_TYPES.USER_INPUT_NODE]: new UserInputNode(),
  [ITEM_TYPES.ANSWER_NODE]: new AnswerNode(),
  [ITEM_TYPES.OPTION_NODE]: new OptionNode(),
  [ITEM_TYPES.SLOT_NODE]: new SlotNode(),
  [ITEM_TYPES.JUDGE_NODE]: new JudgeNode(),
  [ITEM_TYPES.SLOT]: new Slot(),
  [ITEM_TYPES.INTENT]: new Intent(),
  [ITEM_TYPES.RULE]: new Rule(),
  [ITEM_TYPES.EDGE]: new Edge(),
  [ITEM_TYPES.GROUP]: new Group(),
};
