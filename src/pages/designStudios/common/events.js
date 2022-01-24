import { oneFormEvents } from '@/utils/constantEnum';
import {
  PlayCircleOutlined,
  SafetyOutlined,
  Loading3QuartersOutlined,
  PullRequestOutlined,
  FunctionOutlined,
  ToTopOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

export default {
  [oneFormEvents.prefix]: {
    icon: PlayCircleOutlined,
  },
  [oneFormEvents.postfix]: {
    icon: MinusCircleOutlined,
  },
  [oneFormEvents.validate]: {
    icon: SafetyOutlined,
  },
  [oneFormEvents.compute]: {
    icon: FunctionOutlined,
  },
  [oneFormEvents.change]: {
    icon: Loading3QuartersOutlined,
  },
};
