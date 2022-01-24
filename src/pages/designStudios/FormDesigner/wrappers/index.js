import Iconfont from '@/assets/oneFormfont/iconfont.css';
import block from './Block';
import card from './Card';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';

export default {
  block,
  card,
};

const names = {
  block: 'block',
  card: 'card',
};

const infoes = {
  [names.block]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconBuju],
    name: '组',
    id: 'wrapper-block',
    element: {
      type: ElementType.WRAPPER,
      field: names.block,
    },
  },
  [names.card]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconQiapian],
    name: '卡片',
    id: 'wrapper-card',
    element: {
      type: ElementType.WRAPPER,
      field: names.card,
    },
  },
};

export { names, infoes };
