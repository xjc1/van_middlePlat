import React from 'react';
import { oneFormValidateType } from '@/utils/constantEnum';
import { Form, Radio, InputNumber } from 'antd';

export default [
  {
    type: oneFormValidateType.default,
    rule(whitespace) {
      return { required: true, whitespace };
    },
    name: '必填',
    message: '此项必填',
    optionRender: (
      <Form.Item name="option" label="空格视为错误">
        <Radio.Group>
          <Radio value>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>
    ),
  },
  {
    type: oneFormValidateType.default,
    rule(len) {
      return { len, message: `字段长度需要${len}位` };
    },
    message: '字段长度需要{len}位',
    name: '字段长度',
    optionRender: (
      <Form.Item name="option" label="长度">
        <InputNumber min={1} />
      </Form.Item>
    ),
  },
  {
    type: oneFormValidateType.default,
    rule(min) {
      return { min, message: `字段长度最小需要${min}位` };
    },
    message: '字段长度最小需要{min}位',
    name: '最小长度',
    optionRender: (
      <Form.Item name="option" label="最小长度">
        <InputNumber min={1} />
      </Form.Item>
    ),
  },
  {
    type: oneFormValidateType.default,
    rule(max) {
      return { max, message: `字段长度最大需要${max}位` };
    },
    message: '字段长度最大需要{max}位',
    name: '最大长度',
    optionRender: (
      <Form.Item name="option" label="最大长度">
        <InputNumber min={1} />
      </Form.Item>
    ),
  },
];
