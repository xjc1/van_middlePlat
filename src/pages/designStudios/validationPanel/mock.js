import { oneFormValidateType } from '@/utils/constantEnum';

export default [
  {
    type: oneFormValidateType.regexp,
    rule: '',
    name: '非空',
    msg: '此项必填',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$',
    name: '手机号',
    msg: '手机号不符合规则',
    key: '3',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^[0-9]*$',
    name: '数字',
    msg: '只能输入数字',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^\\d+$ 或 ^[1-9]\\d*|0$',
    name: '正整数',
    msg: '只能输入正整数哟',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^[A-Za-z]+$',
    name: '字母',
    msg: '只能输入字母',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^[a-z]+$',
    name: '小写字母',
    msg: '只能输入小写字母',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^[A-Z]+$',
    name: '大写字母',
    msg: '只能输入大写字母',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
    name: '邮箱',
    msg: '邮箱不符合规范',
  },
  {
    type: oneFormValidateType.regexp,
    rule: '^\\d{15}|\\d{18}$',
    name: '身份证号',
    msg: '身份证号不符合规范',
  },
];
