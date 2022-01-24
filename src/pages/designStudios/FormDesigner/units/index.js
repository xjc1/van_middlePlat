import button from './Button';
import image from './Image';
import Iconfont from '@/assets/oneFormfont/iconfont.css';
import ButtonSetting from '@/pages/designStudios/FormDesigner/unitSetting/ButtonSetting';
import ImageSetting from '@/pages/designStudios/FormDesigner/unitSetting/ImageSetting';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import { oneFormUnitStatus } from '@/utils/constantEnum';

export default {
  button,
  image,
};

const names = {
  button: 'button',
  image: 'image',
};

const infoes = {
  [names.button]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconAnniu],
    name: '按钮',
    id: 'unit_button',
    setting: ButtonSetting,
    element: {
      field: names.button,
      type: ElementType.UNIT,
      col: 12,
      initState: oneFormUnitStatus.visible,
      currentState: oneFormUnitStatus.visible,
      extraData: {
        buttonType: 'default',
        clickType: 'custom',
      },
    },
  },

  [names.image]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconTupian],
    name: '图片',
    id: 'unit_image',
    setting: ImageSetting,
    element: {
      field: names.image,
      type: ElementType.UNIT,
      col: 12,
      initState: oneFormUnitStatus.visible,
      currentState: oneFormUnitStatus.visible,
      extraData: {},
    },
  },
};

export { names, infoes };
