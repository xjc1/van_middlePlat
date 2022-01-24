import input from './Input';
import radio from './Radio';
import select from './Select';
import cascader from './Cascader';
import datePicker from './DatePicker';
import inputNumber from './InputNumber';
import checkbox from './Checkbox';
import file from './File';
import table from './Table';
import textArea from './TextArea';
import customerWidget from './CustomerWidget';
import SelectSetting from '../widgetSetting/SelectSetting';
import InputSetting from '../widgetSetting/InputSetting';
import NothingSetting from '../widgetSetting/NothingSetting';
import InputNumberSetting from '../widgetSetting/InputNumberSetting';
import CheckboxSetting from '../widgetSetting/CheckboxSetting';
import FileSetting from '../widgetSetting/FileSetting';
import CascaderSetting from '../widgetSetting/CascaderSetting';
import TableSetting from '../widgetSetting/TableSetting';
import TextAreaSetting from '../widgetSetting/TextAreaSetting';
import CustomerSetting from '../widgetSetting/CustomerSetting';
import Iconfont from '@/assets/oneFormfont/iconfont.css';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import { oneFormUnitStatus, oneFormWidgetStatus } from '@/utils/constantEnum';

export default {
  input,
  radio,
  select,
  cascader,
  datePicker,
  inputNumber,
  checkbox,
  file,
  table,
  textArea,
  customerWidget,
};

const names = {
  input: 'input',
  radio: 'radio',
  select: 'select',
  cascader: 'cascader',
  datePicker: 'datePicker',
  inputNumber: 'inputNumber',
  checkbox: 'checkbox',
  file: 'file',
  table: 'table',
  textArea: 'textArea',
  customerWidget: 'customerWidget',
};

const defaultSpan = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const verticalDefaultSpan = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const infoes = {
  [names.input]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconInput],
    name: '输入框',
    id: 'widget_input',
    placeholder: '请输入文本',
    setting: InputSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.input,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },
  [names.radio]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconIconoption],
    name: '单选',
    id: 'widget_radio',
    setting: NothingSetting,
    placeholder: `
    [
        {
          "value": "1",
          "label":'选项一'
        }, 
        {
          "value": "2",
          "label":'选项二'
        }, 
        {
          "value": "3",
          "label":'选项三'
          }, 
      ]
    `,
    element: {
      type: ElementType.WIDGET,
      field: names.radio,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },
  [names.select]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconSelect],
    name: '下拉选择框',
    id: 'widget_select',
    setting: SelectSetting,
    placeholder: `
      [
        {
          "value": "1",
          "label":'选项一'
        }, 
        {
          "value": "2",
          "label":'选项二'
        }, 
        {
          "value": "3",
          "label":'选项三'
        }, 
      ]
    `,
    element: {
      type: ElementType.WIDGET,
      field: names.select,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },
  [names.cascader]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconJilianxuanzeqi],
    name: '级联选择框',
    id: 'widget_cascader',
    setting: CascaderSetting,
    placeholder: `
[
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  }
]
    `,
    element: {
      type: ElementType.WIDGET,
      field: names.cascader,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },
  [names.datePicker]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconRiqi],
    name: '日期选择器',
    id: 'widget_datePicker',
    setting: NothingSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.datePicker,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },
  [names.inputNumber]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconInputNumber],
    name: '数字输入框',
    id: 'widget_input_number',
    placeholder: '请输入数字',
    setting: InputNumberSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.inputNumber,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },

  [names.checkbox]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconIconfontxuanzekuangyixuan],
    name: '多选框',
    id: 'widget_checkbox',
    setting: CheckboxSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.checkbox,
      col: 12,
      innerSpan: defaultSpan,
      itemSpan: 8,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
    },
  },

  [names.file]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconShangchuan],
    name: '上传文件',
    id: 'widget_file',
    placeholder: '点击上传',
    setting: FileSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.file,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
      widgetConfig: {
        fileSize: 5,
        fileCount: 10,
      },
    },
  },

  [names.table]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconTable],
    name: '表格',
    id: 'widget_table',
    placeholder: '表格',
    setting: TableSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.table,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
      widgetConfig: {
        fileSize: 5,
        fileCount: 10,
      },
    },
  },
  [names.textArea]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconDuohangwenben],
    name: '文本域',
    id: 'widget_textArea',
    placeholder: '请输入文本',
    setting: TextAreaSetting,
    element: {
      type: ElementType.WIDGET,
      field: names.textArea,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormWidgetStatus.visible,
      currentState: oneFormWidgetStatus.visible,
      widgetConfig: {
        fileSize: 5,
        fileCount: 10,
      },
    },
  },

  [names.customerWidget]: {
    iconfont: [Iconfont.iconfont, Iconfont.iconPintu],
    name: '自定义表单控件',
    id: 'customerWidget',
    setting: CustomerSetting,
    element: {
      field: names.customerWidget,
      type: ElementType.WIDGET,
      col: 12,
      innerSpan: defaultSpan,
      initState: oneFormUnitStatus.visible,
      currentState: oneFormUnitStatus.visible,
      extraData: {
        component: 'div',
      },
    },
  },
};

export { names, infoes, defaultSpan, verticalDefaultSpan };
