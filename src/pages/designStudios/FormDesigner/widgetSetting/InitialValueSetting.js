import React, { useCallback } from 'react';
import { Divider, Form, Input, Radio, Tag } from 'antd';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import classNames from 'classnames';
import SettingStyle from '@/pages/designStudios/FormDesigner/widgetSetting/widgetSetting.less';

const { TextArea } = Input;

function InitialValueSetting({
  onUpdate = EmptyFn,
  initialValue = {},
  ctxSchema = [],
  staticTextArea = false,
}) {
  const { initValueType = 'static', ...others } = initialValue;
  const [formRef] = Form.useForm();

  const onValuesChange = useCallback(() => {
    formRef
      .validateFields()
      .then(nextVals => {
        onUpdate({
          initialValue: nextVals,
        });
      })
      .catch(() => {});
  }, [formRef]);

  return (
    <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionInitValue)}>
      <Divider orientation="left">默认值配置</Divider>
      <Form
        form={formRef}
        initialValues={{
          initValueType,
          ...others,
        }}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="初始值" name="initValueType">
          <Radio.Group>
            <Radio value="static">静态</Radio>
            <Radio value="ctx">上下文</Radio>
          </Radio.Group>
        </Form.Item>

        {initValueType === 'static' && !staticTextArea && (
          <Form.Item name="initValueStatic">
            <Input />
          </Form.Item>
        )}

        {initValueType === 'static' && staticTextArea && (
          <Form.Item name="initValueStatic">
            <TextArea />
          </Form.Item>
        )}

        {initValueType === 'ctx' && (
          <Form.Item name="initValueCtx">
            <TSelect allowClear>
              {_.map(ctxSchema, ({ pathKey }) => {
                const ctxKey = pathKey.join('.');
                return (
                  <TSelect.Option value={ctxKey} key={ctxKey} label={ctxKey}>
                    <Tag color="orange">上下文</Tag>
                    {ctxKey}
                  </TSelect.Option>
                );
              })}
            </TSelect>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

export default InitialValueSetting;
