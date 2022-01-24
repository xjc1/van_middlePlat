import React, { useState, useEffect } from 'react';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Button, Divider, Form, Input, Popover, Select } from 'antd';
import { recommendAppUserType, messageUseScence } from '@/utils/constantEnum';
import _ from 'lodash';

function EditSource({ record = {}, onFinish = EmptyFn, children }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(record);
    }
  }, [visible]);

  return (
    <Popover
      title={record.id ? '编辑消息类型' : '添加消息类型'}
      visible={visible}
      onVisibleChange={setVisible}
      trigger="click"
      content={
        <div style={{ width: 600 }}>
          <Form
            form={form}
            onFinish={val => {
              setVisible(false);
              form.resetFields();
              onFinish({ ...record, ...val });
            }}
          >
            <TItem name="name" label="消息类型名称" rules={[FormRules.required('必填')]}>
              <Input />
            </TItem>
            <TItem name="code" label="消息类型编码" rules={[FormRules.required('必填')]}>
              <Input disabled={record.id} />
            </TItem>
            <TItem name="value" label="分类简介">
              <Input />
            </TItem>
            <TItem name="applicationScenario" label="应用场景">
              <Select allowClear mode="multiple">
                {_.map(messageUseScence, (v, k) => (
                  <Select.Option key={k} value={v}>
                    {messageUseScence.$names[k]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
            <TItem name="clientType" label="终端类型">
              <DictSelect dict="ZDLX" dictType="tree" multiple />
            </TItem>
            <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]}>
              <Select allowClear mode="multiple">
                {_.map(recommendAppUserType, (v, k) => (
                  <Select.Option key={k} value={v}>
                    {recommendAppUserType.$names[k]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  setVisible(false);
                }}
              >
                取消
              </Button>
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form>
        </div>
      }
    >
      {children}
    </Popover>
  );
}

export default EditSource;
